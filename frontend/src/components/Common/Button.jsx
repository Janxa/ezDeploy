function Button({ title, onClick, type, extraStyle, disabled = false }) {
	const style = disabled
		? extraStyle +
		  `emy-2
        py-2
        px-2
        bg-color-gray
        rounded-xl
        text-gray-500
        cursor-default
        font-medium
        text-sm
        transition-all
        ease-in-out
        duration-700
        border-t`
		: extraStyle +
		  `my-2
        py-2
        px-2
        bg-color-blue-primary
        hover:bg-color-blue-secondary
        font-medium
        text-sm
        rounded-xl
        transition-all
        ease-in-out
        duration-700
        border-t`;

	return (
		<button disabled={disabled} type={type} onClick={onClick} className={style}>
			{title}
		</button>
	);
}

export default Button;
