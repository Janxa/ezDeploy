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
		<div className="p-4">
			<h1 className="text-chili-500 text-2xl font-bold">Ez Deploy</h1>
			<div className="flex w-full justify-around">
				<div className="flex flex-col justify-center items-center">
					<p>Build your website</p>
					<div className="bg-chili-500 rounded-full h-20 w-20  p-4 flex items-center cursor-pointer justify-center">
						<FontAwesomeIcon icon={faComputer} className="fa-2xl" />
					</div>
				</div>
				<div className="flex flex-col justify-center items-center">
					<p>Upload It</p>
					<div className="bg-chili-500 rounded-full h-20 w-20 p-4 flex items-center  cursor-pointer justify-center">
						<FontAwesomeIcon icon={faCloudArrowUp} className="fa-2xl " />
					</div>
				</div>
				<div className="flex flex-col justify-center items-center">
					<p>Enjoy</p>
					<div className="bg-chili-500 rounded-full h-20 w-20 p-4 flex items-center  cursor-pointer justify-center">
						<FontAwesomeIcon icon={faFaceSmileWink} className="fa-2xl " />
					</div>
				</div>
			</div>
			<Button title="GetStarted" />
		</div>
	);
}

export default Landing;
