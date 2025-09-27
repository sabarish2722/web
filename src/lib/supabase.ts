
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://zuvslodnigwuqfciqgvs.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1dnNsb2RuaWd3dXFmY2lxZ3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NjU1OTQsImV4cCI6MjA3NDU0MTU5NH0.2UMbPvOjtsgVDL-NDRdZTSAG9aesXbSrYpn_ZgVSnuU"

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anon key')
}

// By removing the custom fetch, we allow Supabase to use its default,
// which is more reliable for file uploads in a server environment.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
