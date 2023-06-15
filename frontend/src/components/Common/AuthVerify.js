import cookieService from "../../services/cookie.service";

//This function verifies if the user is still logged
//It is intended to be used over protected routes to ensure that the user accessing
//the protected route will be logged out before having to make a rejected api call

const verifyAuth = () => {
	let authentified = true;
	let csrfAccessToken = cookieService.getCookie("csrf_access_token");
	if (!csrfAccessToken) {
		console.log("logout");
		authentified = false;
	}
	return authentified;
};

export default verifyAuth;
