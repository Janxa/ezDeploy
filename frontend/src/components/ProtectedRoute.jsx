import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function PrivateRoute({ element, ...rest }) {
	const { user } = useContext(AuthContext);
	return <>{user ? element : <Navigate to="/app/account" replace={true} />}</>;
}

export default PrivateRoute;
