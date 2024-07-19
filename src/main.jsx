import * as React from "react";
import ReactDOM from "react-dom/client";
import Main from "./App.jsx";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./components/error-page";

import {
	createBrowserRouter,
	RouterProvider,
	BrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Main />
	</React.StrictMode>
);
