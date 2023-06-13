import React from "react";
import InputWrapper from "./InputWrapper";
function Input({
	onChange,
	value,
	type,
	name,
	id,
	extraStyle,
	errors,
	disabled,
	icon,
	placeholder = "",
}) {
	const inputStyle = `
    ${extraStyle}
    h-full
    w-full
    p-1
    pl-8
    rounded-sm
	bg-flat-100
    focus:outline-none
    focus:bg-jade-200
    z-10
    text-flat-800
    font-medium
    ${errors && "outline bg-invalid-200 outline-1 outline-invalid-500"}  `;

	return (
		<InputWrapper icon={icon} errors={errors}>
			<input
				disabled={disabled}
				className={inputStyle}
				onChange={onChange}
				value={value}
				type={type}
				name={name}
				id={id}
				placeholder={placeholder}
			/>
		</InputWrapper>
	);
}

export default Input;
