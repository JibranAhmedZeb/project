import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  display_name?: string;
  plan?: string;
  credits?: number;
  metadata?: any;
  created_at?: string;
}

export interface Request {
  id: string;
  user_id?: string;
  input_text: string;
  engine: string;
  status?: string;
  created_at?: string;
}

export interface Result {
  id: string;
  request_id?: string;
  output_type: string;
  output_url?: string;
  metadata?: any;
  created_at?: string;
}

export interface Engine {
  id: string;
  name: string;
  api_url?: string;
  category?: string;
  cost_per_call?: number;
  created_at?: string;
}

export interface Workflow {
  id: string;
  user_id?: string;
  name: string;
  steps: any;
  created_at?: string;
}

export interface BillingLog {
  id: string;
  user_id?: string;
  type: string;
  amount: number;
  description?: string;
  created_at?: string;
}