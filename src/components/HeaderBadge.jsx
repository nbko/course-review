import { Box, Container, Typography } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

// 수업의 배너 (수업 이름, 수업 번호)를 그려주는 컴포넌트
const HeaderBadge = ({ badgeLabel, title, isHeaderImg }) => {
	const formattedTitle = title.split("-").join(" ");

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					mb: "3rem",
					p: "2rem 3rem",
					background: "#900000",
				}}
			>
				{isHeaderImg && (
					<AccountCircleRoundedIcon
						sx={{ width: "5rem", height: "auto", color: "white" }}
					/>
				)}
				<Container
					maxWidth="lg"
					sx={{ fontSize: "1rem", color: "white", fontWeight: "600" }}
				>
					<Box
						sx={{
							background: "white",
							color: "#900000",
							p: ".4rem",
							width: "fit-content",
							display: "flex",
							justifyContent: "center",
							borderRadius: ".25rem",
							mb: "1rem",
							textTransform: "capitalize",
						}}
					>
						{badgeLabel}
					</Box>
					<Typography
						variant="h3"
						sx={{ fontSize: "1.3rem", fontWeight: "600" }}
					>
						{formattedTitle}
					</Typography>
				</Container>
			</Box>
		</>
	);
};

// 교수님 프로필 (사진, instructor 라벨, 성함을 그려주는 컴포넌트)
const ProfProfile = ({ badgeLabel, instructorName }) => {
	let instructor = instructorName.split("-").join(" ");
	return (
		<>
			<Box className="profile-header false">
				<Container
					maxWidth="lg"
					sx={{
						fontSize: "1rem",
						color: "black",
						fontWeight: "600",
						display: "flex",
						alignItems: "center",
						gap: "3rem",
					}}
				>
					<AccountCircleRoundedIcon sx={{ width: "5rem", height: "auto" }} />
					<Box>
						<Box
							sx={{
								background: "#900000",
								color: "white",
								p: ".4rem",
								width: "fit-content",
								display: "flex",
								justifyContent: "center",
								borderRadius: ".25rem",
								mb: "1rem",
							}}
						>
							{badgeLabel}
						</Box>
						<Typography sx={{ fontSize: "1.2rem", fontWeight: "600" }}>
							{instructor}
						</Typography>
					</Box>
				</Container>
			</Box>
		</>
	);
};

export { HeaderBadge, ProfProfile };
