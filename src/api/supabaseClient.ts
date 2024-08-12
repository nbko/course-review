// 수퍼베이스 세팅
import { createClient } from "@supabase/supabase-js";
import { Database } from "../db/supabase";

const client = createClient<Database>(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const supabase = () => client;
