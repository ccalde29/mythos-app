import { createClient } from '@supabase/supabase-js';
import { config } from '../config';



export const supabase = createClient(config.supabase.url, config.supabase.url, {
  auth: {
    flowType: 'pkce',
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true
  }
});