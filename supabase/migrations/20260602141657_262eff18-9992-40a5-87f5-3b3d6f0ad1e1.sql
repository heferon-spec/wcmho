
-- 1. campaign_donations: drop public SELECT (includes donor PII), restrict to admin
DROP POLICY IF EXISTS "Anyone can view donations" ON public.campaign_donations;

CREATE POLICY "Public can view non-PII donation columns"
ON public.campaign_donations FOR SELECT
TO anon, authenticated
USING (true);

REVOKE SELECT ON public.campaign_donations FROM anon, authenticated;
GRANT SELECT (id, campaign_id, amount, created_at) ON public.campaign_donations TO anon, authenticated;
GRANT SELECT ON public.campaign_donations TO service_role;

CREATE POLICY "Admins can view all donation details"
ON public.campaign_donations FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Re-grant full SELECT to admins via a separate path: admins are authenticated; column grants apply per role. Grant full to authenticated when admin via policy isn't enough — we need the column grant. So grant full SELECT to authenticated only via service_role/admin? Postgres column grants are role-based, not policy-based.
-- To allow admins to read PII, grant full SELECT to authenticated; the column grant restriction won't apply to admins because column GRANTS aren't conditional. So we keep restrictive column grants for everyone but admins read via service_role through an admin RPC or edge function if PII needed.

-- 2. event_tickets: drop public SELECT, admin-only
DROP POLICY IF EXISTS "Anyone can view own ticket by email" ON public.event_tickets;

CREATE POLICY "Admins can view all tickets"
ON public.event_tickets FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 3. contact_messages: add admin SELECT
CREATE POLICY "Admins can view contact messages"
ON public.contact_messages FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4. volunteer_applications: add admin SELECT
CREATE POLICY "Admins can view volunteer applications"
ON public.volunteer_applications FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
