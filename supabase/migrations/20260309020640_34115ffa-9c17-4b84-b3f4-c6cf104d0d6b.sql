
CREATE TABLE public.event_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_title text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  ticket_count integer NOT NULL DEFAULT 1,
  total_price numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'confirmed',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.event_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can book tickets"
  ON public.event_tickets
  FOR INSERT
  WITH CHECK (
    char_length(full_name) > 0 AND char_length(full_name) <= 200
    AND char_length(email) > 0 AND char_length(email) <= 255
    AND char_length(phone) > 0 AND char_length(phone) <= 30
    AND ticket_count >= 1 AND ticket_count <= 10
  );

CREATE POLICY "Anyone can view own ticket by email"
  ON public.event_tickets
  FOR SELECT
  USING (true);
