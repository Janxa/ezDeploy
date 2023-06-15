import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import AuthService from "../../../services/authentification.service";
import Button from "../../Common/Button";

function Menu({ visible, setVisible }) {
	const { logout, user } = useContext(AuthContext);

	const handleLogout = () => {
		logout();
	};

	const renderMenuButtons = () => {
		if (user) {
			return (
				<Link
					onClick={handleLogout}
					to="account"
					className="p-2 mx-1 rounded-md bg-chili-500 font-semibold"
					state={{ disp: "login" }}
					title="Logout"
				>
					Logout
				</Link>
			);
		} else {
			return (
				<>
					<Link
						onClick={() => setVisible(!visible)}
						className="p-2 mx-1 rounded-md bg-chili-500"
						to="account"
						state={{ disp: "login" }}
					>
						Login
					</Link>
					<Link
						onClick={() => setVisible(!visible)}
						className="p-2 mx-1 rounded-md bg-chili-500"
						to="account"
						state={{ disp: "register" }}
					>
						Register
					</Link>
				</>
			);
		}
	};

	return (
		<div
			className={
				visible
					? "flex flex-col bg-flat-700 md:bg-flat-800 items-center absolute top-16 left-0 w-full h-screen z-50 md:flex-row md:flex md:w-2/3 md:justify-between md:font-medium md:static md:h-full pt-4 md:pt-0"
					: "hidden md:flex md:w-2/3 md:justify-between md:font-medium "
			}
		>
			<ul className="flex flex-col md:items-center md:flex-row-reverse md:justify-between w-3/4 md:w-full">
				<li className="flex mb-4 md:mb-0  basis-1/4 w-1/2 md:w-auto justify-around self-center">
					{renderMenuButtons()}
				</li>

				<li className="flex mb-4 md:mb-0  basis-1/4 w-1/2 md:w-auto justify-around self-center">
					<Link to="about">About</Link>
				</li>

				<li className="flex mb-4 md:mb-0  basis-1/4 w-1/2 md:w-auto justify-around self-center">
					<Link to="contact">Contact</Link>
				</li>
				{user && (
					<>
						<Link to="dashboard">Dashboard</Link>
						<Link to="uploader">Upload</Link>
					</>
				)}
			</ul>
		</div>
	);
}

export default Menu;
