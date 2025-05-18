// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mxjhvjwjgqmavmasfypa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14amh2andqZ3FtYXZtYXNmeXBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3Njk5NjEsImV4cCI6MjA2MDM0NTk2MX0.LLk01H7ueKFPMFpZfNOv3zx8VsICu6Gh6msuSjBW2x0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});