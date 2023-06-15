import { useState } from "react";
import Menu from "./Menu";
function Header() {
	const [visibleMobile, setVisibleMobile] = useState(false);
	return (
		<header className="flex bg-flat-800 justify-between py-4 px-5 h-16 md:px-16 shadow-md absolute top-0 left-0 right-0 overflow-visible">
			<h1 className="text-chili-500 font-bold text-2xl  ">EZ Deploy</h1>

			<button
				onClick={() => setVisibleMobile(!visibleMobile)}
				className="group w-9 h-full self-center items-end flex flex-col justify-between md:hidden"
			>
				<div className="bg-white w-full h-[13%] group-hover:w-4/5 transition-all"></div>
				<div className="bg-white w-full h-[13%] group-hover:w-2/3 transition-all"></div>
				<div className="bg-white w-full h-[13%] group-hover:w-4/5 transition-all"></div>
			</button>
			<Menu visibleMobile={visibleMobile} setVisibleMobile={setVisibleMobile} />
		</header>
	);
}

export default Header;
