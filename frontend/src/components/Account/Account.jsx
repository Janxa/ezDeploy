import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import { useLocation } from "react-router-dom";

function Account() {
	//resetting state to prevent uncontrolled behaviors
	window.history.replaceState({}, document.title);
	let { state } = useLocation();
	const [disp, setDisp] = useState(state?.disp || "login");

	useEffect(() => {
		setDisp(state?.disp || "login");
	}, [state]);

	const formSwitch = (new_state) => {
		setDisp(new_state);
	};

	return (
		<main className="mx-auto mt-32 md:mt-32 w-full h-96 lg:w-3/4 flex">
			<div className="bg-flat-700 w-3/4 md:w-1/2 lg:w-2/3 m-auto shadow-md rounded-md  flex flex-col">
				{disp === "login" ? <Login formSwitch={formSwitch} /> : false}
				{disp === "register" ? <Register formSwitch={formSwitch} /> : false}
			</div>
		</main>
	);
}

export default Account;
