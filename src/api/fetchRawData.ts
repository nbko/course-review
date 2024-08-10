import { supabase } from "./supabaseClient";

// functions to fetch raw course reviews
// 수업 코드를 입력받고 요약해야할 리뷰를 주는 함수
export const fetchRawData = async (course_id: number) => {
	const { data, error } = await supabase()
		.from("raw_course_reviews")
		.select("id, raw_data")
		.eq("course_id", course_id);

	if (error) {
		console.log(`no raw course reviews for ${course_id}`, error);
		return null;
	}

	return data[0];
};
