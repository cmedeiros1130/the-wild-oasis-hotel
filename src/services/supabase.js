import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://awvbbpsurscuiweyipyi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3dmJicHN1cnNjdWl3ZXlpcHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ3Njc1NDUsImV4cCI6MjAzMDM0MzU0NX0.U64LtYwY03W0RgrN_pGBPiYQ_pUQ6x7oVaJp9IPEzn8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
