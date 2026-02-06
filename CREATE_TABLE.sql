-- Copy this ENTIRE SQL and paste in Supabase SQL Editor
-- Link: https://supabase.com/dashboard/project/elekqabmqgwdgljwpvov/sql/new

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

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT TO authenticated USING (true);
