import { createSupabaseBrowserClient } from "./lib/helper/supabaseClient";

export async function getReviews() {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase
		.from("instructors")
		.select("*")
		.is("deleted_at", null)
		.order("id", {
			ascending: false,
		});
	if (error) throw error;
	else {
		console.log(data);
	}
}

export async function getReviewsById(id: number) {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase
		.from("courses")
		.select("*")
		.is("deleted_at", null)
		.eq("id", id);
	if (error) throw error;
	else {
		return data;
	}
}

export const getReviewsBySearch = async (terms: string) => {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase
		.from("courses")
		.select("*")
		.is("deleted_at", null)
		.ilike("instructors", `%${terms}%`) // x care if it's upper/lower case
		.order("id", { ascending: false })
		.limit(500);
	if (error) throw error;
	else {
		return data;
	}
};
