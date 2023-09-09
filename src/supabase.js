import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://fcyxcyxtpxksqvyeulus.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjeXhjeXh0cHhrc3F2eWV1bHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIxMzA1NTQsImV4cCI6MTk4NzcwNjU1NH0.DHbYpKvjkSJD5AwmF0eH9NvAz4iAGpXHMjPhS9tKShQ"
);