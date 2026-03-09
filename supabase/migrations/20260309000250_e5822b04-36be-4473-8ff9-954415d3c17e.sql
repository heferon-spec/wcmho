
CREATE TABLE public.volunteer_applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_birth date,
  city text,
  address text,
  area_of_interest text NOT NULL,
  availability text NOT NULL,
  previous_experience text,
  motivation text NOT NULL,
  special_skills text,
  emergency_contact_name text,
  emergency_contact_phone text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an application (public form)
CREATE POLICY "Anyone can insert volunteer applications"
  ON public.volunteer_applications
  FOR INSERT
  WITH CHECK (
    char_length(first_name) > 0 AND char_length(first_name) <= 100
    AND char_length(last_name) > 0 AND char_length(last_name) <= 100
    AND char_length(email) > 0 AND char_length(email) <= 255
    AND char_length(phone) > 0 AND char_length(phone) <= 30
    AND char_length(area_of_interest) > 0
    AND char_length(availability) > 0
    AND char_length(motivation) > 0 AND char_length(motivation) <= 2000
  );
