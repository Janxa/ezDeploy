import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faKey,
	faUser,
	faPen,
} from "@fortawesome/free-solid-svg-icons";

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
	rows = 8,
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
    z-10
    text-flat-800
    font-medium
    ${!valid && "outline bg-invalid-200 outline-1 outline-invalid-500"}  `;

	let icon = null;
	let inputElement = null;

	if (name === "password") {
		icon = <FontAwesomeIcon icon={faKey} className="fa-md" />;
	} else if (name === "email") {
		icon = <FontAwesomeIcon icon={faEnvelope} className="fa-md" />;
	} else if (name === "username") {
		icon = <FontAwesomeIcon icon={faUser} className="fa-md" />;
	} else if (name === "website") {
		icon = <FontAwesomeIcon icon={faPen} className="fa-md" />;
	}

	if (type === "textarea") {
		inputElement = (
			<textarea
				className={inputStyle}
				onChange={onChange}
				value={value}
				name={name}
				id={id}
				rows={rows}
			/>
		);
	} else {
		inputElement = (
			<input
				className={inputStyle}
				onChange={onChange}
				value={value}
				type={type}
				name={name}
				id={id}
			/>
		);
	}

	return (
		<div className="h-full w-full flex flex-col mb-2">
			<div className="relative w-full h-4/5">
				{inputElement}
				{icon && (
					<div className="absolute inset-y-0 flex items-center pl-2 text-flat-800">
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
