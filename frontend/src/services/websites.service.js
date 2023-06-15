import axios from "axios";
import cookieService from "./cookie.service";
const WEBSITES_URL = "/api/websites/";

const getWebsites = () => {
	return axios.get(WEBSITES_URL + "show");
};

const getWebsiteById = (website_id) => {
	return axios.get(WEBSITES_URL + "getById/" + website_id);
};
const cancelUpload = async (website_id) => {
	return await axios.delete(WEBSITES_URL + "cancel", {
		data: { website_id: website_id },
		credentials: "same-origin",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
			"X-CSRF-TOKEN": cookieService.getCookie("csrf_access_token"),
		},
	});
};
const uploadWebsite = async (file, websiteName) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("website_name", websiteName);
	return await axios.post(WEBSITES_URL + "upload", formData, {
		credentials: "same-origin",
		withCredentials: true,
		headers: {
			"Content-Type": "multipart/form-data",
			"X-CSRF-TOKEN": cookieService.getCookie("csrf_access_token"),
		},
	});
};

const deleteWebsite = async (website_id) => {
	return await axios.delete(WEBSITES_URL + "delete", {
		data: { website_id: website_id },
		credentials: "same-origin",
		withCredentials: true,
		headers: {
			"Content-Type": "application/json",
			"X-CSRF-TOKEN": cookieService.getCookie("csrf_access_token"),
		},
	});
};

const WebsiteService = {
	deleteWebsite,
	uploadWebsite,
	getWebsites,
	getWebsiteById,
	cancelUpload,
};
export default WebsiteService;
