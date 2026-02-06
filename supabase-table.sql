-- Run this SQL in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard/project/elekqabmqgwdgljwpvov/sql/new

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  service VARCHAR(100),
  message TEXT,
  source_page VARCHAR(50) DEFAULT 'home',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (public form submissions)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read all data
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

-- Done! Your table is ready to receive form submissions.
