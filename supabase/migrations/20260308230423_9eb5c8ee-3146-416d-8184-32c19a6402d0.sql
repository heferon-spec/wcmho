
-- Tighten the anon update policy to only allow modifying upcoming bookings
DROP POLICY "Anon can update bookings" ON public.bookings;

CREATE POLICY "Anon can update upcoming bookings only"
ON public.bookings
FOR UPDATE
TO anon
USING (status = 'upcoming')
WITH CHECK (status IN ('upcoming', 'cancelled'));
