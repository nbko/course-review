import { useSetAtom, useAtomValue } from "jotai";
import * as post from "../state/atoms.js";
import { HeaderBadge } from "./HeaderBadge.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewsByInstructor } from "../api/fetchCourseData";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

// 교수님에 대해 검색하면 교수님이 가르치셨던 수업 이름, 수업 번호, 해당 수업에 대한 수업 후기의 갯수를
// 표로 그려줌
const ProfessorOverview = () => {
	const { professorName } = useParams();

	return (
		<>
			<Box className="professor-overview">
				<HeaderBadge
					badgeLabel={"instructor name"}
					title={professorName}
					isHeaderImg={true}
				/>
				<CourseList professorName={professorName} />
			</Box>
		</>
	);
};

// 교수님이 가르치셨던 수업을 리스트업 해줌
const CourseList = ({ professorName }) => {
	const [courseInfo, setCourseInfo] = useState([]);
	const setCourseSection = useSetAtom(post.courseSection);
	const instructor = useAtomValue(post.instructor);

	const currInstructor = professorName.split("-").join(" ");
	const currMajor = "CMSC"; //일단은 CMSC교수님들 데이터만 뽑아왔기 때문에 CMSC로 픽스
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

	// 하나의 row를 누르면 해당 수업의 요약된 수업 후기를 모아놓은 페이지로 이동
	const handleRowClick = (courseInfo) => {
		let courseSection = courseInfo.row.course_section;
		setCourseSection(courseSection);
		courseSection = courseSection.split(" ").join("-");

		console.log("navigating to...", courseSection);
		navigate(`/professors/${professorName}/${courseSection}`);
	};

	useEffect(() => {
		// 찾고자 하는 교수님의 수업들을 db에서 가져올때 수업 이름이랑 타이틀을 같은것끼리 묶어주는 함수

		async function fetchReviews() {
			const reviews = await getReviewsByInstructor(currMajor, currInstructor);
			console.log("수업 후기를 수업 별로 필터링:", reviews);

			const courseMap = new Map();

			reviews.forEach((course) => {
				const courseSection = course["course_section"]
					.split(" ")
					.splice(0, 2)
					.join(" ");
				const currCourseName = course["title"];

				// 	간혹 수업 코드는 똑같은데 수업 이름이 조금씩 다를 수 있음
				// e.g. Intro to CS 1, Introduction to Computer Science 1
				// 그럴때는 더 긴 이름 aka 수업 풀네임으로 바꿔서 저장
				if (courseMap.has(courseSection)) {
					const existingCourse = courseMap.get(courseSection);
					existingCourse["title"] =
						currCourseName.length > existingCourse["title"].length
							? currCourseName
							: existingCourse["title"];

					// 수업 후기 카운트
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

			// 수업 후기를 수업 넘버별로 필터링해서 저장
			console.log("Processed course info:", uniqueCoursesWithCount);
			setCourseInfo(uniqueCoursesWithCount);
		}

		fetchReviews();
	}, [currInstructor, currMajor]);

	return (
		<>
			<Container maxWidth="xl">
				<Box>
					{courseInfo.length !== 0 && (
						<Box style={{ width: "100%" }}>
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
									".MuiDataGrid-cell:focus": {
										outline: "none",
									},
									".MuiDataGrid-columnHeader:focus": {
										outline: "none",
									},
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
						</Box>
					)}
				</Box>
			</Container>
		</>
	);
};

export default ProfessorOverview;
