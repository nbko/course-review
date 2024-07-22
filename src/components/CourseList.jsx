import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import { useAtom, useSetAtom } from "jotai";
import * as post from "./state/atoms.js";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

const CourseList = () => {
	const setCourseSection = useSetAtom(post.courseSection);
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
		navigate(`/courses/${courseSection}`);
	};

	useEffect(() => {
		async function fetchReviews() {
			// if the major, instructor is selected and the search button is clicked
			if (isClicked && major && instructor) {
				const currMajor = major.split("-")[0].trim();
				console.log({ isClicked, major, instructor });

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
				setIsClicked(false);
			}
		}

		fetchReviews();
	}, [isClicked, major, instructor]);

	return (
		<>
			<div className="search-result">
				{isClicked && (!major || !instructor) && (
					<Alert severity="warning">{alertMsg}</Alert>
				)}
				{courseInfo && (
					<Paper style={{ padding: "0.5rem 1rem" }}>
						<div style={{ height: 400, width: "100%" }}>
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
					</Paper>
				)}
			</div>
		</>
	);
};

export default CourseList;
