import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import verifyAuth from "./Common/AuthVerify.js";
const PrivateRoute = ({ element }) => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	// Authentication verification logic
	useEffect(() => {
		const authentified = verifyAuth();
		if (!authentified) {
			logout();
			return navigate("/app/account", {
				state: { error: "Please Login to access this page" },
			});
		}
	}, [user, logout]);

	return user ? element : <Navigate to="/app/account" replace={true} />;
};

export default PrivateRoute;
