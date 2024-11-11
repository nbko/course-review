import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import ProfessorOverview from "./pages/ProfessorOverview.jsx";
import "./App.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
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

export default App;
