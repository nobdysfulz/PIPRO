import { createClient } from '@supabase/supabase-js'

// Handle both Vite (import.meta.env) and Node.js (process.env) environments
const getEnvVar = (key) => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key]
  }
  return process.env[key]
}

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL')
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY')

// Throw error if required environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env.local file.\n' +
    'Required: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY\n' +
    `Current: URL=${supabaseUrl ? 'SET' : 'MISSING'}, ANON_KEY=${supabaseAnonKey ? 'SET' : 'MISSING'}`
  )
}

// SECURITY: Only use the anon key in client-side code
// Service role key should NEVER be exposed to the client as it bypasses RLS
// For admin operations, use Supabase Edge Functions with proper authentication
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase