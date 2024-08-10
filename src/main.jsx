import * as React from "react";
import ReactDOM from "react-dom/client";
import Main from "./App.jsx";
import "./index.css";

import { createBrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
);
