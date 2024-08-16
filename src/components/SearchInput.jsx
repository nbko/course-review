import PropTypes from "prop-types";
import { useEffect } from "react";
import { useAtom } from "jotai";
import * as post from "../state/atoms.js";
import { Autocomplete, InputBase } from "@mui/material";
import Search from "@mui/icons-material/Search.js";
import { useNavigate } from "react-router-dom";

// 홈화면 검색창
export function SearchInput({ options }) {
	const [instructor, setInstructor] = useAtom(post.instructor);
	const navigate = useNavigate();

	// 네브바의 검색창에서 새로운 교수님의 이름을 선택하면 해당 교수님의 수업 후기를 모아서
	// 리스트업하는 페이지로 넘어감
	useEffect(() => {
		if (instructor) {
			console.log("Instructor changed in SearchInput:", instructor);
			let formatInstructorName = instructor.split(" ").join("-");
			console.log(`Navigating to professor ${formatInstructorName}'s page`);
			navigate(`/professors/${formatInstructorName}`);
		}
	}, [instructor, navigate]);

	return (
		<>
			<Search sx={{ color: "#800000", p: ".5rem 0" }} />
			<Autocomplete
				disablePortal
				id="search-instructor"
				options={options}
				getOptionLabel={(option) => option.label}
				renderInput={(params) => {
					const { InputLabelProps, InputProps, ...rest } = params;
					return (
						<InputBase
							sx={{ fontSize: "1.2rem" }}
							{...params.InputProps}
							{...rest}
						/>
					);
				}}
				onChange={(event, newValue) => {
					console.log(event.target);
					if (newValue && newValue.label !== instructor) {
						// Only update if the instructor is different
						console.log("updating instructor");
						setInstructor(newValue.label);
					}
				}}
				sx={{ width: "100%", ml: "1rem" }}
			/>
		</>
	);
}

SearchInput.propTypes = {
	inputType: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
};

// 원래는 학기별로도 검색 가능하게 하려고 했는데 너무 지저분해보여서 일단 제외시킴
// export function QuarterTags() {
// 	return (
// 		<div className={`search quarter`}>
// 			<Autocomplete
// 				multiple
// 				limitTags={2}
// 				id="search-quarter"
// 				options={quarters}
// 				getOptionLabel={(option) => option.label}
// 				renderInput={(params) => (
// 					<TextField {...params} label="Quarter" placeholder="Quarter" />
// 				)}
// 				sx={{ width: "500px" }}
// 			/>
// 		</div>
// 	);
// }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const quarters = [
// 	{ label: "Autumn 2015" },
// 	{ label: "Autumn 2016" },
// 	{ label: "Autumn 2017" },
// 	{ label: "Autumn 2018" },
// 	{ label: "Autumn 2019" },
// 	{ label: "Autumn 2020" },
// 	{ label: "Autumn 2021" },
// 	{ label: "Autumn 2022" },
// 	{ label: "Autumn 2023" },
// 	{ label: "Autumn 2024" },
// 	{ label: "Winter 2015" },
// 	{ label: "Winter 2016" },
// 	{ label: "Winter 2017" },
// 	{ label: "Winter 2018" },
// 	{ label: "Winter 2019" },
// 	{ label: "Winter 2020" },
// 	{ label: "Winter 2021" },
// 	{ label: "Winter 2022" },
// 	{ label: "Winter 2023" },
// 	{ label: "Winter 2024" },
// 	{ label: "Spring 2015" },
// 	{ label: "Spring 2016" },
// 	{ label: "Spring 2017" },
// 	{ label: "Spring 2018" },
// 	{ label: "Spring 2019" },
// 	{ label: "Spring 2020" },
// 	{ label: "Spring 2021" },
// 	{ label: "Spring 2022" },
// 	{ label: "Spring 2023" },
// 	{ label: "Spring 2024" },
// 	{ label: "Summer 2015" },
// 	{ label: "Summer 2016" },
// 	{ label: "Summer 2017" },
// 	{ label: "Summer 2018" },
// 	{ label: "Summer 2019" },
// 	{ label: "Summer 2020" },
// 	{ label: "Summer 2021" },
// 	{ label: "Summer 2022" },
// 	{ label: "Summer 2023" },
// 	{ label: "Summer 2024" },
// ];
