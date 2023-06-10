import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/authentification.service";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const currentUser = AuthService.getCurrentUser();
		console.log(currentUser);
		if (currentUser) {
			setUser(currentUser);
		}
		setIsLoading(false);
	}, []);

	const login = async (email, password) => {
		const username = (await AuthService.login(email, password)).data.username;
		console.log("username == ", username);
		setUser(username);
	};

	const logout = async () => {
		AuthService.logout();
		setUser(false);
	};
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
