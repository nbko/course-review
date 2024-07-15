import { supabase } from "../lib/helper/supabaseClient";
import { Json } from "../types/supabase";
import { getGPT } from "./services/gpt";

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

// function to handle errors
const handleError = (context: string, error: any) => {
	console.log(`can't get the ${context}:`, error);
};

// function to fetch course data
const fetchCourseData = async (instructor: string, course_section: string) => {
	const { data, error } = await supabase()
		.from("courses")
		.select("id, instructors, semester, title, is_summarized")
		.ilike("course_section", `%${course_section}`)
		.contains("instructors", [instructor])
		.order("course_section", { ascending: false });

	if (error) {
		handleError(`fetch course ${course_section}`, error);
		return null;
	}
	return data;
};

// functions to fetch raw course reviews
const getRawCourseReviews = async (course_id: number) => {
	const { data, error } = await supabase()
		.from("raw_course_reviews")
		.select("id, raw_data")
		.eq("course_id", course_id);

	if (error) {
		handleError(`raw course review ${course_id}`, error);
		return null;
	}

	return data;
};

// function to fetch sumamrized course reviews
const getSummarizedCourseReviews = async (course_id: number) => {
	const { data, error } = await supabase()
		.from("course_reviews")
		.select("*")
		.eq("course_id", course_id);
	if (error) {
		handleError(`summarized course review ${course_id}`, error);
		return null;
	} else {
		return data;
	}
};

// function to sumamrize and save course reviews
const saveSummarizedCourseReviews = async (rawCourseReviews: any) => {
	// Implement the logic to summarize and save the course reviews using GPT API
};

export const getReviewsByCourseSection = async (
	instructor: string,
	course_section: string
) => {
	const courseData = await fetchCourseData(instructor, course_section);

	if (!courseData || courseData.length === 0) {
		console.log("no course data found");
		return null;
	}

	const course = courseData[0];
	console.log("fetched course:", course);

	if (course.is_summarized) {
		// Fetch summarized course reviews
		// Implement the logic to fetch and return summarized course reviews
	} else {
		const rawCourseReviews = await getRawCourseReviews(course.id);

		if (rawCourseReviews && rawCourseReviews) {
			const summarizedReviews = await getSummarizedCourseReviews(
				rawCourseReviews[0].id
			);
			if (summarizedReviews) return summarizedReviews;
		} else if (rawCourseReviews) {
			console.log("raw course reviews:", rawCourseReviews[0]);
			await saveSummarizedCourseReviews(rawCourseReviews);

			// Set the course as summarized
			// we should probably get the data again or do upsert/insert to change this
			// rawCourseReviews[0].is_summarized = true;
		} else {
			console.log("raw course review 가져올 수 없음");
		}
	}
};

// this function gives us the raw course review if the course isn't summarized
// return the raw course reviews only when it's not summarized
// export const getRawCourseReviews = async (course_id: number) => {
// 	const { data, error } = await supabase()
// 		.from("raw_course_reviews")
// 		.select("id, raw_data, is_summarized")
// 		.eq("course_id", course_id)
// 		.eq("is_summarized", false);
// 	// .limit(500);
// 	if (error) {
// 		console.log("can't get the course review:", course_id);
// 		console.log("error:", error);
// 	} else {
// 		return data;
// 	}
// };

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
