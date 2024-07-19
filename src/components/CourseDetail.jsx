import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getRawCourseReviews,
	getReviewsByCourseSection,
} from "../services/getReviews";
import { getSummarizedReview } from "../services/dataService.ts";
import Paper from "@mui/material/Paper";
import { useAtomValue } from "jotai";
import * as post from "../state/atoms.js";

// 수업 디테일 불러오는 함수
function CourseDetail() {
	const courseSection = useAtomValue(post.courseSection);
	const instructor = useAtomValue(post.instructor);
	// const [courseData, setCourseData] = useState([]);
	const [courseReviews, setCourseReviews] = useState([]);

	useEffect(() => {
		async function fetchCourseData() {
			const summary = await getSummarizedReview(instructor, courseSection);

			setCourseReviews(summary);
		}
		fetchCourseData();
	}, [instructor, courseSection]);

	// const handleClickAPI = async () => {
	// 	await getGPT();
	// };

	return (
		<div style={{ margin: "2rem" }}>
			<h2>Course Detail</h2>
			<p>Course Section: {courseSection}</p>
			{/* <button onClick={handleClickAPI}>calling GPT</button> */}
			<Paper style={{ padding: "1rem", background: "#f7f7f7" }}>
				{console.log("course reviews:", courseReviews)}
				{courseReviews &&
					courseReviews.map((course, i) => (
						<Paper
							key={i}
							style={{
								padding: "1rem",
								marginTop: "1rem",
							}}
						>
							{console.log("reading course reviews.... course:", course)}
							<h3>{course.title}</h3>
							<h4 className="course-info">
								Professor {course.instructors.join(", ")} / {course.semester}
							</h4>
							<div className="course-reviews">
								<strong>Review:</strong>
								<div className="comments_course">
									<strong>Course Comments:</strong>
									{course.comments_course}
								</div>
								<div className="comments_professor">
									<strong>Professor Comments:</strong>
									{course.comments_professor}
								</div>
								<div className="course_content">
									<strong>Course Content:</strong>
									{course.course_content}
								</div>
								<div className="advice_section">
									<strong>Advice:</strong>
									{course.advice}
								</div>
							</div>
						</Paper>
					))}
			</Paper>
		</div>
	);
}

export default CourseDetail;
