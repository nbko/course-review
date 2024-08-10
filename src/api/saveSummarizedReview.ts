import { supabase } from "./supabaseClient";

// 요약한 수업 후기를 db에 저장해줌
export const saveSummarizedReview = async (
	raw_course_review_id: number,
	comments_course: string,
	course_content: string,
	comments_professor: string,
	advice: string,
	course_id: number
) => {
	const { data, error } = await supabase().from("course_reviews").upsert(
		{
			raw_course_review_id,
			comments_course,
			course_content,
			comments_professor,
			advice,
			course_id,
		},
		{ onConflict: "raw_course_review_id" }
	);

	if (error) {
		console.log(
			`failed to save summarized review. course_id: ${course_id}, raw course review id: ${raw_course_review_id}`,
			error
		);
	}

	return data;
};
