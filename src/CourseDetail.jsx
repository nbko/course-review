import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	getRawCourseReviews,
	getReviewsByCourseSection,
} from "./services/getReviews";
import { getGPT } from "./services/gpt";
import Paper from "@mui/material/Paper";
import { useAtomValue } from "jotai";
import * as post from "./state/post";

// 수업 디테일 불러오는 함수
function CourseDetail() {
	const courseSection = useAtomValue(post.courseSection);
	const instructor = useAtomValue(post.instructor);
	const [courseData, setCourseData] = useState([]);
	const [courseReviews, setCourseReviews] = useState([]);

	useEffect(() => {
		// get reviews by course section 하고 get raw course section을 여기서 해야 할까
		// 아니면 get reviews.ts에서 처리하는게 더 나을까? 어차피 걍 가저오는건 똑같은거 같긴 흠...
		// 일단 get reviews쪽에서 해결해보자

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
				// 일단 여기서는 raw한 course review밖에 없다는 것을 전제로 하고 있어
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

		// console.log("fetched raw reviews:", courseReviews);
	}, [courseData]);

	// const handleClickAPI = async () => {
	// 	await getGPT();
	// };

	return (
		<div style={{ margin: "2rem" }}>
			<h2>Course Detail</h2>
			<p>Course Section: {courseSection}</p>
			{/* <button onClick={handleClickAPI}>calling GPT</button> */}
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
							{console.log(course.reviews)}
							{course.reviews.map((review, index) => (
								<div key={index} style={{ marginBottom: "1rem" }}>
									{Object.entries(review).map(([key, value]) => (
										<div key={key}>
											{key === "raw_data" ? (
												<>
													<strong>Review:</strong>
													{Object.entries(value).map(([ques, ans]) => (
														<div key={ques}>
															{" "}
															<strong>{ques}</strong>
															<div>{JSON.stringify(ans)}</div>
														</div>
													))}
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
