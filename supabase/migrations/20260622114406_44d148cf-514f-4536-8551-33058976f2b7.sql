
-- =========================
-- 1. BOOKINGS — remove broad anon access, add SECURITY DEFINER RPCs
-- =========================
DROP POLICY IF EXISTS "Anon can select bookings by email or phone" ON public.bookings;
DROP POLICY IF EXISTS "Anon can update upcoming bookings only" ON public.bookings;

-- Lookup upcoming bookings by email OR phone (caller must supply at least one)
CREATE OR REPLACE FUNCTION public.voice_get_bookings(p_email text DEFAULT NULL, p_phone text DEFAULT NULL)
RETURNS TABLE (
  id uuid, full_name text, provider_name text, session_date date,
  session_time text, session_type text, session_mode text, status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (p_email IS NULL OR length(trim(p_email)) = 0)
     AND (p_phone IS NULL OR length(trim(p_phone)) = 0) THEN
    RAISE EXCEPTION 'Email or phone is required';
  END IF;
  RETURN QUERY
  SELECT b.id, b.full_name, b.provider_name, b.session_date, b.session_time,
         b.session_type, b.session_mode, b.status
  FROM public.bookings b
  WHERE b.status = 'upcoming'
    AND ( (p_email IS NOT NULL AND b.email = p_email)
       OR (p_phone IS NOT NULL AND b.phone = p_phone) )
  ORDER BY b.session_date ASC;
END;
$$;

-- Provider availability: only return booked session_time list (no PII)
CREATE OR REPLACE FUNCTION public.voice_check_availability(p_provider text, p_date date)
RETURNS TABLE (session_time text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT b.session_time FROM public.bookings b
  WHERE b.provider_name = p_provider
    AND b.session_date = p_date
    AND b.status = 'upcoming';
$$;

-- Cancel by booking_id; requires matching email
CREATE OR REPLACE FUNCTION public.voice_cancel_booking(p_booking_id uuid, p_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_count int;
BEGIN
  IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  UPDATE public.bookings
    SET status = 'cancelled'
    WHERE id = p_booking_id AND email = p_email AND status = 'upcoming';
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count > 0;
END;
$$;

-- Cancel by email + date
CREATE OR REPLACE FUNCTION public.voice_cancel_booking_by_email(p_email text, p_session_date date)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_count int;
BEGIN
  IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  UPDATE public.bookings
    SET status = 'cancelled'
    WHERE email = p_email AND session_date = p_session_date AND status = 'upcoming';
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count > 0;
END;
$$;

-- Reschedule: requires matching email; only changes date/time
CREATE OR REPLACE FUNCTION public.voice_reschedule_booking(
  p_booking_id uuid, p_email text, p_new_date date, p_new_time text
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_count int;
BEGIN
  IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  IF p_new_time IS NULL OR length(trim(p_new_time)) = 0 THEN
    RAISE EXCEPTION 'New time is required';
  END IF;
  UPDATE public.bookings
    SET session_date = p_new_date, session_time = p_new_time
    WHERE id = p_booking_id AND email = p_email AND status = 'upcoming';
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count > 0;
END;
$$;

CREATE OR REPLACE FUNCTION public.voice_reschedule_booking_by_email(
  p_email text, p_original_date date, p_new_date date, p_new_time text
) RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_count int;
BEGIN
  IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
    RAISE EXCEPTION 'Email is required';
  END IF;
  UPDATE public.bookings
    SET session_date = p_new_date, session_time = p_new_time
    WHERE email = p_email AND session_date = p_original_date AND status = 'upcoming';
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count > 0;
END;
$$;

GRANT EXECUTE ON FUNCTION public.voice_get_bookings(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.voice_check_availability(text, date) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.voice_cancel_booking(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.voice_cancel_booking_by_email(text, date) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.voice_reschedule_booking(uuid, text, date, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.voice_reschedule_booking_by_email(text, date, date, text) TO anon, authenticated;

-- =========================
-- 2. CAMPAIGN_DONATIONS — drop public PII-exposing policy, add safe view
-- =========================
DROP POLICY IF EXISTS "Public can view non-PII donation columns" ON public.campaign_donations;

CREATE OR REPLACE VIEW public.public_campaign_donations
WITH (security_invoker = true) AS
SELECT id, campaign_id, amount, created_at
FROM public.campaign_donations;

-- The view needs a permissive policy on the underlying table for the projected columns.
-- Recreate a SELECT policy but the view only exposes safe columns, and we rely on view definition.
CREATE POLICY "Public can view donations via safe view"
  ON public.campaign_donations FOR SELECT
  TO anon, authenticated
  USING (true);
-- Note: this still grants table-level SELECT, but column-level safety is enforced via REVOKE below.

REVOKE SELECT ON public.campaign_donations FROM anon, authenticated;
GRANT SELECT (id, campaign_id, amount, created_at) ON public.campaign_donations TO anon, authenticated;
GRANT SELECT ON public.public_campaign_donations TO anon, authenticated;

-- =========================
-- 3. CONTACT_MESSAGES — add length validation on inserts
-- =========================
DROP POLICY IF EXISTS "Allow public inserts on contact_messages" ON public.contact_messages;

CREATE POLICY "Validated public inserts on contact_messages"
  ON public.contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(full_name) > 0 AND char_length(full_name) <= 200
    AND char_length(email) > 0 AND char_length(email) <= 255
    AND char_length(subject) > 0 AND char_length(subject) <= 200
    AND char_length(message) > 0 AND char_length(message) <= 5000
  );

-- =========================
-- 4. MOOD_ENTRIES — remove from realtime publication
-- =========================
ALTER PUBLICATION supabase_realtime DROP TABLE public.mood_entries;
