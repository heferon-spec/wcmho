
-- Tighten insert policy with validation
DROP POLICY "Anyone can insert bookings" ON public.bookings;

CREATE POLICY "Validated inserts on bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (
    char_length(full_name) > 0 AND char_length(full_name) <= 200
    AND char_length(email) > 0 AND char_length(email) <= 255
    AND char_length(phone) > 0 AND char_length(phone) <= 30
    AND char_length(provider_name) > 0
    AND char_length(session_type) > 0
    AND session_date IS NOT NULL
    AND char_length(session_time) > 0
  );
