import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function InputWrapper({ children, icon, errors, textarea = false }) {
	const height = children.trype == textarea ? "h-14" : " h-full";
	return (
		<div className={height + " w-full flex flex-col "}>
			<div className="relative w-full h-3/5">
				{children}
				{icon && (
					<div className="absolute inset-y-0 flex items-center pl-2 text-flat-800">
						<FontAwesomeIcon icon={icon} className="fa-md" />
					</div>
				)}
			</div>

			<p className="font-medium w-full h-1/5 text-sm py-1 text-invalid-500">
				{errors}
			</p>
		</div>
	);
}

export default InputWrapper;
