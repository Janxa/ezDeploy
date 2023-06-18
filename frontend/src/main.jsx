import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Account from "./components/Pages/Account/Account";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/Pages/NotFound/NotFound";
import VerifyEmail from "./components/Pages/VerifyEmail/VerifyEmail";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Uploader from "./components/Pages/Uploader/Uploader";
import ColorPalet from "./components/Common/colorpalet";
import Landing from "./components/Pages/Landing/Landing";
import Contact from "./components/Pages/Contact/Contact";
import About from "./components/Pages/About/About";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
		errorElement: <NotFound />,
	},
	{
		path: "/app",

		element: <App />,

		children: [
			{
				index: true,
				element: <Account />,
			},
			{
				path: "account",
				element: <Account />,
			},
			{
				path: "verify",
				element: <VerifyEmail />,
				children: [
					{
						path: ":verificationCode",
						element: <VerifyEmail />,
					},
				],
			},
			{
				path: "dashboard/*",
				element: <ProtectedRoute element={<Dashboard />} />,
			},
			{
				path: "contact",
				element: <Contact />,
			},
			{
				path: "about",
				element: <About />,
			},
			{
				path: "uploader",
				element: <ProtectedRoute element={<Uploader />} />,
			},
			{
				path: "colors",
				element: <ColorPalet />,
			},
		],
	},
]);
ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<CookiesProvider>
			<RouterProvider router={router} />
		</CookiesProvider>
	</React.StrictMode>
);
