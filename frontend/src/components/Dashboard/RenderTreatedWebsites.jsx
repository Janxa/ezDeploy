import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faLaptopCode,
	faCircle,
	faGears,
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
			console.log("New show :", show);
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
		<tr
			key={key}
			className="flex flex-row border-b border-gray-400 border-dashed mb-4 py-2 "
		>
			{item.status.toLowerCase() === "success" ? (
				<>
					<td className="flex flex-row">
						<FontAwesomeIcon icon={faLaptopCode} className="fa-sm" />
						<p className="pl-4 w-1/2 text-left text-sm font-bold ">
							{item.name}
						</p>
					</td>
					<td className="flex flex-row">
						<FontAwesomeIcon icon={faCircle} className="fa-sm" />
						<p className="pl-4 w-1/2 text-left text-sm font-bold ">
							{item.status}
						</p>
					</td>
					<td className="flex flex-row relative">
						<FontAwesomeIcon
							icon={faGears}
							onClick={() => handleGearIconClick(key)}
							className="cursor-pointer hover:scale-125 transition-all"
						/>

						{show === key && (
							<div
								ref={dropdownRef}
								className={`${
									isAnimating
										? "absolute flex  flex-col right-5 opacity-0 transition-opacity duration-200"
										: "absolute flex flex-col right-5 opacity-100 transition-opacity duration-200"
								} `}
							>
								<Button
									className="z-50"
									onClick={() => showDetails(item.name)}
									title="Update"
								/>

								<Button className="z-50 " title="Update" />
								<Button
									className="z-50"
									onClick={() => handleDelete(item.id)}
									title="Delete"
								/>
							</div>
						)}
					</td>
				</>
			) : (
				<div>
					<p className="border p-1 m-1">{item.name}</p>
					<div className="flex w-ftablel justify-around"></div>
				</div>
			)}
		</tr>
	));
}

export default RenderTreatedWebsites;
