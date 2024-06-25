import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getRawCourseReviews,
	getReviewsByCourseSection,
} from "./services/getReviews";

function CourseDetail() {
	const { courseSection } = useParams();
	const [courseData, setCourseData] = useState([]);
	const [courseReviews, setCourseReviews] = useState([]);

	useEffect(() => {
		async function fetchCourseData() {
			// if the major, instructor is selected and the search button is clicked
			const match = courseSection.match(/([a-zA-Z]+)(\d+)/);
			const letters = match[1];
			const digits = match[2];
			const formattedCourseSection = `${letters} ${digits}`;

			console.log("fetching course data:", formattedCourseSection);

			const courseInfo = await getReviewsByCourseSection(
				formattedCourseSection
			);
			console.log("course info:", courseInfo);
			setCourseData(courseInfo);
			// console.log("reviews:", reviews);
			console.log("fetched course data:", courseData);
		}
		fetchCourseData();
	}, [courseSection]);

	useEffect(() => {
		async function fetchCourseReviews() {
			console.log("fetching course reviews for", courseData);
			for (const course of courseData) {
				await getRawCourseReviews(course.id).then((courseReviews) =>
					setCourseReviews((prevReviews) => [...prevReviews, ...courseReviews])
				);
			}
		}

		if (courseData.length > 0) {
			fetchCourseReviews();
		}
		console.log("fetched raw reviews:", courseReviews);
	}, [courseData]);

	return (
		<div>
			<h2>Course Detail</h2>
			<p>Course Section: {courseSection}</p>
			{/* Add more detail here */}
		</div>
	);
}

export default CourseDetail;
