import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { instructors } from "../data";
import * as post from "../state/atoms.js";
import { useEffect } from "react";
import { useSetAtom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const SearchContainer = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#90000015",
	"&:hover": {
		backgroundColor: "#90000025",
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: "4rem",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
	width: "30rem",
	flex: 1,
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		border: "none",
		boxShadow: "none",
		"&:focus": {
			outline: "none",
		},
		"&:active": {
			outline: "none",
		},
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "50ch",
		},
	},
	"& .MuiOutlinedInput-root": {
		border: "none",
	},
}));

const Navbar = () => {
	const setInstructor = useSetAtom(post.instructor);
	const [instructorValue] = useAtom(post.instructor); // Read the atom value
	const navigate = useNavigate();

	const handleChange = (event, newValue) => {
		if (newValue) {
			setInstructor(newValue.label);
			console.log("New instructor: ", post.instructor);
			console.log("New instructor: ", newValue.label);
		}
	};

	useEffect(() => {
		if (instructorValue) {
			const formattedName = instructorValue.split(" ").join("-");
			navigate(`/professors/${formattedName}`);
			console.log("Navigating to:", `/professors/${formattedName}`);
		}
	}, [instructorValue]);

	return (
		<AppBar
			position="static"
			sx={{ background: "#fff", color: "#900000", padding: "0.3rem" }}
		>
			<Container
				maxWidth="xl"
				sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
			>
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							ml: 3,
							display: { xs: "none", md: "flex" },
							fontWeight: 700,
							color: "inherit",
							textDecoration: "none",
							textTransform: "uppercase",
						}}
					>
						Maroon Reviews
					</Typography>
					<SearchContainer>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<Autocomplete
							freeSolo
							id="search-autocomplete"
							options={instructors}
							getOptionLabel={(option) => option.label || ""}
							renderInput={(params) => (
								<StyledTextField
									{...params}
									placeholder="Search for a professor"
									InputProps={{
										...params.InputProps,
									}}
								/>
							)}
							onChange={handleChange}
						/>
					</SearchContainer>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
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
