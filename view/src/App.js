import "./App.css";
import { SearchInput, QuarterTags } from "./SearchInput";

function App() {
	return (
		<div className="search-container">
			<h2>Welcome to Coure Review Summarizer!</h2>
			<div className="search-box">
				<SearchInput inputType="major" />
				<SearchInput inputType="instructor name" />
				<QuarterTags />
			</div>
		</div>
	);
}

export default App;
