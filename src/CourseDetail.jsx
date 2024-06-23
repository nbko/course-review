import React from "react";
import { useParams } from "react-router-dom";

function CourseDetail() {
	const { courseSection } = useParams();

	return (
		<div>
			<h2>Course Detail</h2>
			<p>Course Section: {courseSection}</p>
			{/* Add more detail here */}
		</div>
	);
}

export default CourseDetail;
