import "./App.css";
import { SearchInput, QuarterTags } from "./SearchInput";

function App() {
	return (
		<div className="search-container">
			<h2>Welcome to Course Review Summarizer!</h2>
			<div className="search-box">
				<SearchInput inputType="major" />
				<SearchInput inputType="instructor name" />
				<QuarterTags />
				<SearchInput inputType="course section" />
			</div>
		</div>
	);
}

export default App;
