import axios from "axios";
const API_URL = "/api/authentification";

const AuthService = {
	async login(email, password) {
		const res = await axios.post(API_URL + "/login", {
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
	register(username, email, password) {
		return axios.post(API_URL + "/register", {
			username: username,
			email: email,
			password: password,
		});
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
