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

import { createClient } from "@supabase/supabase-js";
import { getReviews, getReviewsById } from "./Reviews";

function App() {
	useEffect(() => {
		getReviewsById(1);
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
