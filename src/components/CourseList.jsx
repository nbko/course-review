import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSetAtom } from "jotai";
import * as post from "../state/atoms.js";
import { getReviewsByInstructor } from "../api/fetchCourseData.ts";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

export const CourseList = ({ professorName }) => {
	const [courseInfo, setCourseInfo] = useState([]);
	const setCourseSection = useSetAtom(post.courseSection);
	const currInstructor = professorName.split("-").join(" ");
	const currMajor = "CMSC"; // Only displaying reviews for Computer Science Professors for now
	const navigate = useNavigate();

	const StyledDataGrid = styled(DataGrid)({
		border: "none",
		cursor: "pointer",
		"& .MuiDataGrid-cell:focus": {
			outline: "none",
		},
		"& .MuiDataGrid-columnHeader:focus": {
			outline: "none",
		},
		"& .MuiDataGrid-columnSeparator": {
			display: "none",
		},
	});

	// Shows course sectionm course title, number of reviews, etc
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

	// Clicking on a row will take you to the course review page for that specific class
	const handleRowClick = (courseInfo) => {
		let courseSection = courseInfo.row.course_section;
		setCourseSection(courseSection);
		courseSection = courseSection.split(" ").join("-");

		console.log("navigating to...", courseSection);
		navigate(`/professors/${professorName}/${courseSection}`);
	};

	useEffect(() => {
		// A function that groups classes with the same name and title when retrieving a professor's courses from the database

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

				// Courses can have the same code but slightly different names.
				// For example: 'Intro to CS 1' and 'Introduction to Computer Science 1'.
				// Save the course using the longer name (i.e. the full course name).

				if (courseMap.has(courseSection)) {
					const existingCourse = courseMap.get(courseSection);
					existingCourse["title"] =
						currCourseName.length > existingCourse["title"].length
							? currCourseName
							: existingCourse["title"];

					//Count number of course reviews
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

			// Filter and organize course reviews by course number
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
							<StyledDataGrid
								rows={courseInfo}
								columns={columns}
								initialState={{
									pagination: {
										paginationModel: { page: 0, pageSize: 5 },
									},
								}}
								pageSizeOptions={[5, 10]}
								disableColumnMenu
								onRowClick={handleRowClick}
							/>
						</Box>
					)}
				</Box>
			</Container>
		</>
	);
};

CourseList.propTypes = {
	professorName: PropTypes.string,
};
