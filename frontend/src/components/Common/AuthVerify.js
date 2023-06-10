import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const getCookieValue = (name) => {
	const cookies = document.cookie.split(";");

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();

		if (cookie.startsWith(name + "=")) {
			return cookie.substring(name.length + 1);
		}
	}
};
const AuthVerify = (props) => {
	let location = useLocation();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));

		if (user) {
			const csrfAccessToken = getCookieValue("csrf_access_token");

			if (!csrfAccessToken) {
				props.logOut();
			}
		}
	}, [location, props]);

	return;
};

export default AuthVerify;
