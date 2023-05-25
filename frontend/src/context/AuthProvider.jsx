import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/authentification.service";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		console.log("tryng to get");
		const currentUser = AuthService.getCurrentUser();
		console.log(currentUser);
		if (currentUser) {
			setIsLoggedIn(true);
		}
		setIsLoading(false);
	}, []);

	const login = () => {
		console.log("login called");
		setIsLoggedIn(true);
	};

	const logout = () => {
		setIsLoggedIn(false);
	};
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
