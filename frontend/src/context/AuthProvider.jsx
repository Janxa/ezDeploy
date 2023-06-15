import React, { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/authentification.service";
const AuthContext = createContext();

const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => AuthService.getCurrentUser());

	const login = async (email, password) => {
		const username = (await AuthService.login(email, password)).data.username;
		setUser(username);
	};

	const logout = async () => {
		AuthService.logout();
		setUser(false);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider, useAuth };
