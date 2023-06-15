const getCookie = (csrf_access_token) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${csrf_access_token}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
};
// const getCookieValue = (name) => {
// 	const cookies = document.cookie.split(";");
// 	for (let i = 0; i < cookies.length; i++) {
// 		const cookie = cookies[i].trim();
// 		if (cookie.startsWith(name + "=")) {
// 			return cookie.substring(name.length + 1);
// 		}
// 	}
// };

const cookieService = {
	getCookie,
	// getCookieValue,
};

export default cookieService;
