import { useEffect } from "react";
import {
	styled,
	AppBar,
	Box,
	Toolbar,
	Typography,
	Container,
	Button,
} from "@mui/material";
import { SearchInput } from "./SearchInput.jsx";
import { instructors } from "../data";

// 네브바 검색창 컨테이너 스타일
const SearchContainer = styled("div")(({ theme }) => ({
	flex: 3.5,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: ".5rem 1rem",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#90000015",
	"&:hover": {
		backgroundColor: "#90000025",
	},
	marginRight: theme.spacing(2),
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const Navbar = () => {
	return (
		<AppBar
			position="static"
			sx={{ background: "#fff", color: "#900000", padding: "0.3rem" }}
		>
			<Container
				maxWidth="xl"
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				<Toolbar disableGutters sx={{ width: "100%" }}>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							flex: 2,
							ml: 3,
							display: { xs: "none", md: "flex" },
							justifyContent: "center",
							fontWeight: 700,
							color: "inherit",
							textDecoration: "none",
							textTransform: "uppercase",
						}}
					>
						Maroon Reviews
					</Typography>
					<SearchContainer>
						<SearchInput inputType="Instructor Name" options={instructors} />
					</SearchContainer>
					{/* 아래 로그인, 회원가입 기능은 필요할까? */}
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex", flex: "3" },
							justifyContent: "center",
						}}
					>
						<Button
							sx={{
								color: "#900000",
								display: "block",
								padding: ".6rem 2.5rem",
								fontWeight: "700",
								fontSize: "1rem",
								marginRight: "1rem",
								"&:hover": {
									backgroundColor: "#fff",
								},
							}}
						>
							Login
						</Button>
						<Button
							sx={{
								color: "#900000",
								display: "block",
								padding: ".6rem 2.5rem",
								fontWeight: "700",
								fontSize: "1rem",
								"&:hover": {
									backgroundColor: "#fff",
								},
							}}
						>
							Sign Up
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
