import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { SearchInput, QuarterTags } from "./SearchInput";
import DisabledAccordion from "./CourseReviews";
import Progress from "./Progress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";

import { majors, instructors } from "./data";
import { useState, useEffect } from "react";
import "./App.css";

import { insertReviews } from "./services/insertReviews";

import { getReviewsByInstructor } from "./services/getReviews";
import { instructorsList } from "../data/instructors_list";
import { DataGrid } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Padding } from "@mui/icons-material";
import Link from "@mui/material/Link";
import { Navigate } from "react-router-dom";

function App() {
	const [courseInfo, setCourseInfo] = useState([]);
	const [progress, setProgress] = useState(false);
	const [search, setSearch] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [reviewList, setReviewList] = useState([]);
	const [major, setMajor] = useState(null);
	const [instructor, setInstructor] = useState(null);
	const [alertMsg, setAlertMsg] = useState("");

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

	useEffect(() => {
		// fetch("../course_review_data.json")
		// 	.then((response) => response.json())
		// 	.then((json) => {
		// 		//const firstInstructor = Object.keys(json)[0];
		// 		for (const instructor in json) {
		// 			for (const review in json[instructor]) {
		// 				// check if the instructor has any reviews
		// 				// dont insert any data for the instructor if they dont have any reviews
		// 				if ("error" in json[instructor][review]) {
		// 					continue;
		// 				} else {
		// 					let {
		// 						course_section,
		// 						title,
		// 						instructors,
		// 						semester,
		// 						link,
		// 						comments,
		// 					} = json[instructor][review];
		// 					// quarter = quarter.replace(/\([^)]*\)/g, "");
		// 					// instructors = instructors.split(",");
		// 					insertReviews(
		// 						"CMSC",
		// 						course_section,
		// 						title,
		// 						instructors,
		// 						semester,
		// 						link,
		// 						comments
		// 					);
		// 					// let instructorList = instructors.split(",");
		// 					// for (const instructor of instructorList) {
		// 					// 	getOrInsertInstructor(instructor);
		// 				}
		// 			}
		// 		}
		// 	});
		// deleteReviews(10);
		// hardDeleteReviews(8);
		// instructorsList.map((instructor) => {
		// 	createInstructors(instructor);
		// // });
		// for (const review in json[firstInstructor]) {
		// 	// const courseSection = json[firstInstructor][review]["course-section"];
		// 	let { course_section, instructors, quarter, link, comments } =
		// 		json[firstInstructor][review];
		// 	quarter = quarter.replace(/\([^)]*\)/g, "");
		// 	// console.log({ course_section, instructors, quarter, link, comments });
		// 	insertReviews(
		// 		"CMSC",
		// 		course_section,
		// 		instructors,
		// 		quarter,
		// 		link,
		// 		comments
		// 	);
		// }
		// });

		async function fetchReviews() {
			if (isClicked && major && instructor) {
				const currMajor = major.label.split("-")[0].trim();
				const currInstructor = instructor.label;
				console.log({ isClicked, major, instructor });

				const reviews = await getReviewsByInstructor(currMajor, currInstructor);

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

	const themeOptions = createTheme({
		palette: {
			primary: {
				main: "#543310",
			},
			secondary: {
				main: "#AF8F6F",
			},
		},
	});

	const handleSearch = () => {
		setIsClicked(true);
		if (!major) {
			setAlertMsg("Please select a subject.");
		} else if (!instructor) {
			setAlertMsg("Please enter an instructor name.");
		} else {
			if (major && instructor) {
				setSearch(true);
				setProgress(true);
			}
		}
	};

	const handleRowClick = (courseInfo) => {
		const courseSection = courseInfo.row.course_section;
		console.log("navigating to...", courseSection);
		//<Navigate to={`/course/course`} />;
	};

	return (
		<ThemeProvider theme={themeOptions}>
			<Container maxWidth="md">
				<Button variant="outlined">Course Feedback</Button>
				<div className="about">
					<h2>UChicago Course Reviews</h2>
					<div>University of Chicago</div>
				</div>
				<div className="search-content">
					<SearchInput
						inputType="major"
						options={majors}
						setSelectedMajor={setMajor}
					/>
					<SearchInput
						inputType="instructor name"
						options={instructors}
						setSelectedMajor={setInstructor}
					/>
					<Button variant="contained" onClick={handleSearch}>
						Search
					</Button>
					{/* <div>
						Selected Major: {major ? major.label.split("-")[0].trim() : "None"}
					</div>
					<div>
						Selected Instructor: {instructor ? instructor.label : "None"}
					</div> */}
					{isClicked && (!major || !instructor) && (
						<Alert severity="warning">{alertMsg}</Alert>
					)}
					{/* {progress && <Progress />} */}
					<Paper style={{ padding: "0.5rem 1rem" }}>
						{courseInfo && (
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
						)}
						{/* {courseInfo && (
							<TableContainer component={Paper}>
								<Table sx={{ minWidth: 400 }} aria-label="simple table">
									<TableHead>
										<TableRow>
											<TableCell>Course Number</TableCell>
											<TableCell>Course Title</TableCell>
											<TableCell align="right">Reviews</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{courseInfo.map((courseInfo, i) => (
											<TableRow
												key={courseInfo.id}
												sx={{
													"&:last-child td, &:last-child th": { border: 0 },
												}}
											>
												<TableCell component="th" scope="row">
													{courseInfo.course_section}
												</TableCell>
												<TableCell>{courseInfo.title}</TableCell>
												<TableCell align="right">{courseInfo.count}</TableCell>
												<a
													key={i}
													href={`/course/${courseInfo.course_section}`}
												>
													<div
														className={`course ${courseInfo.course_section}`}
													>
														<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-gutterBottom">
															{courseInfo.course_section}
														</p>
														<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-colorPrimary MuiTypography-gutterBottom">
															{courseInfo.title}
														</p>
													</div>
												</a>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						)} */}
					</Paper>
					{/* {courseInfo &&
							courseInfo.map((course, i) => {
								const course_section = course["course_section"]
									.split(" ")
									.slice(0, 2)
									.join(" ");
								const course_title = course["title"];
								return (
									<a key={i} href={`/course/${course_section}`}>
										<div className={`course ${course_section}`}>
											<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-gutterBottom">
												{course_section}
											</p>
											<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-colorPrimary MuiTypography-gutterBottom">
												{course_title}
											</p>
										</div>
									</a>
								);
							})} */}
					{/* <a href="/course/cmsc14100">
							<div className="course cmsc14100">
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-gutterBottom">
									CMSC 14100
								</p>
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-colorPrimary MuiTypography-gutterBottom">
									Analytic Geometry and Calculus 3
								</p>
							</div>
						</a>
						<a href="/course/cmsc14200">
							<div className="course coursecmsc14200">
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-gutterBottom">
									CMSC 14100
								</p>
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-colorPrimary MuiTypography-gutterBottom">
									Analytic Geometry and Calculus 3
								</p>
							</div>
						</a>
						<a href="/course/cmsc14400">
							<div className="course cmsc14400">
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-gutterBottom">
									CMSC 14200
								</p>
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-colorPrimary MuiTypography-gutterBottom">
									Analytic Geometry and Calculus 3
								</p>
							</div>
						</a>
						<a href="/course/cmsc14400">
							<div className="course cmsc14400">
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-gutterBottom">
									CMSC 14200
								</p>
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-colorPrimary MuiTypography-gutterBottom">
									Analytic Geometry and Calculus 3
								</p>
							</div>
						</a>
						<a href="/course/cmsc14500">
							<div className="course cmsc14500">
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-gutterBottom">
									CMSC 14300
								</p>
								<p className="MuiTypography-root MuiTypography-subtitle1 MuiTypography-colorPrimary MuiTypography-gutterBottom">
									Analytic Geometry and Calculus 3
								</p>
							</div>
						</a> */}
					{/* <DisabledAccordion /> */}
					{/* <QuarterTags />
				<SearchInput inputType="course section" /> */}
				</div>
			</Container>
		</ThemeProvider>
	);
}

export default App;
