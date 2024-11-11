import Breadcrumbs from "@mui/material/Breadcrumbs";
import PropTypes from "prop-types";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function handleClick(event) {
	event.preventDefault();
	console.info("You clicked a breadcrumb.");
}

export function Links({ instructor }) {
	const instructorName = instructor.split("-").join(" ");
	const breadcrumbs = [
		<Link
			underline="hover"
			key="1"
			color="inherit"
			href="/"
			onClick={handleClick}
		>
			Home
		</Link>,
		<Link
			underline="hover"
			key="2"
			color="inherit"
			href={`/professors/${instructor}`}
			onClick={handleClick}
		>
			{instructorName}
		</Link>,
	];

	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" />}
			aria-label="breadcrumb"
			sx={{ padding: "1rem 3rem" }}
		>
			{breadcrumbs}
		</Breadcrumbs>
	);
}

Links.propTypes = {
	instructor: PropTypes.string,
};
