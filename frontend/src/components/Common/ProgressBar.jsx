import React from "react";

const ProgressBar = ({ value, max }) => {
	const progress = Math.round((value / max) * 100);

	return (
		<div className="h-4 w-full rounded-full bg-flat-300 relative">
			<div
				className="h-full rounded-full bg-chili-500 "
				style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
			/>
			<span className="text-xs font-bold text-chili-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				{`${progress}%`}
			</span>
		</div>
	);
};

export default ProgressBar;
