import React from "react";
import InputWrapper from "./InputWrapper";
function Textarea({
	onChange,
	value,
	name,
	id,
	extraStyle,
	errors,
	disabled,
	placeholder = "",
	rows = 8,
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
		<InputWrapper errors={errors}>
			<textarea
				disabled={disabled}
				className={inputStyle}
				onChange={onChange}
				value={value}
				name={name}
				id={id}
				rows={rows}
				placeholder={placeholder}
			/>
		</InputWrapper>
	);
}

export default Textarea;
