import React, { Component } from "react";
import {
	faComputer,
	faCloudArrowUp,
	faFaceSmileWink,
	faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Common/Button";

function Landing() {
	return (
		<div className="p-4 h-screen grid grid-cols-2 grid-rows-6 ">
			<h1 className="text-chili-500 text-2xl font-bold col-span-1 ">
				Ez Deploy
			</h1>
			<div className=" col-span-1  row-start-2 row-end-5  grid grid-rows-6 grid-cols-12">
				<h2 className="text-chili-100 text-8xl  col-span-12 col-start-2   font-bold">
					The app that <b className="text-chili-500">deploys</b> your website in
					<b className="text-jade-500 block "> 3 clicks</b>
				</h2>
			</div>
			<div className="grid col-span-1 row-[span_6_/_span_6] row-start-1  grid-cols-1 grid-rows-7    ">
				<div className=" flex flex-col items-center row-start-2 row-span-2 scale-110">
					<p>Build your website</p>
					<div className="bg-chili-500 rounded-full h-20 w-20  p-4 flex items-center cursor-pointer justify-center">
						<FontAwesomeIcon icon={faComputer} className="fa-2xl" />
					</div>
				</div>

				<div className=" flex flex-col items-center row-span-2 scale-110 ">
					<p>Upload It</p>
					<div className="bg-chili-500 rounded-full h-20 w-20 p-4 flex items-center  cursor-pointer justify-center">
						<FontAwesomeIcon icon={faCloudArrowUp} className="fa-2xl " />
					</div>
				</div>

				<div className=" flex flex-col items-center  row-span-1 scale-110">
					<p>Enjoy</p>
					<div className="bg-chili-500 rounded-full h-20 w-20 p-4 flex items-center  cursor-pointer justify-center">
						<FontAwesomeIcon icon={faFaceSmileWink} className="fa-2xl " />
					</div>
				</div>
			</div>

			<div className=" grid col-span-1 row-start-6 grid-rows-6  grid-cols-6 ">
				<Button
					title="Get Started"
					extraStyle=" col-span-2 row-span-3 col-start-3  rounded-lg font-medium text-3xl "
				/>
			</div>
		</div>
	);
}

export default Landing;
