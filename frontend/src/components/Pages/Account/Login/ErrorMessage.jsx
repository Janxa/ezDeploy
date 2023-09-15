import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function ErrorMessage({ message, onButtonClick }) {
	const renderButton = message === "User not validated";

	if (renderButton) {
		message = "Your email has not been validated, please check your emails or ";
	}

	return (
		<div className="font-medium text-sm py-1 text-color-red-primary">
			<p className="text-md my-2 text-center w-fulls text-invalid-500 self-center">
				<FontAwesomeIcon icon={faTriangleExclamation} />
				{message}

				{renderButton && (
					<span
						onClick={onButtonClick}
						className="font-medium  underline decoration-dashed inline cursor-pointer"
					>
						Resend One
					</span>
				)}
			</p>
		</div>
	);
}

export default ErrorMessage;
