import React, { Component } from "react";
import {
	faComputer,
	faCloudArrowUp,
	faFaceSmileWink,
	faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Common/Button";

import { useEffect, useRef } from "react";

function Landing() {
	const text = useRef(null);
	const button = useRef(null);
	const deploys = useRef(null);
	const build = useRef(null);
	const upload = useRef(null);
	const enjoy = useRef(null);

	useEffect(() => {
		const elements = [
			{ ref: text, timeout: 500 },
			{ ref: button, timeout: 600 },

			{ ref: build, timeout: 1500 },
			{ ref: upload, timeout: 2400 },
			{ ref: enjoy, timeout: 3100 },
		];

		elements.forEach(({ ref, timeout }) => {
			setTimeout(() => {
				if (ref.current) {
					console.log(ref.current);
					ref.current.classList.replace("opacity-0", "opacity-100");
					ref.current.className = ref.current.className.replace(
						"-translate-x-8",
						"translate-x-0"
					);
				}
			}, timeout);
		});
	}, []);

	return (
		<div className="p-4 h-screen grid grid-cols-2 grid-rows-6 max-w-screen ">
			<h1 className="text-chili-500 text-2xl font-bold col-span-1 ">
				Ez Deploy
			</h1>
			<div
				ref={text}
				className="opacity-0 transition-all ease-in-out duration-700  col-span-1  row-start-2 row-end-5  grid grid-rows-6 grid-cols-12"
			>
				<h2 className="text-chili-100 text-8xl  col-span-12 col-start-2   font-bold">
					The app that <b className="text-chili-500">deploys</b> your website in
					<b className="text-jade-500 block "> 3 clicks</b>
				</h2>
			</div>
			<div className="  grid col-span-1 row-[span_6_/_span_6] row-start-1  grid-cols-1 grid-rows-7    ">
				<div
					ref={build}
					className="opacity-0 transition-all ease-in-out -translate-x-8  duration-700  flex flex-col items-center row-start-2 row-span-2 "
				>
					<p>Build your website</p>
					<div className="bg-chili-500 rounded-full h-24 w-24  p-4 flex items-center cursor-pointer justify-center">
						<FontAwesomeIcon icon={faComputer} className="fa-2xl scale-110" />
					</div>
				</div>

				<div
					ref={upload}
					className=" opacity-0 transition-all ease-in-out -translate-x-8 duration-700    flex flex-col items-center row-span-2  "
				>
					<p>Upload It</p>
					<div className="bg-chili-500 rounded-full h-24 w-24 p-4 flex items-center  cursor-pointer justify-center">
						<FontAwesomeIcon
							icon={faCloudArrowUp}
							className="fa-2xl scale-110 "
						/>
					</div>
				</div>

				<div
					ref={enjoy}
					className="opacity-0 transition-all ease-in-out -translate-x-8 duration-700   flex flex-col items-center  row-span-1 "
				>
					<p>Enjoy</p>
					<div className="bg-chili-500 rounded-full h-24 w-24 p-4 flex items-center  cursor-pointer justify-center">
						<FontAwesomeIcon
							icon={faFaceSmileWink}
							className="fa-2xl scale-110 "
						/>
					</div>
				</div>
			</div>

			<div
				ref={button}
				className="opacity-0 transition-all ease-in-out duration-700   grid col-span-1 row-start-6 grid-rows-6  grid-cols-6 "
			>
				<Button
					title="Get Started"
					extraStyle=" col-span-2 row-span-3 col-start-3  rounded-lg font-medium text-3xl "
				/>
			</div>
		</div>
	);
}

export default Landing;
