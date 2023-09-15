import { useState, useEffect } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";

function Account() {
	//resetting state to prevent uncontrolled behaviors
	window.history.replaceState({}, document.title);
	let { state } = useLocation();
	const [data, setData] = useState({ username: "", email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [disp, setDisp] = useState(state);
	const [loggedOut, setLoggedOut] = useState(false);
	const [timer, setTimer] = useState(-1);
	const { user } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (user) navigate("/app/dashboard");
		setDisp(state?.disp || "login");
		setLoggedOut(state?.error || false);
	}, [state]);

	const formSwitch = (new_state) => {
		setDisp(new_state);
	};

	useEffect(() => {
		if (timer >= 0) {
			setTimeout(() => setTimer((prevTimer) => prevTimer - 1), 1000);
		}
	}, [timer]);
	return (
		<main className="mx-auto mt-32 md:mt-32 w-full h-96 lg:w-3/4 flex flex-col">
			{loggedOut ? (
				<p className="mx-auto text-lg text-center mb-12">{loggedOut}</p>
			) : (
				false
			)}
			<div className="bg-flat-700 w-3/4 md:w-1/2 lg:w-2/5 m-auto shadow-md rounded-md  flex flex-col">
				{disp === "login" ? (
					<Login
						formSwitch={formSwitch}
						loading={loading}
						setLoading={setLoading}
						data={data}
						setData={setData}
					/>
				) : (
					<Register
						formSwitch={formSwitch}
						loading={loading}
						setLoading={setLoading}
						data={data}
						setData={setData}
						timer={timer}
						setTimer={setTimer}
					/>
				)}
			</div>
		</main>
	);
}

export default Account;
