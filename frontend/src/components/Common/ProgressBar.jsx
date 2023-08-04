import React from "react";
import { useRef } from "react";
const ProgressBar = ({ value, max }) => {
	const barRef = useRef();

	return (
		<div className="h-4 w-full rounded-full bg-flat-800 relative ">
			<div
				className="h-full rounded-full  "
				style={{
					width: `${progress}%`,
					transition: "width 0.5s ease-in-out",
					backgroundColor: `hsl(${progress * 1.59},${
						progress * 0.28 + 25
					}%,54%)`,
				}}
			/>
			<span className="text-xs font-bold text-chili-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				{`${progress}%`}
			</span>
		</div>
	);
};

export default ProgressBar;
