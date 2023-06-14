import React from "react";
import { Link } from "react-router-dom";
function NotFound() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
			<p className="text-lg mb-8">The requested page could not be found.</p>
			<Link
				className="bg-chili-500 hover:bg-chili-600 text-white font-bold py-2 px-4 rounded"
				to="app/account"
			>
				Go to app
			</Link>
		</div>
	);
}

export default NotFound;
