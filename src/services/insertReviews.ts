import { supabase } from "../lib/helper/supabaseClient";
import { Json } from "../db/supabase";

// get instructor if exists
const getInstructor = async (name: string) => {
	const { data: instructorData, error: instructorError } = await supabase()
		.from("instructors")
		.select()
		.eq("name", name);

	if (instructorError) {
		console.log("instructorError:", instructorError);
		return null;
	}
	return instructorData;
};

// get or Insert Instructors
export const getOrInsertInstructor = async (name: string) => {
	// check if the instructor exists in the instructor table
	// if the instructor isn't in the table, add the instructor to the table
	// and return the id of the instructor
	console.log("given name:", name);

	const { data: newInstructorData, error } = await supabase()
		.from("instructors")
		.upsert({ name }, { onConflict: "name", ignoreDuplicates: true });

	if (error) {
		console.log("newInstructorError:", error);
		return null;
	} else {
		// fetch the instructor data
		const instructorData = await getInstructor(name);

		if (instructorData && instructorData.length > 0) {
			return instructorData[0].id;
		} else {
			console.log("no matching instructor found");
			return null;
		}
	}
};

// create course_instructors
const linkInstructorToReview = async (
	course_id: number,
	instructor_id: number
) => {
	// update the relationship btwn the instructor and the course if needed
	let { data, error: newLinkError } = await supabase()
		.from("instructor_reviews")
		.upsert(
			{ course_id, instructor_id },
			{ onConflict: "course_id, instructor_id", ignoreDuplicates: true }
		);

	if (newLinkError) {
		console.log("link new data error:", newLinkError);
		return null;
	} else {
		// fetch the instructor review data
		const { data: linkData, error: linkError } = await supabase()
			.from("instructor_reviews")
			.select()
			.eq("course_id", course_id)
			.eq("instructor_id", instructor_id);

		if (linkError) {
			console.log("link error:", linkError);
			return null;
		} else if (linkData && linkData.length > 0) {
			return linkData[0].course_id;
		} else {
			console.log("no matching link found");
			return null;
		}
	}
};

// create summarized course review
// const createCourseReviews = async (
// 	course_id: number,
// 	quarter: string,
// 	comments_course: string,
// 	course_content: string,
// 	comments_professor: string,
// 	advice: string
// ) => {
// 	const { data, error } = await supabase().from("course_reviews").insert({
// 		course_id,
// 		quarter,
// 		comments_course,
// 		course_content,
// 		comments_professor,
// 		advice,
// 	});
// 	if (error) throw error;
// 	else return data;
// };

// get or insert course reviews
const getOrInsertReview = async (course_id: number, raw_data: Json) => {
	// typescript is strict about type matching
	//  json type needs to be non-nullable to be used in the eq. method
	if (raw_data === null) return null;

	const { data: newReviewData, error: newReviewError } = await supabase()
		.from("raw_course_reviews")
		.upsert(
			{
				course_id,
				raw_data,
			},
			{ onConflict: "course_id", ignoreDuplicates: true }
		);

	if (newReviewError) {
		console.log("new review error:", newReviewError);
		return null;
	} else {
		// check if there exists a review for the given course
		let { data: reviewData, error: reviewError } = await supabase()
			.from("raw_course_reviews")
			.select("id")
			.eq("course_id", course_id);

		// review data contains data and return the id
		if (reviewError) {
			console.log("review error:", reviewError);
			return null;
		} else if (reviewData && reviewData.length > 0) {
			return reviewData[0].id;
		} else {
			console.log("no matching review data found");
			return null;
		}
	}
};

// get or insert course info
export const getOrInsertCourse = async (
	major: string,
	course_section: string,
	title: string,
	instructors: string[],
	semester: string,
	link: string
) => {
	const { data: newCourse, error: newCourseError } = await supabase()
		.from("courses")
		.upsert(
			{
				major,
				course_section,
				title,
				instructors,
				semester,
				link,
			},
			{
				onConflict: [
					"major, course_section, title, instructors, semester, link",
				],
				ignoreDuplicates: true,
			}
		);

	if (newCourseError) {
		console.log("new course error:", newCourseError);
		return null;
	} else {
		// fetch the course data
		let { data: courseData, error: courseError } = await supabase()
			.from("courses")
			.select("id")
			.eq("major", major)
			.eq("course_section", course_section)
			.eq("title", title)
			.eq("semester", semester);

		// ensure course data contains data and return the ID
		if (courseError) {
			console.log("course error:", courseError);
			return null;
		} else if (courseData && courseData.length > 0) {
			return courseData[0].id;
		} else {
			console.log("no matching course data found");
			return null;
		}
	}
};

// send course review data to the table
export const insertReviews = async (
	major: string,
	course_section: string,
	title: string,
	instructors: string[],
	semester: string,
	link: string,
	raw_data: Json
) => {
	// console.log({ course_section, instructors, major, quarter, link, raw_data });

	const courseId = await getOrInsertCourse(
		major,
		course_section,
		title,
		instructors,
		semester,
		link
	);

	if (courseId) {
		await getOrInsertReview(courseId, raw_data);

		for (const instructor of instructors) {
			const currInstructor = instructor.trim().split(/\s+/).join(" ");
			const instructorId = await getOrInsertInstructor(currInstructor);
			if (instructorId) {
				await linkInstructorToReview(courseId, instructorId);
			} else {
				console.log("undefined instructor id:", {
					major,
					course_section,
					title,
					instructors,
					semester,
					link,
				});
			}
		}
	} else {
		console.log("undefined course id:", {
			major,
			course_section,
			title,
			instructors,
			semester,
			link,
		});
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
	const { data, error } = await supabase()
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
	const { data, error } = await supabase()
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
	const { data, error } = await supabase()
		.from("courses")
		.delete()
		.eq("id", id);
	if (error) throw error;
	else {
		return data;
	}
};
