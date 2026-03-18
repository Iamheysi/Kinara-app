import { createClient } from '@supabase/supabase-js';

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPA_URL || !SUPA_KEY) {
  console.error('[Kinara] Missing Supabase env vars. Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(SUPA_URL, SUPA_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
