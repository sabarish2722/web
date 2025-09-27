
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
