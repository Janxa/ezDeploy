import axios from "axios";
import api from "./api.service";
const AUTH_URL = "/authentification";

const AuthService = {
	async login(email, password) {
		const res = await api.post(AUTH_URL + "/login", {
			email: email,
			password: password,
		});
		localStorage.setItem("user", JSON.stringify(res.data.username));
		return res;
	},

	logout() {
		document.cookie =
			"csrf_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		localStorage.removeItem("user");
	},

	async register(username, email, password) {
		return api.post(AUTH_URL + "/register", {
			username: username,
			email: email,
			password: password,
		});
	},

	async sendNewEmailToken({ email = false, user_id = false }) {
		if (user_id) {
			return await api.post(AUTH_URL + "/resend", {
				user_id: user_id,
			});
		} else if (email) {
			return await api.post(AUTH_URL + "/resend", {
				email: email,
			});
		}
		return null;
	},

	async sendResetPasswordEmail(email) {
		return await api.post(AUTH_URL + "/password/resend", { email: email });
	},

	getCurrentUser() {
		try {
			const user = JSON.parse(localStorage.getItem("user"));
			return user;
		} catch (e) {
			return e;
		}
	},
};

export default AuthService;
