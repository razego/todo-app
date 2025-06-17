import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

// Singleton pattern to avoid creating multiple clients during dev hot reloads
export const supabase = createClient(supabaseUrl, supabaseKey); 