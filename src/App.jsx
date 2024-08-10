import { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { instructors } from "./data";
import CourseDetail from "./components/CourseDetail";
import ProfessorOverview from "./components/ProfessorOverview.jsx";
import { SearchInput } from "./components/SearchInput";
import * as post from "./state/atoms.js";
import "./App.css";

function App() {
	const [instructor, setInstructor] = useAtom(post.instructor);
	const navigate = useNavigate();
	let formatInstructorName;

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

	useEffect(() => {
		if (instructor) {
			// let formatInstructorName = instructor.toLowerCase().split(" ").join("-");
			formatInstructorName = instructor.split(" ").join("-");
			console.log(`navigating to professor ${formatInstructorName}'s page`);
			navigate(`/professors/${formatInstructorName}`);
		}
	}, [instructor]);

	return (
		<ThemeProvider theme={themeOptions}>
			<div className="wrapper">
				{/* <Button variant="outlined">Course Feedback</Button> */}
				<div className="c-heading">
					<div className="c-heading title_wrapper">
						<div className="c-heading title_logo"></div>
						<h3 className="c-heading title">UChicago Course Review</h3>
					</div>
					<div className="search-content">
						<SearchInput inputType="Instructor Name" options={instructors} />
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

function Main() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<App />} />
				<Route
					path="/professors/:professorName"
					element={<ProfessorOverview />}
				/>
				<Route
					path="/professors/:professorName/:courseSection"
					element={<CourseDetail />}
				/>
			</Routes>
		</Router>
	);
}

export default Main;
