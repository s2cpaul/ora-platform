import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://naskxuojfdqcunotdjzi.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hc2t4dW9qZmRxY3Vub3RkanppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5Mzk2NTcsImV4cCI6MjA4MDUxNTY1N30.KFV7w7bElkvrYwc3CSF2ZYJsebiOhVOKh15fL5hM4sk";
export const supabase = createClient(supabaseUrl, supabaseKey);

createRoot(document.getElementById("root")!).render(<App />);
