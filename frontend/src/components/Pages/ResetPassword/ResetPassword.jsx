import Button from "../../Common/Button";
import Input from "../../Common/Input/Input";
import LoadingWheel from "../../Common/LoadingWheel";
import AuthService from "../../../services/authentification.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { resetPasswordSchema } from "./reset_password_schema";
import { useEffect, useState } from "react";
function ResetPassword() {
	const [email, setEmail] = useState("");
	const [emailSent, setEmailSent] = useState(false);
	const [errors, setErrors] = useState("");
	const [loading, setLoading] = useState(false);
	const [timer, setTimer] = useState(-1);
	const schema = resetPasswordSchema;

	const handleChange = ({ currentTarget: input }) => {
		if (errors[input.name]) {
			setErrors((errors) => {
				const updatedErrors = { ...errors };
				delete updatedErrors[input.name];
				return updatedErrors;
			});
		}
		setEmail(input.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const validationResult = schema.validate({ email: email });
		if (validationResult.error) {
			// Validation failed
			console.error(validationResult.error.details);
			const error_list = { ...errors };

			for (let error of validationResult.error.details) {
				error_list[error.context.label] = error.message;
			}

			setErrors(error_list);
			setLoading(false);
			return;
		}
		try {
			setTimer(90);
			const res = await AuthService.sendResetPasswordEmail(email);
			setEmailSent(true);
		} catch (e) {
			console.log(e);
			setTimer(0);
		}
		setLoading(false);
	};
	useEffect(() => {
		if (timer >= 0) {
			setTimeout(() => setTimer((prevTimer) => prevTimer - 1), 1000);
		}
	}, [timer]);

	const PasswordMailSent = () => {
		return (
			<div className="bg-flat-700 w-3/4 md:w-1/2 lg:w-1/2 m-auto  shadow-md rounded-md flex flex-col ">
				<p className="py-4 w-full rounded-t-md text-center  bg-chili-500 ">
					<b className="text-2xl  ">Mail Sent ! </b>
				</p>
				<div className="m-4 pt-2 gap-4 flex flex-col justify-center items-center ">
					<p>
						We've sent you a message with further instructions at this adress :
					</p>
					<p className="rounded-md px-3 py-2  bg-lila-100">
						<FontAwesomeIcon icon={faEnvelope} className=" text-lila-500 " />
						<b className="text-lila-500  "> {email}</b>.
					</p>
					<p>It contains all the details you need to reset your password.</p>
					<p className="underline underline-offset-2 font-bold ">
						Dont forget to check your spams.
					</p>
					<p className="text-sm p-4  text-lila-200    ">
						Nothing in your inbox ?
						<button
							onClick={handleSubmit}
							disabled={timer > 0 ? true : false}
							className={`pl-2 underline decoration-dashed ${
								timer > 0
									? "text-neutral-400 cursor-default"
									: "text-lila-300 hover:text-lila-100 font-bold "
							} transition-all ease-in-out duration-200`}
						>
							Resend email {timer > 0 ? `(${timer}) ` : false}
						</button>
					</p>
				</div>
			</div>
		);
	};
	const PasswordMailForm = () => {
		return (
			<form
				onSubmit={handleSubmit}
				className="bg-flat-700 w-3/4 md:w-1/2 lg:w-1/3 m-auto p-5 shadow-md rounded-md flex flex-col "
			>
				<h2 className="font-bold text-xl md:text-2xl  text-color-yellow-primary  self-center mb-4">
					Update your password
				</h2>
				<label for="email" className="text-sm font-medium py-1">
					Email:
				</label>
				<Input
					name="email"
					type="text"
					onChange={handleChange}
					value={email}
					icon={faEnvelope}
					className="input"
					errors={errors["email"]}
					extraStyle={"text-xs sm:text-sm md:text-base"}
				/>

				{loading ? (
					<LoadingWheel />
				) : (
					<Button title="Resend password" type="submit"></Button>
				)}
				<p className="text-center font-thin my-3 text-xs text-neutral-300">
					A mail with a link to reset your password will be sent. Remember to
					check your spam folder.
				</p>
			</form>
		);
	};
	return (
		<div className="mx-auto mt-48 md:mt-32 w-11/12 flex">
			{!emailSent ? PasswordMailForm() : PasswordMailSent()}
		</div>
	);
}

export default ResetPassword;
