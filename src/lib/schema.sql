
-- Create a trigger function to handle new user sign-ups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$;

-- Create a trigger to call the function when a new user is created
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create the partners table
CREATE TABLE partners (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    businessName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE partners IS 'Contains submissions from the partner form.';

-- Create the investors table
CREATE TABLE investors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE investors IS 'Contains submissions from the investor form for deck access.';

-- Create the table for contact form submissions
CREATE TABLE contactSubmissions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE contactSubmissions IS 'Stores messages sent through the contact form.';

-- Create the suggestions table
CREATE TABLE suggestions (
    id SERIAL PRIMARY KEY,
    suggestion TEXT NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE suggestions IS 'Collects user suggestions for the platform.';

-- Create the table for the visitor counter
CREATE TABLE counters (
  name TEXT PRIMARY KEY,
  value BIGINT NOT NULL
);
COMMENT ON TABLE counters IS 'A generic key-value store for counters. Used for visitor count.';

-- Insert the initial visitor counter if it doesn't exist
INSERT INTO counters (name, value)
VALUES ('visitors', 0)
ON CONFLICT (name) DO NOTHING;

-- Create the function to increment and return the visitor count
CREATE OR REPLACE FUNCTION increment_visitor_count()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_value BIGINT;
BEGIN
  -- Use a transaction with a lock to prevent race conditions
  LOCK TABLE counters IN EXCLUSIVE MODE;

  UPDATE counters
  SET value = value + 1
  WHERE name = 'visitors'
  RETURNING value INTO new_value;

  RETURN new_value;
END;
$$;
COMMENT ON FUNCTION increment_visitor_count IS 'Atomically increments the visitor counter and returns the new value.';

-- Create the resumes table with new fields for name and mobile
CREATE TABLE resumes (
    id SERIAL PRIMARY KEY,
    file_path TEXT NOT NULL,
    original_filename TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    name TEXT NOT NULL, 
    mobile TEXT,       
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE resumes IS 'Stores information about uploaded resumes, including applicant name and mobile.';

-- RLS Policies
-- Make profiles public
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Secure other tables by default
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactSubmissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE counters ENABLE ROW LEVEL SECURITY;

-- Define access policies for each table
-- Allow full access to service_role for all tables
CREATE POLICY "Allow full access for service_role" ON partners
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access for service_role" ON investors
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access for service_role" ON contactSubmissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access for service_role" ON suggestions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access for service_role" ON resumes
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- For counters, we only allow reads from anon users, and writes from service_role.
CREATE POLICY "Allow read access to everyone" ON counters
FOR SELECT
USING (true);

CREATE POLICY "Allow full access for service_role" ON counters
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Grant usage on the increment function to anon and authenticated roles
GRANT EXECUTE ON FUNCTION increment_visitor_count() TO anon;
GRANT EXECUTE ON FUNCTION increment_visitor_count() TO authenticated;
