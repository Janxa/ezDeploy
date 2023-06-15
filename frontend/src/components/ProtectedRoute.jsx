import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import verifyAuth from "./Common/AuthVerify.js";
const PrivateRoute = ({ element }) => {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	// Authentication verification logic
	useEffect(() => {
		const authentified = verifyAuth();
		if (!authentified) {
			logout();
			return navigate("/app/account", {
				state: { error: "Session expired, please reconnect" },
			});
		}
	}, [user, logout]);

	return user ? element : <Navigate to="/app/account" replace={true} />;
};

export default PrivateRoute;
