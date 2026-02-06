-- ============================================
-- SUPABASE TABLE SETUP FOR GREENSPACESS
-- Run this in: https://supabase.com/dashboard/project/elekqabmqgwdgljwpvov/sql/new
-- ============================================

-- Step 1: Create the table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(100),
  message TEXT,
  source_page VARCHAR(50) DEFAULT 'home',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
  ON contact_submissions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
  ON contact_submissions(email);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_source 
  ON contact_submissions(source_page);

-- Step 3: Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Step 4: Drop existing policies if any
DROP POLICY IF EXISTS "Allow public inserts" ON contact_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON contact_submissions;

-- Step 5: Create policy to allow anyone to insert data
CREATE POLICY "Allow public inserts" 
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Step 6: Create policy to allow authenticated users to read data
CREATE POLICY "Allow authenticated reads" 
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- ============================================
-- VERIFICATION QUERY
-- Run this after the above to verify setup:
-- ============================================
-- SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 10;
