import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, Box, Typography } from "@mui/material";
import { instructors } from "./data";
import CourseDetail from "./components/CourseDetail";
import ProfessorOverview from "./components/ProfessorOverview.jsx";
import { SearchInput } from "./components/SearchInput";
import Navbar from "./components/Navbar.jsx";
import "./App.css";

function App() {
	// 홈화면 그려주는 함수
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

	return (
		<ThemeProvider theme={themeOptions}>
			<Container
				maxWidth="md"
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					height: "100vh",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						mb: 2,
						minWidth: "500px",
					}}
				>
					<Box className="title_logo"></Box>
					<Typography variant="h4">UChicago Course Review</Typography>
				</Box>

				{/* 교수님 이름을 클릭하면 알아서 그 다음페이지로 넘어감 */}
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<Box
						component="form"
						sx={{
							p: ".5rem 1.2rem",
							display: "flex",
							alignItems: "center",
							width: 420,
							borderRadius: ".75rem",
							border: "#800000 solid 0.1rem",
						}}
					>
						<SearchInput inputType="Instructor Name" options={instructors} />
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

function Main() {
	return (
		<Router>
			<Layout />
		</Router>
	);
}

function Layout() {
	const location = useLocation();
	const isHomePage = location.pathname === "/";

	return (
		<>
			{!isHomePage && <Navbar />}
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
		</>
	);
}

export default Main;
