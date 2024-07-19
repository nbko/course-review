import { fetchCourseData } from "../api/fetchCourseData";
import { fetchSummarizedReview } from "../api/fetchSummarizedReview";
import { fetchRawData } from "../api/fetchRawData";
import { summarizeData } from "../api/summarizeData.js";
import { saveSummarizedReview } from "../api/saveSummarizedReview";
import { supabase } from "../api/supabaseClient.js";

// check for summaries, fetch raw data, summarize, save, and return
export const getSummarizedReview = async (
	instructor: string,
	course_section: string
) => {
	try {
		// fetch course data
		const courseData = await fetchCourseData(instructor, course_section);

		if (!courseData || courseData.length === 0) {
			console.log("no course data found");
			return null;
		}

		console.log("fetched course:", courseData);

		const updatedCourseReviews = [];
		for (const course of courseData) {
			// check if the course is summarized
			if (course.is_summarized) {
				console.log("the course is summarized");
				// fetch summarized reviews
				const summary = await fetchSummarizedReview(course.id);
				const courseWithReviews = {
					...course,
					...summary,
				};

				updatedCourseReviews.push(courseWithReviews);
			} else {
				console.log("the course isn't summarized");
				// Fetch raw data
				const reviews = await fetchRawData(course.id);
				if (!reviews) {
					throw new Error(
						`No raw data found for course section: ${course_section}`
					);
				}

				// Summarize data using ChatGPT
				let summary = await summarizeData(reviews.raw_data);
				summary = JSON.parse(summary.choices[0].message.content);

				console.log("summary:", summary);
				if (!summary || summary.length === 0) {
					throw new Error("Failed to summarize data");
				}

				// Save summarized review
				let { comments_course, course_content, comments_professor, advice } =
					summary;

				console.log(
					reviews.id,
					comments_course,
					course_content,
					comments_professor,
					advice,
					course.id
				);

				await saveSummarizedReview(
					reviews.id,
					comments_course,
					course_content,
					comments_professor,
					advice,
					course.id
				);

				await supabase()
					.from("courses")
					.update({ is_summarized: true })
					.eq("id", course.id);

				const courseWithReviews = {
					...course,
					...summary,
				};

				console.log("course with reviews:", courseWithReviews);

				updatedCourseReviews.push(courseWithReviews);
			}
		}

		console.log("updated course reviews:", updatedCourseReviews);
		return updatedCourseReviews;
	} catch (error) {
		console.log("error occurred in dataService.ts file", error);
		return null;
	}
};
