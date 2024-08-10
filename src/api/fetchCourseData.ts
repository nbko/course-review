import { supabase } from "./supabaseClient";

// function to handle errors
const handleError = (context: string, error: any) => {
	console.log(`can't get the ${context}:`, error);
};

// get reviews for the given instructor and major
// 전공과 교수님 이름을 받고 데이터베이스에서 summarize해서 리뷰를 꺼내주는 함수
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

// function to fetch course data
export const fetchCourseData = async (
	instructor: string,
	course_section: string
) => {
	const { data, error } = await supabase()
		.from("courses")
		.select("*")
		.ilike("course_section", `%${course_section}%`)
		.contains("instructors", [instructor])
		.order("course_section", { ascending: false });

	if (error) {
		handleError(`no course data found for ${course_section}`, error);
		return null;
	}
	return data;
};
