import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Ensure environment variables exist
const SUPABASE_URL: string | undefined = process.env.SUPABASE_URL;
const SUPABASE_KEY: string | undefined = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase configuration: SUPABASE_URL or SUPABASE_KEY");
}

// Create and export the Supabase client
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
