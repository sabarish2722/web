-- This script initializes the database schema for the macs11 application.
-- To use it, navigate to the SQL Editor in your Supabase dashboard,
-- paste the entire content of this file, and click "Run".

-- Drop existing tables and functions to ensure a clean slate.
-- Use "CASCADE" to remove dependent objects.
DROP FUNCTION IF EXISTS increment_visitor_count();
DROP TABLE IF EXISTS resumes;
DROP TABLE IF EXISTS counters;
DROP TABLE IF EXISTS investors;
DROP TABLE IF EXISTS contactSubmissions;
DROP TABLE IF EXISTS partners;


-- Create the table for partner submissions
CREATE TABLE partners (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    businessName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE partners IS 'Stores submissions from the "Become a Partner" form.';

-- Create the table for contact form submissions
CREATE TABLE contactSubmissions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE contactSubmissions IS 'Stores submissions from the "Get In Touch" form.';

-- Create the table for investor submissions
CREATE TABLE investors (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE investors IS 'Stores submissions from the investor deck request form.';

-- Create the table for resumes
CREATE TABLE resumes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  file_path TEXT NOT NULL,
  original_filename TEXT,
  file_size BIGINT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
COMMENT ON TABLE resumes IS 'Stores metadata for uploaded resume files.';

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


-- Enable Row Level Security (RLS) for all tables
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE contactSubmissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE counters ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service_role to perform all actions
-- This is secure because only your server (using the service_role_key) can bypass RLS.
-- The public 'anon' key used on the client-side will be blocked.
CREATE POLICY "Allow full access for service_role" ON partners
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access for service_role" ON contactSubmissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow full access for service_role" ON investors
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
