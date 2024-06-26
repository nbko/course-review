import { supabase } from "../lib/helper/supabaseClient";
import { Json } from "../types/supabase";

export async function getReviews() {
	const { data, error } = await supabase()
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
	const { data, error } = await supabase()
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
// export const getReviewsBySearch = async (terms: string) => {
// 	const { data, error } = await supabase()
// 		.from("courses")
// 		.select("*")
// 		.is("deleted_at", null)
// 		.ilike("instructors", `%${terms}%`) // x care if it's upper/lower case
// 		.order("id", { ascending: false })
// 		.limit(500);
// 	if (error) throw error;
// 	else {
// 		return data;
// 	}
// };

// get reviews by searching
export const getReviewsByInstructor = async (
	major: string,
	instructor: string
) => {
	const { data, error } = await supabase()
		.from("courses")
		.select("course_section, title")
		.eq("major", major)
		.contains("instructors", [instructor]) // x care if it's upper/lower case
		.order("id", { ascending: false });
	// .limit(500);
	if (error) {
		console.log("can't get the instructor:", instructor);
		console.log("error:", error);
	} else {
		return data;
	}
};

export const getReviewsByCourseSection = async (
	instructor: string,
	course_section: string
) => {
	const { data, error } = await supabase()
		.from("courses")
		.select("id, instructors, semester, title")
		.ilike("course_section", `%${course_section}%`)
		.contains("instructors", [instructor])
		.order("course_section", { ascending: false });
	// .limit(500);
	if (error) {
		console.log("can't get the course:", course_section);
		console.log("error:", error);
	} else {
		return data;
	}
};

export const getRawCourseReviews = async (course_id: string) => {
	const { data, error } = await supabase()
		.from("raw_course_reviews")
		.select("id, raw_data")
		.eq("course_id", course_id);
	// .limit(500);
	if (error) {
		console.log("can't get the course review:", course_id);
		console.log("error:", error);
	} else {
		return data;
	}
};

// export const getReviewsByInstructor = async (
// 	major: string,
// 	instructor: string
// ) => {
// 	const { data, error } = await supabase()
// 		.from("courses")
// 		.select()
// 		.eq("major", major)
// 		.contains("instructors", [instructor]) // x care if it's upper/lower case
// 		.order("id", { ascending: false });
// 	// .limit(500);
// 	if (error) {
// 		console.log("can't get the instructor:", instructor);
// 		console.log("error:", error);
// 	} else {
// 		return data;
// 	}
// };
