import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Account from "./components/Pages/Account/Account";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/NotFound";
import VerifyEmail from "./components/VerifyEmail";
import Dashboard from "./components/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadWebsiteForm from "./components/UploadWebsiteForm";
import ColorPalet from "./components/Common/colorpalet";
import Landing from "./components/Landing";
import Contact from "./components/Pages/Contact/Contact";
import About from "./components/Pages/About/About";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
		errorElement: <NotFound />,
	},
	{
		path: "app",
		element: <App />,

		children: [
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
				element: <ProtectedRoute element={<UploadWebsiteForm />} />,
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
