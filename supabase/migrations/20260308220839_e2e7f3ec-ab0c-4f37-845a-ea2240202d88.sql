
-- Add notification preferences to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notification_email BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notification_sms BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notification_bookings BOOLEAN DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notification_wellness BOOLEAN DEFAULT true;

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Storage policies for avatars
CREATE POLICY "Anyone can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Create mood_entries table
CREATE TABLE public.mood_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  entry_date DATE DEFAULT CURRENT_DATE NOT NULL
);

ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own moods"
  ON public.mood_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own moods"
  ON public.mood_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id AND mood >= 1 AND mood <= 5);

CREATE POLICY "Users can delete own moods"
  ON public.mood_entries FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Enable realtime for mood entries
ALTER PUBLICATION supabase_realtime ADD TABLE public.mood_entries;
