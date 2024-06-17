import { supabase } from "./lib/helper/supabaseClient";
import { Json } from "./types/supabase";

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
export const getReviewsBySearch = async (terms: string) => {
	const { data, error } = await supabase()
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
	// using upsert to ignore duplicates
	const { data, error } = await supabase().from("instructors").upsert(
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

const getInstructor = async (name: string) => {
	const { data: instructorData, error: instructorError } = await supabase()
		.from("instructors")
		.select()
		.eq("name", name);

	if (instructorError)
		console.log("fetching non existent instructor:", instructorError);
	return instructorData;
};

// get or Insert Instructors
export const getOrInsertInstructor = async (name: string) => {
	// check if the instructor exists in the instructor table
	// if the instructor isn't in the table, add the instructor to the table
	// and return the id of the instructor

	const { data, error } = await supabase()
		.from("instructors")
		.upsert({ name }, { onConflict: "name", ignoreDuplicates: true });

	if (error) console.log("creating new ins. error:", error);
	else {
		const instructorData = await getInstructor(name);
		return instructorData[0].id;
	}
};

// create course_instructors
const linkInstructorToReview = async (
	course_id: number,
	instructor_id: number
) => {
	// check if the instructor is already linked to the course
	let { data: linkData, error: linkError } = await supabase()
		.from("instructor_reviews")
		.upsert(
			{ course_id, instructor_id },
			{ onConflict: "course_id, instructor_id", ignoreDuplicates: true }
		);
	// .eq("course_id", course_id)
	// .eq("instructor_id", instructor_id);

	if (linkError) console.log("linkerror:", linkError);
	else {
		const { data: linkNewData, error: linkNewError } = await supabase()
			.from("instructor_reviews")
			.select()
			.eq("course_id", course_id)
			.eq("instructor_id", instructor_id);

		if (linkNewError) console.log("link new error:", linkNewError);
		else return linkNewData[0].course_id;
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
	const { data, error } = await supabase().from("course_reviews").insert({
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

	// typescript is strict about type matching
	//  json type needs to be non-nullable to be used in the eq. method
	if (raw_data === null) return null;

	// check if there exists a review for the given course
	let { data: reviewData, error: reviewError } = await supabase()
		.from("raw_course_reviews")
		.select("id")
		.eq("course_id", course_id);

	// console.log("reviewData", reviewData);
	if (reviewError) throw reviewError;

	// else insert the data into the table
	if (reviewData?.length === 0) {
		const { data: newReview, error: newReviewError } = await supabase()
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
	return reviewData[0].id;
};

// get or insert course info
export const getOrInsertCourse = async (
	major: string,
	course_section: string,
	instructors: string,
	semester: string,
	link: string
) => {
	// check if the course with the given info already exists
	let { data: courseData, error: courseError } = await supabase()
		.from("courses")
		.select("id")
		.eq("major", major)
		.eq("course_section", course_section)
		.eq("semester", semester);
	if (courseError) throw courseError;

	// if there arent any, create a course with the given data
	if (courseData?.length === 0) {
		const { data: newCourse, error: newCourseError } = await supabase()
			.from("courses")
			.insert({
				major,
				course_section,
				instructors,
				semester,
				link,
			})
			.select();

		if (newCourseError) throw newCourseError;
		courseData = newCourse;
	}

	// return the id of the course
	return courseData[0].id;
};

// send course review data to the table
export const insertReviews = async (
	major: string,
	course_section: string,
	instructors: string,
	semester: string,
	link: string,
	raw_data: Json
) => {
	// console.log({ course_section, instructors, major, quarter, link, raw_data });

	// insert the data into the table only when the instructor has a review
	const instructorList = instructors.split(",");

	await getOrInsertCourse(
		major,
		course_section,
		instructors,
		semester,
		link
	).then(async (courseId) => {
		await getOrInsertReview(courseId, raw_data);
		for (const instructor of instructorList) {
			console.log("curr Insturctor", instructor);
			console.log("curr course id:", courseId);
			await getOrInsertInstructor(instructor).then(async (instructorId) => {
				await linkInstructorToReview(courseId, instructorId);
			});
			// console.log("linking review to instruc", review1);
		}
	});
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
