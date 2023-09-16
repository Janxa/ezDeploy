import LoadingWheel from "../../Common/LoadingWheel";

const ResendVerifyEmail = ({ handleResend, isLoading }) => {
	const content = isLoading ? (
		<LoadingWheel />
	) : (
		<p className="font-medium text-sm py-1  self-center text-center">
			Your email verification token is expired.
			<span
				className="text-lila-200 cursor-pointer block ml-1 font-bold underline decoration-dashed"
				onClick={handleResend}
			>
				Click here to get a new one
			</span>
		</p>
	);
	return (
		<div className="bg-flat-700  w-3/4 md:w-1/2 lg:w-1/3 m-auto p-5 shadow-md rounded-md flex flex-col ">
			{content}
		</div>
	);
};

export default ResendVerifyEmail;
