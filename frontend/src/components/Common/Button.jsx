function Button({ title, onClick, type, extraStyle, disabled = false }) {
	const style = ` ${extraStyle} my-2 p-2 rounded-xl font-medium text-sm border-t ${
		disabled
			? "bg-flat-600 text-flat-500 cursor-default transition-all ease-in-out duration-500 border-t border-flat-600 "
			: "bg-chili-500 hover:bg-chili-600 transition-all ease-in-out duration-500"
	} `;

	return (
		<button disabled={disabled} type={type} onClick={onClick} className={style}>
			{title}
		</button>
	);
}

export default Button;
