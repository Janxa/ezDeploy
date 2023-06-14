import React from "react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
	faComputer,
	faCloudArrowUp,
	faFaceSmileWink,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../Common/Button";

function Landing() {
	const text = useRef(null);
	const button = useRef(null);
	const build = useRef(null);
	const upload = useRef(null);
	const enjoy = useRef(null);
	const navigate = useNavigate();
	useEffect(() => {
		const elements = [
			{ ref: text, timeout: 500 },
			{ ref: button, timeout: 600 },
			{ ref: build, timeout: 1200 },
			{ ref: upload, timeout: 1700 },
			{ ref: enjoy, timeout: 2200 },
		];

		elements.forEach(({ ref, timeout }) => {
			setTimeout(() => {
				if (ref.current) {
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
		<div className="p-4 h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-6 max-w-screen  ">
			<h1 className="text-chili-500 text-2xl font-bold col-span-1 ">
				Ez Deploy
			</h1>
			<div
				ref={text}
				className="opacity-0 transition-all ease-in-out duration-700
				row-start-2 row-end-4 md:row-end-6 lg:row-end-5
				flex flex-col  md:grid md:grid-rows-6 grid-cols-1 "
			>
				<h2 className="text-chili-100 text-5xl  sm:text-7xl 2xl:text-8xl  text-center   md:row-span-6    font-bold">
					The app that <b className="text-chili-500 lg:block">deploys</b> your
					website in
					<b className="text-jade-500 md:block lg:block "> 3 clicks</b>
				</h2>
			</div>
			<div
				className="
			md:col-start-2
			row-start-4  md:row-start-1
			row-end-6 lg:row-end-7
			grid
			grid-cols-3 md:grid-cols-1
			grid-rows-4  md:grid-rows-6    "
			>
				<div
					ref={build}
					className="opacity-0 transition-all ease-in-out -translate-x-8 duration-700 flex flex-col justify-evenly md:justify-center
					 items-center row-start-1 row-end-4 md:row-start-1 md:row-span-2  text-center "
				>
					<p className="min-h-[3rem] flex items-center lg:text-xl ">
						Build your website
					</p>
					<div className="bg-chili-500 rounded-full h-24 w-24  p-4 flex items-center cursor-pointer justify-center">
						<FontAwesomeIcon icon={faComputer} className="fa-2xl scale-110" />
					</div>
				</div>

				<div
					ref={upload}
					className="opacity-0 transition-all ease-in-out -translate-x-8 duration-700 flex flex-col justify-evenly md:justify-center
					items-center row-start-1 row-end-4 md:row-start-3 md:row-span-2   "
				>
					<p className="min-h-[3rem] flex items-center lg:text-xl">Upload It</p>
					<div className="bg-chili-500 rounded-full h-24 w-24 p-4 flex items-center  cursor-pointer justify-center">
						<FontAwesomeIcon
							icon={faCloudArrowUp}
							className="fa-2xl scale-110 "
						/>
					</div>
				</div>

				<div
					ref={enjoy}
					className="opacity-0 transition-all ease-in-out -translate-x-8 duration-700 flex flex-col justify-evenly md:justify-center
					items-center row-start-1 row-end-4 md:row-start-5 md:row-span-2  "
				>
					<p className="min-h-[3rem] flex items-center  lg:text-xl">Enjoy</p>
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
				className="opacity-0 transition-all ease-in-out duration-700   grid md:col-span-2 lg:col-span-1 row-start-6 lg:row-start-5  grid-rows-6  grid-cols-6 2xl:grid-cols-12"
			>
				<Button
					title="Get Started"
					extraStyle="col-span-4 md:col-span-2 lg:col-span-4 2xl:col-span-6
					col-start-2 md:col-start-3 lg:col-start-2 2xl:col-start-4
					row-start-1 md:row-start-2 lg:row-start-2
					row-end-5  md:row-end-6 lg:row-end-6 2xl:row-end-5
					rounded-lg lg:rounded-xl font-medium text-3xl lg:text-4xl "
					onClick={() => navigate("/app/account")}
				/>
			</div>
		</div>
	);
}

export default Landing;
