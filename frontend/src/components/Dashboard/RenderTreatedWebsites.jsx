import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLaptopCode,
	faCircle,
	faGears,
	faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Common/Button.jsx";
import { useEffect, useRef } from "react";

function RenderTreatedWebsites({ websites }) {
	const [show, setShow] = useState(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const dropdownRef = useRef(null);
	const handleGearIconClick = (key) => {
		console.log("key=", key, show, isAnimating);
		if (!isAnimating) {
			setShow(show === key ? null : key);
			setIsAnimating(true);
			setTimeout(() => {
				setIsAnimating(false);
			}, 30); // Set the timeout to match the duration of the transition
		}
	};
	const handleClickOutside = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			handleGearIconClick(null);
		}
	};
	useEffect(() => {
		if (show !== null) {
			document.addEventListener("click", handleClickOutside);
		}
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [show, handleClickOutside]);
	return websites.map((item, key) => (
		<div key={key} className=" grid grid-cols-1  lg:pb-3 ">
			{item.status.toLowerCase() === "success" ? (
				<div className=" grid grid-cols-2 lg:grid-cols-6 auto-rows-min gap-y-4   lg:gap-x-4 ">
					<p className="bg-chili-500 rounded-l-xl pl-4 lg:hidden">Website</p>
					<div className="pr-2 flex flex-row justify-left  items-center bg-chili-500 lg:bg-transparent rounded-r-xl">
						<FontAwesomeIcon icon={faLaptopCode} className="fa-sm" />
						<p className="pl-2  text-left text-sm font-bold ">{item.name}</p>
					</div>

					<p className=" pl-4 lg:hidden">Status</p>
					<div className="pr-2 flex flex-row justify-left items-center">
						<FontAwesomeIcon icon={faCircle} className="fa-sm text-jade-500" />
						<p className="pl-2 text-left text-sm font-bold  text-jade-500">
							{item.status}
						</p>
					</div>

					<p className="pl-4 lg:hidden">Link</p>
					<a
						href={item.link}
						className=" pr-2 text-left text-sm overflow-x-scroll lg:col-span-2 "
					>
						{item.link}
					</a>

					<p className=" pl-4 lg:hidden">Options</p>
					<div className="flex flex-row justify-left items-center lg:col-span-2">
						<div
							onClick={() => handleGearIconClick(key)}
							ref={dropdownRef}
							className={`${show === key ? "rounded-t-full" : "rounded-full"}
									 bg-chili-400 w-1/2 relative  px-4  lg:w-3/4 py-1 flex justify-end
									 items-center cursor-pointer transition-all ease-in-out duration-200`}
						>
							<FontAwesomeIcon
								icon={faGears}
								onClick={() => handleGearIconClick(key)}
							/>
							<FontAwesomeIcon
								icon={faChevronDown}
								className={`${
									show === key
										? "rotate-180 translate-x-1/3"
										: "rotate-0 translate-x-0"
								} fa-xs pl-2  transition-all ease-in-out duration-200 `}
							/>
							{show === key && (
								<div
									className={`${
										isAnimating
											? "absolute flex left-0 right-0 bottom-0 transition-all ease-in-out duration-200 h-0	origin-top	top-2 flex-col  opacity-0  z-50  bg-chili-400  animate-growDown"
											: "absolute flex left-0 right-0 bottom-0 transition-all ease-in-out duration-200 h-fit 	origin-top	top-6 flex-col  opacity-100 z-50 shadow-md bg-chili-400 animate-growDown  rounded-b-3xl "
									} `}
								>
									<a href={item.link} className="z-50 mx-auto">
										Open
									</a>
									<button className="z-50">Update</button>
									<button
										className="z-50 pb-1"
										onClick={() => handleDelete(item.id)}
									>
										Delete
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<div>
					<p className="border p-1 m-1">{item.name}</p>
					<div className="flex w-ftablel justify-around"></div>
				</div>
			)}
		</div>
	));
}

export default RenderTreatedWebsites;
