import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";

export function SearchInput({ inputType, options, setSelectedMajor }) {
	// const [optionLabels, setOptionLabels] = useState(inputType);

	return (
		<div className={`search ${inputType}`}>
			<Autocomplete
				disablePortal
				id={`search-${inputType}`}
				options={options}
				sx={{ width: 1 }}
				renderInput={(params) => <TextField {...params} label={inputType} />}
				onChange={(event, newValue) => {
					setSelectedMajor(newValue);
				}}
			/>
		</div>
	);
}

SearchInput.propTypes = {
	inputType: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	setSelectedMajor: PropTypes.func.isRequired,
};

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
