import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ppdxycbrqhdlyqspkcaa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTI5NzY4OCwiZXhwIjoxOTUwODczNjg4fQ.jYA1TgdUR-jpYo1ycyVyf_eqLryXiSFZ82zDx5NvBx0';

// eslint-disable-next-line import/prefer-default-export
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
