import { HeaderBadge } from "../components/HeaderBadge.jsx";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { CourseList } from "../components/CourseList.jsx";
import { Links } from "../components/Links.jsx";
import { Box } from "@mui/material";

// This page shows a list of courses previously taught by the professor, along with any available reviews
// You can click on each courses to read the corresponding course review
const ProfessorOverview = () => {
	const { professorName } = useParams();

	return (
		<Box>
			<Navbar />
			<Box className="professor-overview">
				<Links instructor={professorName} />
				<HeaderBadge
					badgeLabel={"instructor name"}
					title={professorName}
					isHeaderImg={true}
				/>
				<CourseList professorName={professorName} />
			</Box>
		</Box>
	);
};

export default ProfessorOverview;
