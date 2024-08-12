import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
import { useSetAtom } from "jotai";
import * as post from "../state/atoms.js";
import { useEffect } from "react";

// 홈화면 검색창
export function SearchInput({ inputType, options }) {
	const setValue = useSetAtom(post.instructor);

	return (
		<div className={`search ${inputType}`}>
			<Autocomplete
				disablePortal
				id={`search-${inputType}`}
				options={options}
				sx={{ width: 1 }}
				renderInput={(params) => <TextField {...params} label={inputType} />}
				onChange={(event, newValue) => {
					setValue(newValue.label);
				}}
			/>
		</div>
	);
}

SearchInput.propTypes = {
	inputType: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
};

// 원래는 학기별로도 검색 가능하게 하려고 했는데 너무 지저분해보여서 일단 제외시킴
export function QuarterTags() {
	return (
		<div className={`search quarter`}>
			<Autocomplete
				multiple
				limitTags={2}
				id="search-quarter"
				options={quarters}
				getOptionLabel={(option) => option.label}
				renderInput={(params) => (
					<TextField {...params} label="Quarter" placeholder="Quarter" />
				)}
				sx={{ width: "500px" }}
			/>
		</div>
	);
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const quarters = [
	{ label: "Autumn 2015" },
	{ label: "Autumn 2016" },
	{ label: "Autumn 2017" },
	{ label: "Autumn 2018" },
	{ label: "Autumn 2019" },
	{ label: "Autumn 2020" },
	{ label: "Autumn 2021" },
	{ label: "Autumn 2022" },
	{ label: "Autumn 2023" },
	{ label: "Autumn 2024" },
	{ label: "Winter 2015" },
	{ label: "Winter 2016" },
	{ label: "Winter 2017" },
	{ label: "Winter 2018" },
	{ label: "Winter 2019" },
	{ label: "Winter 2020" },
	{ label: "Winter 2021" },
	{ label: "Winter 2022" },
	{ label: "Winter 2023" },
	{ label: "Winter 2024" },
	{ label: "Spring 2015" },
	{ label: "Spring 2016" },
	{ label: "Spring 2017" },
	{ label: "Spring 2018" },
	{ label: "Spring 2019" },
	{ label: "Spring 2020" },
	{ label: "Spring 2021" },
	{ label: "Spring 2022" },
	{ label: "Spring 2023" },
	{ label: "Spring 2024" },
	{ label: "Summer 2015" },
	{ label: "Summer 2016" },
	{ label: "Summer 2017" },
	{ label: "Summer 2018" },
	{ label: "Summer 2019" },
	{ label: "Summer 2020" },
	{ label: "Summer 2021" },
	{ label: "Summer 2022" },
	{ label: "Summer 2023" },
	{ label: "Summer 2024" },
];
