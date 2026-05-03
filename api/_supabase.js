// Server-side Supabase client — uses the service-role key (bypasses RLS).
// NEVER import this file from the React app.
import { createClient } from '@supabase/supabase-js';

let cached = null;

export function getSupabase() {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}
