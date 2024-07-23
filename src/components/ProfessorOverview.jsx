import { useAtomValue, useSetAtom } from "jotai";
import * as post from "../state/atoms.js";
import Navbar from "./Navbar.jsx";
import { HeaderBadge } from "./HeaderBadge.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByInstructor } from "../api/fetchCourseData";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const ProfessorOverview = () => {
	const { professorName } = useParams();
	console.log("instructor:", professorName);

	return (
		<>
			<div className="professor-overview">
				<Navbar />
				<HeaderBadge badgeLabel={"Instructor"} title={professorName} />
				<CourseList professorName={professorName} />
			</div>
		</>
	);
};

const CourseList = ({ professorName }) => {
	const [courseInfo, setCourseInfo] = useState([]);
	const setCourseSection = useSetAtom(post.courseSection);
	// const instructor = useAtomValue(post.instructor);
	const instructor = professorName.split("-").join(" ");
	const currMajor = "CMSC";
	const navigate = useNavigate();

	const columns = [
		{
			field: "course_section",
			headerName: "Course Number",
			flex: 0.5,
			type: "string",
		},
		{ field: "title", headerName: "Course Title", flex: 1, type: "string" },
		{
			field: "count",
			headerName: "Reviews",
			type: "number",
			flex: 0.5,
		},
	];

	const handleRowClick = (courseInfo) => {
		let courseSection = courseInfo.row.course_section;
		setCourseSection(courseSection);
		courseSection = courseSection.split(" ").join("-");

		console.log("navigating to...", courseSection);
		navigate(`/professors/${professorName}/${courseSection}`);
	};

	useEffect(() => {
		async function fetchReviews() {
			const reviews = await getReviewsByInstructor(currMajor, instructor);

			const courseMap = new Map();

			reviews.forEach((course) => {
				const courseSection = course["course_section"]
					.split(" ")
					.splice(0, 2)
					.join(" ");
				const currCourseName = course["title"];

				if (courseMap.has(courseSection)) {
					const existingCourse = courseMap.get(courseSection);
					existingCourse["title"] =
						currCourseName.length > existingCourse["title"].length
							? currCourseName
							: existingCourse["title"];

					existingCourse["count"] += 1;
				} else {
					courseMap.set(courseSection, {
						...course,
						course_section: courseSection,
						count: 1,
					});
				}
			});

			let uniqueCoursesWithCount = Array.from(courseMap.values());
			uniqueCoursesWithCount.forEach((course, i) => (course["id"] = i));

			console.log("courses:", uniqueCoursesWithCount);
			setCourseInfo(uniqueCoursesWithCount);
		}

		fetchReviews();
	}, [instructor, currMajor]);

	return (
		<>
			<div className="course-list__container">
				<div className="course-list__table">
					{courseInfo.length !== 0 && (
						<div style={{ width: "100%" }}>
							<DataGrid
								rows={courseInfo}
								columns={columns}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
								pageSizeOptions={[5, 10]}
								disableColumnMenu
								sx={{
									border: "none",
									"MuiDataGrid-columnHeader:focus-within": {},
									".MuiDataGrid-columnSeparator": {
										display: "none",
									},
									"& .MuiDataGrid-cell:focus": {
										outline: "none",
									},
									cursor: "pointer",
								}}
								onRowClick={handleRowClick}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default ProfessorOverview;
