function Button({ title, onClick, type, extraStyle, disabled = false }) {
	const style = disabled
		? extraStyle +
		  ` my-2
       p-2
        bg-color-neutral-200
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
		  ` my-2
       p-2
        bg-chili-500
        hover:bg-chili-600
        font-medium
        text-sm
        rounded-xl
        transition-all
        ease-in-out
        duration-500
        border-t`;

	return (
		<button disabled={disabled} type={type} onClick={onClick} className={style}>
			{title}
		</button>
	);
}

export default Button;
