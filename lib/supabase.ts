import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://attifyiizyxhlvjiofhe.supabase.co";

const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0dGlmeWlpenl4aGx2amlvZmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NTM2ODgsImV4cCI6MjA5NDUyOTY4OH0.Wbp4XElJupOdbHADF9pD-JFuQCLAN7TjEo6YUmdMILw";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
);