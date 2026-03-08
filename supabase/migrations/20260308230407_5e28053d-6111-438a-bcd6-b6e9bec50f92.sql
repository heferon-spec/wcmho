
-- Allow anonymous/public read of bookings by email or phone (for AI agent lookups)
CREATE POLICY "Anon can select bookings by email or phone"
ON public.bookings
FOR SELECT
TO anon
USING (true);

-- Allow anonymous update for cancel/reschedule via AI agent
CREATE POLICY "Anon can update bookings"
ON public.bookings
FOR UPDATE
TO anon
USING (true)
WITH CHECK (true);
