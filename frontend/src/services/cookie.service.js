const getCookie = (csrf_access_token) => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${csrf_access_token}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
};

const cookieService = {
	getCookie,
};

export default cookieService;
