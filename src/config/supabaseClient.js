
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.REACT_APP_SUPABASR_URL, process.env.REACT_APP_ANON_KEY);

export default supabase;