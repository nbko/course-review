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
		.select("id, instructors, semester, title, is_summarized")
		.ilike("course_section", `%${course_section}%`)
		.contains("instructors", [instructor])
		.order("course_section", { ascending: false });
	// .limit(500);
	if (error) {
		console.log("can't get the course:", course_section);
		console.log("error:", error);
	} else {
		if (data[0].is_summarized) {
			// await get summarized course reviews
			// return summarized course reviews
		} else {
			// fetch raw course reviews
			// use gpt api to summarize course reviews
			// insert it into the course_reviews table
			// fetch the info from the course reviews table
		}
		const rawCourseReviews = await getRawCourseReviews(data[0].id);
		// data를 return받으면 data에 content가 없어도 그 밖의 다른 것 때문에 length가 0이 아닌가?
		if (rawCourseReviews && rawCourseReviews) {
			const courseReviews = await getSumamrizedCourseReviews(
				rawCourseReviews[0].id
			);
			if (courseReviews) return courseReviews;
		} else if (rawCourseReviews) {
			//gpt api를 불러서 summarize 하고 그걸 course reviews의 semester, comments_course,
			// course_content, comments_professor, advice 에 저장하고 get을 다시 불러서 그 내용을 가져와야
			// 그걸 화면에 그려볼 수 있어
			// 그 후 raw course review의 is summarized를 set tru하면 됨
			// 근데 이걸 다 get reviews by course section에서 하나?

			rawCourseReviews[0].is_summarized = true;
		} else {
			console.log("raw course review 가져올 수 없음");
		}
	}
};

// this function gives us the raw course review if the course isn't summarized
// return the raw course reviews only when it's not summarized
export const getRawCourseReviews = async (course_id: number) => {
	const { data, error } = await supabase()
		.from("raw_course_reviews")
		.select("id, raw_data, is_summarized")
		.eq("course_id", course_id)
		.eq("is_summarized", false);
	// .limit(500);
	if (error) {
		console.log("can't get the course review:", course_id);
		console.log("error:", error);
	} else {
		return data;
	}
};

// this function gives us the raw course review if the course isn't summarized
export const getSumamrizedCourseReviews = async (course_id: number) => {
	const { data, error } = await supabase()
		.from("course_reviews")
		.select("id, raw_data")
		.eq("course_id", course_id)
		.eq("is_summarized", false);
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
