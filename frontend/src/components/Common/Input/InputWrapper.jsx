import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function InputWrapper({ children, icon, errors }) {
	const inputElement = children;
	return (
		<div className="h-full w-full flex flex-col mb-2">
			<div className="relative w-full h-4/5">
				{children}
				{icon && (
					<div className="absolute inset-y-0 flex items-center pl-2 text-flat-800">
						<FontAwesomeIcon icon={icon} className="fa-md" />
					</div>
				)}
			</div>
			{errors && (
				<p className="font-medium w-full h-1/5 text-sm py-1 text-invalid-500">
					{errors}
				</p>
			)}
		</div>
	);
}

export default InputWrapper;
