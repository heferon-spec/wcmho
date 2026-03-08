
CREATE TABLE public.product_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_handle TEXT NOT NULL,
  reviewer_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;

-- Anyone can read reviews
CREATE POLICY "Anyone can read reviews"
  ON public.product_reviews
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Anyone can insert reviews (no auth required for simplicity)
CREATE POLICY "Anyone can insert reviews"
  ON public.product_reviews
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(reviewer_name) > 0 AND char_length(reviewer_name) <= 100
    AND rating >= 1 AND rating <= 5
    AND char_length(comment) > 0 AND char_length(comment) <= 1000
    AND char_length(product_handle) > 0
  );
