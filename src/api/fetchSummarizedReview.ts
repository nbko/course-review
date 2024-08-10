import { supabase } from "./supabaseClient";

// functions to fetch summarized course reviews
// 요약된 리뷰를 꺼내서 가져다줌 (json 형식)
export const fetchSummarizedReview = async (course_id: number) => {
	const { data, error } = await supabase()
		.from("course_reviews")
		.select("comments_course, course_content, comments_professor, advice")
		.eq("course_id", course_id);

	if (error) {
		console.log(`no summarized course reviews for ${course_id}`, error);
		return null;
	}

	return data[0];
};
