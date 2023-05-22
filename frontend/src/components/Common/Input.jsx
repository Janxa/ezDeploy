import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";

function Input({
	onChange,
	value,
	type,
	name,
	id,
	extraStyle = "",
	errors = false,
	valid = true,
	disabled = false,
}) {
	const inputStyle = `
	${extraStyle}
	h-full
	w-full
	p-1
	pl-8
	rounded-sm
	focus:outline-none

	focus:bg-jade-200

	text-flat-800
	font-medium
    ${!valid && "outline bg-invalid-200 outline-1 outline-invalid-500"}  `;

	let icon = null;

	if (type === "password") {
		icon = <FontAwesomeIcon icon={faKey} className="fa-md" />;
	} else if (type === "email") {
		icon = <FontAwesomeIcon icon={faEnvelope} className="fa-md" />;
	}

	return (
		<div className=" h-full w-full flex flex-col mb-2">
			<div className="relative w-full h-4/5">
				<input
					className={inputStyle}
					onChange={onChange}
					value={value}
					type={type}
					name={name}
					id={id}
				/>
				{icon && (
					<div className="absolute inset-y-0 flex  items-center pl-2  text-flat-800">
						{icon}
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

export default Input;
