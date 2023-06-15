import React, { createContext, useState, useEffect, useContext } from "react";
import AuthService from "../services/authentification.service";
import LoadingWheel from "../components/Common/LoadingWheel";
const AuthContext = createContext();

const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const currentUser = AuthService.getCurrentUser();
		if (currentUser) {
			setUser(currentUser);
		}

		setIsLoading(false);
	}, []);

	const login = async (email, password) => {
		console.log("login");
		const username = (await AuthService.login(email, password)).data.username;
		setUser(username);
	};

	const logout = async () => {
		AuthService.logout();
		setUser(false);
	};
	if (isLoading) {
		return (
			<div className="flex flex-col w-full h-screen justify-center items-center">
				<LoadingWheel />
			</div>
		);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider, useAuth };
