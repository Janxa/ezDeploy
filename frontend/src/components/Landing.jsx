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
		<div className="p-4 h-screen grid grid-cols-2 grid-rows-6 gap-y-20">
			<h1 className="text-chili-500 text-2xl font-bold col-span-2 ">
				Ez Deploy
			</h1>
			<div className=" col-span-2  row-span-3  grid row-start-2 grid-cols-3">
				<h2 className="text-chili-100 text-7xl items-center flex justify-center text-center flex-col  font-bold">
					The app that <b className="text-chili-500">deploys</b> your website in{" "}
					<b className="text-jade-500">3 clicks</b>
				</h2>
				<div className="col-span-2 grid grid-cols-3 ">
					<div className=" col-start-2 flex flex-col items-center ">
						<p>Build your website</p>
						<div className="bg-chili-500 rounded-full h-20 w-20  p-4 flex items-center cursor-pointer justify-center">
							<FontAwesomeIcon icon={faComputer} className="fa-2xl" />
						</div>
					</div>
					<div className=" col-start-2 flex flex-col items-center ">
						<p>Upload It</p>
						<div className="bg-chili-500 rounded-full h-20 w-20 p-4 flex items-center  cursor-pointer justify-center">
							<FontAwesomeIcon icon={faCloudArrowUp} className="fa-2xl " />
						</div>
					</div>
					<div className=" col-start-2 flex flex-col items-center ">
						<p>Enjoy</p>
						<div className="bg-chili-500 rounded-full h-20 w-20 p-4 flex items-center  cursor-pointer justify-center">
							<FontAwesomeIcon icon={faFaceSmileWink} className="fa-2xl " />
						</div>
					</div>
				</div>
			</div>
			<Button title="GetStarted" extraStyle="row-start-5 h-full text-3xl" />
		</div>
	);
}

export default Landing;
