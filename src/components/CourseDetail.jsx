import Navbar from "./Navbar.jsx";
import { HeaderBadge, ProfProfile } from "./HeaderBadge.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSummarizedReview } from "../services/dataService.ts";
import Paper from "@mui/material/Paper";
import { useAtomValue } from "jotai";
import * as post from "../state/atoms.js";

import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color:
			theme.palette.mode === "light"
				? "rgb(55, 65, 81)"
				: theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

function ReviewFilter() {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "review-filter" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				sx={{
					backgroundColor: "#900000",

					"&:hover": {
						backgroundColor: "#900000",
					},
				}}
			>
				Overall
			</Button>
			<StyledMenu
				id="review-filter"
				MenuListProps={{
					"aria-labelledby": "review-filter",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose} disableRipple>
					Most Recent
				</MenuItem>
				<MenuItem onClick={handleClose} disableRipple>
					Least Recent
				</MenuItem>
				<MenuItem onClick={handleClose} disableRipple>
					Overall
				</MenuItem>
			</StyledMenu>
		</>
	);
}

// 수업 디테일 불러오는 함수
function CourseDetail() {
	//const courseSection = useAtomValue(post.courseSection);
	let { professorName, courseSection } = useParams();
	courseSection = courseSection.split("-").join(" ");
	professorName = professorName.split("-").join(" ");

	const instructor = useAtomValue(post.instructor);
	const [courseReviews, setCourseReviews] = useState([]);

	useEffect(() => {
		async function fetchCourseData() {
			console.log(
				`fetching course data for prof ${professorName} for course ${courseSection}`
			);
			if (professorName && courseSection) {
				const summary = await getSummarizedReview(professorName, courseSection);
				setCourseReviews(summary);
			}
		}
		fetchCourseData();
	}, []);

	return (
		<>
			<Container
				className="course-review__container"
				maxWidth={false}
				disableGutters
			>
				<Navbar />
				{courseReviews.length > 0 && (
					<HeaderBadge
						badgeLabel={courseSection}
						title={courseReviews[0].title}
						isHeaderImg={false}
					/>
				)}
				<ProfProfile badgeLabel={"Instructor"} instructorName={professorName} />

				<Container className="reviews__wrapper" maxWidth="xl">
					{console.log("course reviews:", courseReviews)}
					<Box className="course-review__box">
						{courseReviews && (
							<Box className="reviews-filter">
								<div className="reviews-title">
									Reviews
									<span className="reviews-count">
										{" "}
										({courseReviews.length})
									</span>
								</div>
								<div className="filter-right">
									<ReviewFilter />
									<span className="paginator">{"< 1 of 1>"}</span>
								</div>
							</Box>
						)}
						{courseReviews &&
							courseReviews.map((course, i) => (
								<Paper
									className="reviews_conatiner"
									key={i}
									sx={{
										padding: "1rem 2rem",
										flex: 2,
										border: "0.01rem solid #d9d9d9",
										boxShadow: "none",
										mb: "2rem",
									}}
								>
									<h4 className="course-info">
										<div className="professor-name">
											Professor {course.instructors.join(", ")}
										</div>
										<div className="quarter">Quarter: {course.semester}</div>
									</h4>
									<div className="course-reviews">
										<p className="comments course">
											<strong>{"Course Comments: "}</strong>
											{course.comments_course}
										</p>
										<p className="comments professor">
											<strong>{"Professor Comments: "}</strong>
											{course.comments_professor}
										</p>
										<p className="comments course-content">
											<strong>{"Course Content: "}</strong>
											{course.course_content}
										</p>
										<p className="comments advice-section">
											<strong>{"Advice: "}</strong>
											{course.advice}
										</p>
									</div>
								</Paper>
							))}
					</Box>
					<Box
						className="all-ratings"
						style={{
							display: "flex",
							flexDirection: "column",
							marginLeft: "2rem",
							flex: 1,
						}}
					>
						<Paper
							style={{
								padding: "2rem",
								height: "45%",
								border: "0.01rem solid #d9d9d9",
								boxShadow: "none",
							}}
						></Paper>
						<Paper
							style={{
								padding: "2rem",
								height: "50%",
								border: "0.01rem solid #d9d9d9",
								marginTop: "2rem",
								boxShadow: "none",
							}}
						></Paper>
					</Box>
				</Container>
			</Container>
		</>
	);
}

export default CourseDetail;
