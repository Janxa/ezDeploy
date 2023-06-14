import axios from "axios";
import AuthService from "./authentification.service";
const API_URL = "/api";

const api = axios.create({
	baseURL: API_URL,
	// Other Axios configuration options
});
api.interceptors.response.use(
	(response) => response,
	console.log("Intercepted"),

	(error) => {
		console.log("error found");

		if (error.response && error.response.status === 401) {
			// Handle the 401 response and disconnect the user
			console.log("error code == 401");

			AuthService.logout(); // Implement your logic to disconnect the user
		}
		return Promise.reject(error);
	}
);

export default api;
