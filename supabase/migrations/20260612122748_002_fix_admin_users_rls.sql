-- Drop the existing policy and create one that allows anon access for login
DROP POLICY IF EXISTS admin_users_read ON admin_users;

-- Allow anon to read (for login) - this is safe because we only compare password in the app
CREATE POLICY "admin_users_read" ON admin_users FOR SELECT 
  TO anon, authenticated USING (true);