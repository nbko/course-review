import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { SearchInput, QuarterTags } from "./SearchInput";
import DisabledAccordion from "./courseReviews";
import Progress from "./Progress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import { majors, instructors } from "./data";
import "./App.css";

function App() {
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
			<div className="search-container">
				<h2>Search Course Feedback for 2024-2025</h2>
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
					<DisabledAccordion />
					{/* <QuarterTags />
				<SearchInput inputType="course section" /> */}
				</div>
			</div>
		</ThemeProvider>
	);
}

export default App;
