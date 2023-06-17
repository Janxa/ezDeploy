import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTable,
	faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
function Menu({ visibleMobile, setVisibleMobile }) {
	const { logout, user } = useAuth();

	const handleLogout = () => {
		logout();
	};
	if (user)
		return (
			<ul className="flex flex-col-reverse md:items-center md:flex-row md:justify-between lg:justify-end  gap-x-4 lg:gap-x-10  w-full xl:w-2/3">
				<li className="flex mb-4 md:mb-0   justify-between self-center underline decoration-dashed  text-flat-100 hover:text-flat-200 transition-colors ease-in-out duration-100">
					<Link to="about">About </Link>
				</li>

				<li className="flex mb-4 md:mb-0  justify-between self-center underline decoration-dashed text-flat-100 hover:text-flat-200 transition-colors ease-in-out duration-100">
					<Link to="contact">Contact</Link>
				</li>
				<li className="flex font-bold mb-4 md:mb-0  items-center justify-around gap-x-4 lg:gap-x-8 self-center underline ">
					<div className="text-lila-200 hover:text-lila-300 transition-colors ease-in-out duration-100">
						<Link to="dashboard">Dashboard</Link>
						<FontAwesomeIcon icon={faTable} className="fa-xs ml-2 " />
					</div>
					<div className="text-lila-200 hover:text-lila-300 transition-colors ease-in-out duration-100">
						<Link to="uploader">Upload </Link>
						<FontAwesomeIcon
							icon={faArrowUpFromBracket}
							className="fa-xs ml-2"
						/>
					</div>
				</li>
				<li className="flex mb-4 md:mb-0 justify-end self-center">
					<Link
						onClick={handleLogout}
						to="account"
						className="p-2 mx-1 rounded-md bg-chili-500 hover:bg-chili-600 hover:text-flat-200 font-semibold"
						state={{ disp: "login" }}
						title="Logout"
					>
						Logout
					</Link>
				</li>
			</ul>
		);
	else
		return (
			<ul className="flex flex-col-reverse md:items-center md:flex-row md:justify-end lg:w-3/4 gap-x-4 lg:gap-x-10 md:w-full">
				<li className="flex mb-4 md:mb-0   md:w-auto justify-between self-center underline decoration-dashed  text-flat-100 hover:text-flat-200 transition-colors ease-in-out duration-100">
					<Link to="about">About</Link>
				</li>

				<li className="flex mb-4 md:mb-0  md:w-auto justify-between self-center underline decoration-dashed text-flat-100 hover:text-flat-200 transition-colors ease-in-out duration-100">
					<Link to="contact">Contact</Link>
				</li>
				<li className="flex mb-4 md:mb-0  md:justify-between justify-end gap-x-2 lg:gap-x-4 md:w-auto ">
					<Link
						onClick={() => setVisibleMobile(!visibleMobile)}
						className="p-2  rounded-md bg-chili-500 hover:bg-chili-600 hover:text-flat-200 font-semibold"
						to="account"
						state={{ disp: "login" }}
					>
						Log in
					</Link>
					<Link
						onClick={() => setVisibleMobile(!visibleMobile)}
						className="p-2  rounded-md bg-chili-500 hover:bg-chili-600 hover:text-flat-200 font-semibold"
						to="account"
						state={{ disp: "register" }}
					>
						Register
					</Link>
				</li>
			</ul>
		);
}

export default Menu;
