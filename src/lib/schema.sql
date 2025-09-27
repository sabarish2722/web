
-- Drop existing tables if they exist to start fresh.
DROP TABLE IF EXISTS public.partners;
DROP TABLE IF EXISTS public.contactSubmissions;
DROP TABLE IF EXISTS public.investors;
DROP TABLE IF EXISTS public.counters;
DROP TABLE IF EXISTS public.resumes;

-- Create the partners table
CREATE TABLE public.partners (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    businessName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the contactSubmissions table
CREATE TABLE public.contactSubmissions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the investors table
CREATE TABLE public.investors (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the counters table for visitor count
CREATE TABLE public.counters (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL UNIQUE,
  value BIGINT NOT NULL DEFAULT 0
);

-- Create the resumes table for file uploads
CREATE TABLE public.resumes (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMPTZ WITH TIME ZONE DEFAULT NOW() NOT NULL,
  file_path TEXT NOT NULL,
  original_filename TEXT,
  file_size BIGINT
);


-- Function to increment the visitor count
create or replace function increment_visitor_count()
returns int
language plpgsql
as $$
declare
  new_count int;
begin
  -- Ensure the counter exists
  insert into public.counters (name, value)
  values ('visitors', 0)
  on conflict (name) do nothing;

  -- Increment the value and return the new value
  update public.counters
  set value = value + 1
  where name = 'visitors'
  returning value into new_count;

  return new_count;
end;
$$;


-- Grant usage on the public schema to the anon role
GRANT USAGE ON SCHEMA public TO anon;

-- Grant select permissions on all tables to the anon role
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;

-- Note: Form submissions (partners, contact, investors) and file uploads (resumes)
-- are handled via server actions using the service_role key, which bypasses RLS.
-- Therefore, we don't need to grant INSERT permissions to the anon or authenticated roles.
-- The visitor counter is handled by a plpgsql function that is secure.
