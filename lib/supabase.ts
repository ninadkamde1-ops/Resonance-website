import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xqwtpedogujlqnsjlulm.supabase.co";
const supabasePublishableKey =
  "sb_publishable_K1Xr77nKurV33UIfIe-hSQ_vdRpasCm";
if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey
);