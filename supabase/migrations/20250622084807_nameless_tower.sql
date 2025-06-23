/*
  # Enable Row Level Security and Create Policies

  1. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for public read access where appropriate

  2. Tables Updated
    - users: Users can read/update their own profile
    - requests: Users can manage their own requests
    - results: Users can read results for their requests
    - workflows: Users can manage their own workflows
    - billing_logs: Users can read their own billing history
    - engines: Public read access for all users
*/

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE engines ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_logs ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can create their own profile"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Requests table policies
CREATE POLICY "Users can read own requests"
  ON requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own requests"
  ON requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own requests"
  ON requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Results table policies
CREATE POLICY "Users can read results for own requests"
  ON results
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM requests 
      WHERE requests.id = results.request_id 
      AND requests.user_id = auth.uid()
    )
  );

CREATE POLICY "System can create results"
  ON results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM requests 
      WHERE requests.id = results.request_id 
      AND requests.user_id = auth.uid()
    )
  );

-- Engines table policies (public read access)
CREATE POLICY "Anyone can read engines"
  ON engines
  FOR SELECT
  TO authenticated
  USING (true);

-- Workflows table policies
CREATE POLICY "Users can read own workflows"
  ON workflows
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own workflows"
  ON workflows
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own workflows"
  ON workflows
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own workflows"
  ON workflows
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Billing logs table policies
CREATE POLICY "Users can read own billing logs"
  ON billing_logs
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create billing logs"
  ON billing_logs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);