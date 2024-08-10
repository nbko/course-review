// 수업의 배너 (수업 이름, 수업 번호)를 그려주는 컴포넌트
const HeaderBadge = ({ badgeLabel, title, isHeaderImg }) => {
	// const instructorName = useAtomValue(post.instructor);
	// console.log("instructor name;", instructorName);
	// if i try to fetch instructor name from atom, and then refresh the page, then the instructor name becomes null

	const formattedTitle = title.split("-").join(" ");

	return (
		<>
			<div className="profile-header">
				<div className={`header-img ${isHeaderImg}`}></div>
				<div className="prof-info">
					<div className="badge-info">{badgeLabel}</div>
					<div className="prof-name">{formattedTitle}</div>
				</div>
			</div>
		</>
	);
};

// 교수님 프로필 (사진, instructor 라벨, 성함을 그려주는 컴포넌트)
const ProfProfile = ({ badgeLabel, instructorName }) => {
	let instructor = instructorName.split("-").join(" ");
	return (
		<>
			<div className="profile-header false">
				<div className={"header-img"}></div>
				<div className="prof-info">
					<div className="badge-info">{badgeLabel}</div>
					<div className="prof-name">{instructor}</div>
				</div>
			</div>
		</>
	);
};

export { HeaderBadge, ProfProfile };
