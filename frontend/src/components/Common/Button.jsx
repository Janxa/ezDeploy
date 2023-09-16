import LoadingWheel from "./LoadingWheel";

function Button({
	title,
	onClick,
	type,
	extraStyle,
	disabled = false,
	loading = false,
}) {
	const style = `  ${
		extraStyle ? extraStyle : "font-medium text-sm my-2 p-2 rounded-xl    "
	} ${
		disabled
			? "bg-flat-600 text-flat-500 cursor-default transition-all ease-in-out duration-500 border-t border-flat-600 "
			: "bg-chili-500 hover:bg-chili-600 transition-all ease-in-out duration-500"
	} `;

	return loading ? (
		<LoadingWheel />
	) : (
		<button disabled={disabled} type={type} onClick={onClick} className={style}>
			{title}
		</button>
	);
}

export default Button;
