
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zuvslodnigwuqfciqgvs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1dnNsb2RuaWd3dXFmY2lxZ3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjU1OTQsImV4cCI6MjA3NDU0MTU5NH0.2UMbPvOjtsgVDL-NDRdZTSAG9aesXbSrYpn_ZgVSnuU"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anon key')
}

// Public client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations that require elevated privileges
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  console.log("Supabase service role key not found. Admin client will not be initialized.");
}

export const supabaseAdmin = supabaseServiceRoleKey ? createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
}) : null;
