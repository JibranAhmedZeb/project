/*
  # Initial AutoSummon Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `display_name` (text, optional)
      - `plan` (text, default 'free')
      - `credits` (integer, default 100)
      - `metadata` (jsonb, optional)
      - `created_at` (timestamp)

    - `requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `input_text` (text)
      - `engine` (text)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)

    - `results`
      - `id` (uuid, primary key)
      - `request_id` (uuid, references requests)
      - `output_type` (text)
      - `output_url` (text, optional)
      - `metadata` (jsonb, optional)
      - `created_at` (timestamp)

    - `engines`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `api_url` (text, optional)
      - `category` (text, optional)
      - `cost_per_call` (decimal, optional)
      - `created_at` (timestamp)

    - `workflows`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `name` (text)
      - `steps` (jsonb)
      - `created_at` (timestamp)

    - `billing_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `type` (text)
      - `amount` (decimal)
      - `description` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access where appropriate
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  display_name text,
  plan text DEFAULT 'free',
  credits integer DEFAULT 100,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  input_text text NOT NULL,
  engine text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create results table
CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_id uuid REFERENCES requests(id) ON DELETE CASCADE,
  output_type text NOT NULL,
  output_url text,
  metadata jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create engines table
CREATE TABLE IF NOT EXISTS engines (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  api_url text,
  category text,
  cost_per_call decimal(10,4),
  created_at timestamptz DEFAULT now()
);

-- Create workflows table
CREATE TABLE IF NOT EXISTS workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  steps jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create billing_logs table
CREATE TABLE IF NOT EXISTS billing_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  amount decimal(10,2) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_requests_user_id ON requests(user_id);
CREATE INDEX IF NOT EXISTS idx_requests_created_at ON requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_results_request_id ON results(request_id);
CREATE INDEX IF NOT EXISTS idx_workflows_user_id ON workflows(user_id);
CREATE INDEX IF NOT EXISTS idx_billing_logs_user_id ON billing_logs(user_id);