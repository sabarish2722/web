
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// This check is for the public client, primarily for client-side use.
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or anonymous key is missing. Client-side Supabase functionality may be affected.');
}

// Public client (for client-side use with RLS)
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

// Admin client (for server-side use, bypasses RLS)
let supabaseAdminSingleton: ReturnType<typeof createClient> | null = null;

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
    if (supabaseUrl && supabaseServiceRoleKey) {
        supabaseAdminSingleton = createClient(supabaseUrl, supabaseServiceRoleKey, {
            auth: {
                autoRefreshToken: false,
                persistSession: false
            }
        });
    } else {
        console.warn("Supabase admin client not initialized. Server-side operations requiring admin privileges will fail. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your environment variables.");
    }
}

export const supabaseAdmin = supabaseAdminSingleton;
