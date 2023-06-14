//This function verifies if the user is still logged
//It is intended to be used over protected routes to ensure that the user accessing
//the protected route will be logged out before having to make a rejected api call

const getCookieValue = (name) => {
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(name + "=")) {
			return cookie.substring(name.length + 1);
		}
	}
};
const verifyAuth = () => {
	let authentified = true;
	let csrfAccessToken = getCookieValue("csrf_access_token");

	if (!csrfAccessToken) {
		authentified = false;
	}
	return authentified;
};

export default verifyAuth;
