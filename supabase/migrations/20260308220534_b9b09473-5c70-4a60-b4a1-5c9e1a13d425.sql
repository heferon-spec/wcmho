
CREATE TABLE public.bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  session_type TEXT NOT NULL,
  session_date DATE NOT NULL,
  session_time TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'upcoming',
  session_mode TEXT NOT NULL DEFAULT 'Virtual',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (guests too)
CREATE POLICY "Anyone can insert bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Authenticated users can read their own bookings
CREATE POLICY "Users can read own bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
