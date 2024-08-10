import { useAtomValue, useSetAtom } from "jotai";
import * as post from "../state/atoms.js";
import Navbar from "./Navbar.jsx";
import { HeaderBadge } from "./HeaderBadge.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByInstructor } from "../api/fetchCourseData";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

// 교수님에 대해 검색하면 교수님이 가르치셨던 수업 이름, 수업 번호, 해당 수업에 대한 수업 후기의 갯수를
// 표로 그려줌
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

// 교수님이 가르치셨던 수업을 리스트업 해줌
const CourseList = ({ professorName }) => {
	const [courseInfo, setCourseInfo] = useState([]);
	const setCourseSection = useSetAtom(post.courseSection);
	const instructor = professorName.split("-").join(" ");
	const currMajor = "CMSC";
	const navigate = useNavigate();

	// 테이블 형식으로 수업 번호, 수업 이름, 리뷰 개수를 보여줌
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

	// 하나의 row를 누르면 해당 수업의 수업 후기들을 불러와줌
	const handleRowClick = (courseInfo) => {
		console.log("inside professor overview...");
		let courseSection = courseInfo.row.course_section;
		setCourseSection(courseSection);
		courseSection = courseSection.split(" ").join("-");

		console.log("navigating to...", courseSection);
		navigate(`/professors/${professorName}/${courseSection}`);
	};

	useEffect(() => {
		// 찾고자 하는 교수님의 수업들을 db에서 가져올때 수업 이름이랑 타이틀을 같은것끼리 묶어주는 함수
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
