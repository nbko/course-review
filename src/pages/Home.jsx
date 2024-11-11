import { Container, Box, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import { instructors } from "../data";
import { SearchInput } from "../components/SearchInput";
import "../App.css";

export default function Home() {
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

	const CenteredContainer = styled(Container)`
		display: flex;
		justify-content: center;
	`;

	return (
		<ThemeProvider theme={themeOptions}>
			<CenteredContainer
				maxWidth="md"
				sx={{
					flexDirection: "column",
					height: "100vh",
				}}
			>
				<CenteredContainer
					sx={{
						alignItems: "center",
						minWidth: "500px",
					}}
				>
					<Box className="title_logo"></Box>
					<Typography variant="h4">UChicago Course Review</Typography>
				</CenteredContainer>

				{/* 교수님 이름을 클릭하면 알아서 그 다음페이지로 넘어감 */}
				<CenteredContainer>
					<Box
						sx={{
							p: ".5rem 1.2rem",
						}}
					>
						<SearchInput inputType="Instructor Name" options={instructors} />
					</Box>
				</CenteredContainer>
			</CenteredContainer>
		</ThemeProvider>
	);
}
