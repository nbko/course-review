import { supabase } from "./lib/helper/supabaseClient";

export default async function getReviews() {
	const result = await supabase.from("reviews").select("*");
	console.log(result.data);
}
