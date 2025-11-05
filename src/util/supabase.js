
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePubli = process.env.NEXT_PUBLIC_SUPABASE_PUB;

const supabaseSecret = process.env.SUPABASE_SECRET;



export const supabaseClient = createClient ( supabaseUrl , supabasePubli );

export const supabaseServer = supabaseSecret && createClient ( supabaseUrl , supabaseSecret );

