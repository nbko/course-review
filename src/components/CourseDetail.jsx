import Navbar from "./Navbar.jsx";
import { HeaderBadge, ProfProfile } from "./HeaderBadge.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSummarizedReview } from "../services/dataService.ts";
import Paper from "@mui/material/Paper";
import { useAtomValue } from "jotai";
import * as post from "../state/atoms.js";

// 수업 디테일 불러오는 함수
function CourseDetail() {
	//const courseSection = useAtomValue(post.courseSection);
	let { professorName, courseSection } = useParams();
	courseSection = courseSection.split("-").join(" ");
	professorName = professorName.split("-").join(" ");

	const instructor = useAtomValue(post.instructor);
	const [courseReviews, setCourseReviews] = useState([]);

	useEffect(() => {
		async function fetchCourseData() {
			const summary = await getSummarizedReview(instructor, courseSection);

			setCourseReviews(summary);
		}
		fetchCourseData();
	}, []);

	return (
		<>
			<div className="course-review__container">
				<Navbar />
				{courseReviews.length > 0 && (
					<HeaderBadge
						badgeLabel={courseSection}
						title={courseReviews[0].title}
						isHeaderImg={false}
					/>
				)}
				<ProfProfile badgeLabel={"Instructor"} instructorName={professorName} />

				<div className="reviews__wrapper" style={{ padding: "0 3rem" }}>
					{console.log("course reviews:", courseReviews)}
					<div className="course-review__box">
						{courseReviews &&
							courseReviews.map((course, i) => (
								<div className="reviews_conatiner" key={i}>
									<div className="reviews-filter">
										<div className="reviews-title">
											Reviews
											<span className="reviews-count">
												{" "}
												({courseReviews.length})
											</span>
										</div>
										<div className="filter-right">
											<div className="sorting-dropdown">Overall</div>
											<div className="paginator">{"< 1 of 1>"}</div>
										</div>
									</div>
									<Paper
										style={{
											padding: "1rem 2rem",
											flex: 2,
											border: "0.01rem solid #d9d9d9",
											boxShadow: "none",
										}}
									>
										<h4 className="course-info">
											<div className="professor-name">
												Professor {course.instructors.join(", ")}
											</div>
											<div className="quarter">Quarter: {course.semester}</div>
										</h4>
										<div className="course-reviews">
											<p className="comments course">
												<strong>{"Course Comments: "}</strong>
												{course.comments_course}
											</p>
											<p className="comments professor">
												<strong>{"Professor Comments: "}</strong>
												{course.comments_professor}
											</p>
											<p className="comments course-content">
												<strong>{"Course Content: "}</strong>
												{course.course_content}
											</p>
											<p className="comments advice-section">
												<strong>{"Advice: "}</strong>
												{course.advice}
											</p>
										</div>
									</Paper>
								</div>
							))}
						<div
							className="all-ratings"
							style={{
								display: "flex",
								flexDirection: "column",
								marginLeft: "2rem",
								flex: 1,
							}}
						>
							<Paper
								style={{
									padding: "2rem",
									height: "45%",
									border: "0.01rem solid #d9d9d9",
									boxShadow: "none",
								}}
							></Paper>
							<Paper
								style={{
									padding: "2rem",
									height: "50%",
									border: "0.01rem solid #d9d9d9",
									marginTop: "2rem",
									boxShadow: "none",
								}}
							></Paper>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CourseDetail;
