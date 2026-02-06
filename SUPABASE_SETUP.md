# Supabase Database Setup Instructions

## Step 1: Create Supabase Account
1. Go to https://supabase.com
2. Sign up for a free account
3. Create a new project

## Step 2: Create Database Table
Run this SQL in your Supabase SQL Editor:

```sql
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

-- Create index for faster queries
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to read
CREATE POLICY "Allow authenticated reads" ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
```

## Step 3: Get Your Credentials
1. Go to Project Settings > API
2. Copy your:
   - Project URL (looks like: https://xxxxx.supabase.co)
   - Anon/Public Key (starts with: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)

## Step 4: Update Configuration
Open `js/supabase-handler.js` and replace:

```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your key
```

## Step 5: Test
1. Open your website
2. Fill out the contact form
3. Submit the form
4. Check your Supabase dashboard > Table Editor > contact_submissions
5. You should see the new entry!

## Features
- ✅ Automatic form data saving to Supabase
- ✅ Email notification still works via FormSubmit
- ✅ Validation before saving
- ✅ Error handling
- ✅ No page reload
- ✅ Toast notifications

## View Your Data
To view submissions in Supabase:
1. Go to your Supabase dashboard
2. Click "Table Editor" in the left menu
3. Select "contact_submissions" table
4. View all form submissions with timestamps

## Export Data
You can export data as CSV/JSON from the Supabase dashboard for analysis.

## Security
- Row Level Security (RLS) is enabled
- Only inserts are allowed from public
- Reads require authentication
- Your anon key is safe to use in frontend code
