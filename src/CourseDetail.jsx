import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getRawCourseReviews,
	getReviewsByCourseSection,
} from "./services/getReviews";
import Paper from "@mui/material/Paper";
import { useAtomValue } from "jotai";
import * as post from "./state/post";

function CourseDetail() {
	const courseSection = useAtomValue(post.courseSection);
	const instructor = useAtomValue(post.instructor);
	const [courseData, setCourseData] = useState([]);
	const [courseReviews, setCourseReviews] = useState([]);

	useEffect(() => {
		async function fetchCourseData() {
			// if the major, instructor is selected and the search button is clicked
			// const match = courseSection.match(/([a-zA-Z]+)(\d+)/);
			// const letters = match[1];
			// const digits = match[2];
			// const formattedCourseSection = `${letters} ${digits}`;

			// console.log("fetching course data:", formattedCourseSection);

			const courseInfo = await getReviewsByCourseSection(
				instructor,
				courseSection
			);
			console.log("course info:", courseInfo);
			setCourseData(courseInfo);
			// console.log("reviews:", reviews);
			//console.log("fetched course data:", courseData);
		}
		fetchCourseData();
	}, [instructor, courseSection]);

	useEffect(() => {
		const updatedCourseReviews = [];

		async function fetchCourseReviews() {
			console.log("fetching course reviews for", courseData);
			for (const course of courseData) {
				const reviews = await getRawCourseReviews(course.id);

				const courseWithReviews = {
					...course,
					reviews: reviews.map((review) => ({
						review_id: review.id,
						raw_data: review.raw_data,
					})),
				};

				updatedCourseReviews.push(courseWithReviews);
			}

			setCourseReviews(updatedCourseReviews);
		}

		fetchCourseReviews();

		console.log("fetched raw reviews:", courseReviews);
	}, [courseData]);

	return (
		<div style={{ margin: "2rem" }}>
			<h2>Course Detail</h2>
			<p>Course Section: {courseSection}</p>
			<Paper style={{ padding: "1rem", background: "#f7f7f7" }}>
				{courseReviews &&
					courseReviews.map((course, i) => (
						<Paper
							key={i}
							style={{
								padding: "1rem",
								marginTop: "1rem",
							}}
						>
							<h3>{course.course_title}</h3>
							<h4 className="course-info">
								Professor {course.instructors.join(", ")} / {course.semester}
							</h4>
							{course.reviews.map((review, index) => (
								<div key={index} style={{ marginBottom: "1rem" }}>
									{Object.entries(review).map(([key, value]) => (
										<div key={key}>
											{key === "raw_data" ? (
												<>
													<strong>Review:</strong>
													<div>{JSON.stringify(value)}</div>
												</>
											) : null}
											{/* {key === "raw_data" && typeof value === "object"
												? JSON.stringify(value)
												: value} */}
										</div>
									))}
								</div>
							))}
						</Paper>
					))}
			</Paper>
		</div>
	);
}

export default CourseDetail;
