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

// get reviews by searching
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

// create Reviews
export const createReviews = async (
	course_section: string,
	instructors: string,
	major: string,
	quarter: string
) => {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase
		.from("courses")
		.insert({
			course_section,
			instructors,
			major,
			quarter,
		})
		.select();
	if (error) throw error;
	else {
		return data;
	}
};

// update Reviews
// updated_at: new Date().toISOString()
export const updateReviews = async (
	id: number,
	course_section: string,
	instructors: string,
	major: string,
	quarter: string
) => {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase
		.from("courses")
		.update({
			course_section,
			instructors,
			major,
			quarter,
		})
		.eq("id", id)
		.select();
	if (error) throw error;
	else {
		return data;
	}
};

// Delete Reviews (Soft Delete)
export const softDeleteReviews = async (id: number) => {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase
		.from("courses")
		.update({
			deleted_at: new Date().toISOString(),
		})
		.eq("id", id)
		.select();
	if (error) throw error;
	else {
		return data;
	}
};

// Delete Reviews (Hard Delete)
export const hardDeleteReviews = async (id: number) => {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase.from("courses").delete().eq("id", id);
	if (error) throw error;
	else {
		return data;
	}
};
