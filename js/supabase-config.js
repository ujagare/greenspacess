/**
 * Supabase Configuration
 * Replace these with your actual Supabase project credentials
 */
const SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL', // Replace with your Supabase project URL
  anonKey: 'YOUR_SUPABASE_ANON_KEY' // Replace with your Supabase anon/public key
};

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
