import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import AuthService from "../services/authentification.service";
function Menu({ visible, setVisible }) {
	const { isLoggedIn } = useContext(AuthContext);
	console.log(isLoggedIn);
	const menuNotLogged = () => {
		return (
			<div
				className={
					visible
						? "flex flex-col  items-center absolute top-16 left-0 w-full h-screen z-50 md:flex-row md:flex md:w-2/3 md:justify-between text-white md:font-medium md:static md:h-full bg-color-bg-dark md:bg-color-bg-dark-2 pt-4 md:pt-0"
						: "hidden md:flex md:w-2/3 md:justify-between  md:text-white md:font-medium "
				}
			>
				<ul className=" flex flex-col md:items-center md:flex-row-reverse md:justify-between w-3/4 md:w-full">
					<li className="flex mb-4 md:mb-0  basis-1/4 w-1/2 md:w-auto justify-around self-center">
						<Link
							onClick={() => setVisible(!visible)}
							className="p-2 mx-1 rounded-md bg-color-blue-primary"
							to="/account"
							state={{ disp: "login" }}
						>
							Login
						</Link>
						<Link
							onClick={() => setVisible(!visible)}
							className="p-2 mx-1 rounded-md bg-color-blue-primary"
							to="/account"
							state={{ disp: "register" }}
						>
							Register
						</Link>
					</li>
					<li></li>
					<li>PlaceHolder</li>
					<li>PlaceHolder</li>
				</ul>
			</div>
		);
	};
	const menuLogged = () => {
		const user = AuthService.getCurrentUser();
		return (
			<div
				className={
					visible
						? "flex flex-col  items-center absolute top-16 left-0 w-full h-screen z-50 md:flex-row md:flex md:w-2/3 md:justify-between text-white md:font-medium md:static md:h-full bg-color-bg-dark md:bg-color-bg-dark-2 pt-4 md:pt-0"
						: "hidden md:flex md:w-2/3 md:justify-between  md:text-white md:font-medium "
				}
			>
				<ul className=" flex flex-col md:items-center md:flex-row-reverse md:justify-between w-3/4 md:w-full">
					<li className="flex mb-4 md:mb-0  basis-1/4 w-1/2 md:w-auto justify-around self-center">
						<Link
							onClick={() => setVisible(!visible)}
							className="p-2 mx-1 rounded-md bg-color-blue-primary"
							to="/account"
							state={{ disp: "login" }}
						>
							Logout
						</Link>
					</li>
					<li>Hello {user}</li>
					<li>PlaceHolder</li>
					<li>PlaceHolder</li>
				</ul>
			</div>
		);
	};
	return <>{isLoggedIn ? menuLogged() : menuNotLogged()}</>;
}

export default Menu;
