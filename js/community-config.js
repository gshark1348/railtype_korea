/*
 * RAILTYPE KOREA Community configuration
 *
 * GitHub Pages is a static host, so shared records require an external database.
 * 1. Create a Supabase project.
 * 2. Run supabase/community-schema.sql in the SQL editor.
 * 3. Paste the Project URL and anon public key below.
 *
 * The anon key is designed to be used in browsers. Never place a service-role key here.
 */
window.RAILTYPE_COMMUNITY_CONFIG = {
  enabled: true,
  supabaseUrl: "https://yskkbhusdxulyilueoep.supabase.co",
  anonKey: "sb_publishable_2NTLx6H1AYgXc2TAM45eZA_wc-Yf3o6",
  table: "public_runs",
  maxRecords: 36,
  leaderboardPerLine: 8
};
