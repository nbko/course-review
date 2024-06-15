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

// get or Insert Instructors
const getOrInsertInstructor = async (name: string) => {
	const supabase = createSupabaseBrowserClient();
	// check if the instructor is already linked to the course
	let { data: instructorData, error: instructorError } = await supabase
		.from("instructors")
		.select("id")
		.eq("name", name);

	if (instructorError) throw instructorError;
	if (instructorData?.length === 0) {
		const { data: newInstructorData, error: newInstructorError } =
			await supabase.from("instructors").insert({ name }).select();

		if (newInstructorError) throw newInstructorError;
		instructorData = newInstructorData;
	}

	return instructorData[0].id;
};

// create course_instructors
const linkInstructorToReview = async (
	course_id: number,
	instructor_id: number
) => {
	if (course_id === null || instructor_id === null) return null;

	const supabase = createSupabaseBrowserClient();

	// check if the instructor is already linked to the course
	let { data: linkData, error: linkError } = await supabase
		.from("instructor_reviews")
		.select("course_id, instructor_id")
		.eq("course_id", course_id)
		.eq("instructor_id", instructor_id);

	if (linkError) throw linkError;
	if (linkData?.length === 0) {
		const { data: linkNewData, error: linkNewError } = await supabase
			.from("instructor_reviews")
			.insert({ course_id, instructor_id })
			.select();

		if (linkNewError) throw linkNewError;
		linkData = linkNewData;
	}
	return linkData[0].course_id;
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

// get or insert course reviews
const getOrInsertReview = async (course_id: number, raw_data: Json) => {
	// console.log("course_id:", course_id, "raw_data:", raw_data);
	const supabase = createSupabaseBrowserClient();

	// typescript is strict about type matching
	//  json type needs to be non-nullable to be used in the eq. method
	if (raw_data === null) return null;

	// check if there exists a review for the given course
	let { data: reviewData, error: reviewError } = await supabase
		.from("raw_course_reviews")
		.select("id")
		.eq("course_id", course_id);

	// console.log("reviewData", reviewData);
	if (reviewError) throw reviewError;

	// else insert the data into the table
	if (reviewData?.length === 0) {
		const { data: newReview, error: newReviewError } = await supabase
			.from("raw_course_reviews")
			.insert({
				course_id,
				raw_data,
			})
			.select();

		if (newReviewError) throw newReviewError;
		reviewData = newReview;
	}
	// return the id of the review data
	console.log("course review:", reviewData[0].raw_data);
	return reviewData[0].id;
};

// get or insert course info
export const getOrInsertCourse = async (
	course_section: string,
	instructors: string,
	major: string,
	quarter: string,
	link: string
) => {
	const supabase = createSupabaseBrowserClient();

	// check if the course with the given info already exists
	let { data: courseData, error: courseError } = await supabase
		.from("courses")
		.select("id")
		.eq("course_section", course_section)
		.eq("quarter", quarter);
	if (courseError) throw courseError;

	// if there arent any, create a course with the given data
	if (courseData?.length === 0) {
		const { data: newCourse, error: newCourseError } = await supabase
			.from("courses")
			.insert({
				course_section,
				instructors,
				major,
				quarter,
				link,
			})
			.select();

		if (newCourseError) throw newCourseError;
		courseData = newCourse;
	}

	// return the id of the course
	return courseData[0].id;
};

// create course reviews, insert data to the raw data table
export const insertReviews = async (
	course_section: string,
	instructors: string,
	major: string,
	quarter: string,
	link: string,
	raw_data: Json
) => {
	// console.log({ course_section, instructors, major, quarter, link, raw_data });
	// check if there are any reviews.
	let noReviews = false;
	if (
		typeof raw_data === "object" &&
		raw_data !== null &&
		"error" in raw_data
	) {
		noReviews = true;
	}
	// insert the data into the table only when there are any course reviews
	if (!noReviews) {
		const instructorList = instructors.split(",");

		const courseId = await getOrInsertCourse(
			course_section,
			instructors,
			major,
			quarter,
			link
		);

		const reviewId = await getOrInsertReview(courseId, raw_data);

		for (const instructor of instructorList) {
			// console.log("curr Insturctor", instructor);
			const instructorId = await getOrInsertInstructor(instructor);
			await linkInstructorToReview(courseId, instructorId);
			// console.log("linking review to instruc", review1);
		}

		// check if the instructor has a course review
		// for (const instructor in instructorList) {
		// 	instructor.
		// }
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
