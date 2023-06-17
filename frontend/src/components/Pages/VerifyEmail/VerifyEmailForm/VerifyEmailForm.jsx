import Input from "../../../Common/Input/Input";
import Button from "../../../Common/Button";
const VerifyEmailForm = ({
	handleSubmit,
	handleChange,
	verificationCode,
	errors,
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className="bg-flat-700 w-3/4 md:w-1/2 lg:w-1/3 m-auto p-5 shadow-md rounded-md flex flex-col "
		>
			<h2 className="font-bold text-xl md:text-2xl text-color-yellow-primary  self-center mb-2">
				Verify Email Adress
			</h2>
			<Input
				name="verify"
				placeholder="Please paste the code sent by mail"
				type="text"
				onChange={handleChange}
				value={verificationCode}
				className="input"
				extraStyle={"text-xs sm:text-sm md:text-base"}
			/>
			{errors["code"] && (
				<p className="font-medium text-sm py-1 text-color-red-primary self-center">
					{errors["code"]}
				</p>
			)}
			<Button title="Verify" type="submit">
				Validate
			</Button>
		</form>
	);
};

export default VerifyEmailForm;
