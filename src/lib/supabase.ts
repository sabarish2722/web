
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or anonymous key. Check your .env file.');
}

// Public client (for client-side use with RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (for server-side use, bypasses RLS)
// This should only be used in server-side code (actions, route handlers)
let supabaseAdminSingleton: ReturnType<typeof createClient> | null = null;

if (supabaseServiceRoleKey) {
  supabaseAdminSingleton = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
} else {
  console.warn("Supabase service role key not found. Supabase admin client will not be initialized. Server-side operations requiring admin privileges will fail.");
}

export const supabaseAdmin = supabaseAdminSingleton;
