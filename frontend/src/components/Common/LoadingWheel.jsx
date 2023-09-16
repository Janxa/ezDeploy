import React from "react";

const LoadingWheel = ({ color = "white", extraStyle }) => {
	return (
		<div className="flex justify-center items-center">
			<div
				className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-${color} ${extraStyle}`}
			></div>
		</div>
	);
};

export default LoadingWheel;
