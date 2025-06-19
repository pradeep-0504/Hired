// ✅ supabase.js (inside /utils or wherever it's saved)
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const SupabaseClient = async (supabaseAccessToken) => {
    console.log("Supabase access token:", supabaseAccessToken);
  const supabase= createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: `Bearer ${supabaseAccessToken}`,
      },
    },
  });
  return supabase;
};

export default SupabaseClient;
