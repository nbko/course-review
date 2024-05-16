import "./App.css";
import { SearchInput, QuarterTags } from "./SearchInput";

function App() {
	return (
		<div className="search-container">
			<h2>Welcome to Coure Review Summarizer!</h2>
			<SearchInput inputType="major" />
			<SearchInput inputType="instructor name" />
			<QuarterTags />
		</div>
	);
}

export default App;
