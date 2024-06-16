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

import {
	insertReviews,
	getReviewsById,
	hardDeleteReviews,
	createInstructors,
	getOrInsertInstructor,
} from "./Reviews";

import { instructorsList } from "../data/instructors_list";

function App() {
	useEffect(() => {
		fetch("../course_review.json")
			.then((response) => response.json())
			.then((json) => {
				const firstInstructor = Object.keys(json)[0];
				// for (const instructor in json) {
				for (const review in json[firstInstructor]) {
					// check if the instructor has any reviews
					// dont insert any data for the instructor if they dont have any reviews
					if ("error" in json[firstInstructor][review]) {
						continue;
					} else {
						let { course_section, instructors, quarter, link, comments } =
							json[firstInstructor][review];
						quarter = quarter.replace(/\([^)]*\)/g, "");
						console.log({
							course_section,
							instructors,
							quarter,
							link,
							comments,
						});
						// insertReviews(
						// 	"CMSC",
						// 	course_section,
						// 	instructors,
						// 	quarter,
						// 	link,
						// 	comments
						// );
						let instructorList = instructors.split(",");
						for (const instructor of instructorList) {
							getOrInsertInstructor(instructor);
						}
					}
				}
			});
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
		// 		// for (const instructor in json) {
		// 		// 	for (const review in json[instructor]) {
		// 		// 		console.log(json[instructor][review]);
		// 		// 	}
		// 		// }
		// 	});
		// insertReviews("sec1", "aaron", "cmsc", "winter 2022", "https://", {
		// 	"What could the instructor modify to help you learn more?": [
		// 		"I was satisfied with how the course went.",
		// 		"His approaches often weren't obvious at the start, also some of the more complicated proofs which deserved more time were given less and more trivial things took a lot of time.",
		// 		"the content was very interesting but the instructor could be more lively",
		// 		"Keep track of time better so we didn't have to rush through material past the end of class time.",
		// 		"N/A",
		// 	],
		// 	"Please comment on the level of difficulty of the course relative to your background and experience.":
		// 		[
		// 			"I felt it was difficult",
		// 			"Somewhat easy.",
		// 			"i had previous algorithms experience and it was still interesting",
		// 		],
		// });
	}, []);

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

	const [progress, setProgress] = useState(false);
	const [search, setSearch] = useState(false);
	const [isClicked, setIsClicked] = useState(false);
	const [reviewList, setReviewList] = useState([]);
	const [major, setMajor] = useState(null);
	const [instructor, setInstructor] = useState(null);
	const [alertMsg, setAlertMsg] = useState("");

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
					<div>Selected Major: {major ? major.label : "None"}</div>
					<div>
						Selected Instructor: {instructor ? instructor.label : "None"}
					</div>
					{isClicked && (!major || !instructor) && (
						<Alert severity="warning">{alertMsg}</Alert>
					)}
					{progress && <Progress />}
					<Paper>
						<a href="/course/cmsc14100">
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
						</a>
					</Paper>
					{/* <DisabledAccordion /> */}
					{/* <QuarterTags />
				<SearchInput inputType="course section" /> */}
				</div>
			</Container>
		</ThemeProvider>
	);
}

export default App;
