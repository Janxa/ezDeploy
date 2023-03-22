import axios from "axios";

const API_URL = "/api/websites/";

const getWebsites = () => {
	return axios.get(API_URL + "show");
};
function getCookie(csrf_access_token) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${csrf_access_token}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}
const uploadWebsite = async (file) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("website_name", "website");
	return await axios.post(API_URL + "upload", formData, {
		credentials: "same-origin",
		withCredentials: true,
		headers: {
			"Content-Type": "multipart/form-data",
			"X-CSRF-TOKEN": getCookie("csrf_access_token"),
		},
	});
};

const deleteWebsite = () => {
	return axios.delete(API_URL + "delete");
};

const WebsiteService = {
	deleteWebsite,
	uploadWebsite,
	getWebsites,
};
export default WebsiteService;
