import React from "react";

const ProgressBar = ({ value, max }) => {
	const progress = Math.round((value / max) * 100);

	return (
		<div className="h-4 w-full rounded-full bg-gray-300 relative">
			<div
				className="h-full rounded-full bg-color-blue-primary "
				style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}
			/>
			<span className="text-xs font-bold text-color-bg-dark-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				{`${progress}%`}
			</span>
		</div>
	);
};

export default ProgressBar;
