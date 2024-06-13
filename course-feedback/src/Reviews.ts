import { createSupabaseBrowserClient } from "./lib/helper/supabaseClient";
import { Json } from "./types/supabase";

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

export const createInstructors = async (name: string) => {
	const supabase = createSupabaseBrowserClient();
	// using upsert to ignore duplicates
	const { data, error } = await supabase.from("instructors").upsert(
		{
			name,
		},
		{ onConflict: "name" }
	);
	if (error) throw error;
	else {
		return data;
	}
};

// create course_instructors
const course_instructors = async (course_id: number, instructor_id: number) => {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase.from("course_instructors").insert({
		course_id,
		instructor_id,
	});
	if (error) throw error;
	else {
		return data;
	}
};

// create summarized course review
const createCourseReviews = async (
	course_id: number,
	quarter: string,
	comments_course: string,
	course_content: string,
	comments_professor: string,
	advice: string
) => {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase.from("course_reviews").insert({
		course_id,
		quarter,
		comments_course,
		course_content,
		comments_professor,
		advice,
	});
	if (error) throw error;
	else return data;
};

const createRawCourseReview = async (
	course_id: number,
	raw_data: Json,
	no_reviews: boolean
) => {
	const supabase = createSupabaseBrowserClient();
	const { data, error } = await supabase
		.from("raw_course_reviews")
		.insert({
			course_id,
			raw_data,
			no_reviews,
		})
		.select();
	if (error) throw error;
	else {
		return data;
	}
};

// create course info
export const createCourseInfo = async (
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
		return data[0].id;
	}
};

// create course reviews
export const createReviews = async (
	course_section: string,
	instructors: string,
	major: string,
	quarter: string,
	raw_data: Json
	// comments_course: string,
	// course_content: string,
	// comments_professor: string,
	// advice: string
) => {
	const instructorList = instructors.split(",");
	const courseId = await createCourseInfo(
		course_section,
		instructors,
		major,
		quarter
	);
	let noReviews = false;
	if (
		typeof raw_data === "object" &&
		raw_data !== null &&
		"error" in raw_data
	) {
		noReviews = true;
	}
	const rawData = await createRawCourseReview(courseId, raw_data, noReviews);
	console.log(rawData);
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
