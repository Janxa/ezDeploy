import { useState } from "react";
import { registerSchema } from "./register_schema";
import { faKey, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Input from "../../../Common/Input/Input.jsx";
import Button from "../../../Common/Button";
import EmailVerificationMessage from "./EmailVerificationMessage";
import axios from "axios";
function Register({
	data,
	setData,
	timer,
	setTimer,
	formSwitch,
	loading,
	setLoading,
}) {
	const [errors, setErrors] = useState({});
	const [emailsent, setEmailsent] = useState(false);
	const schema = registerSchema;

	const handleChange = ({ currentTarget: input }) => {
		if (errors[input.name]) {
			setErrors((errors) => {
				const updatedErrors = { ...errors };
				delete updatedErrors[input.name];
				return updatedErrors;
			});
		}
		setData((data) => {
			return {
				...data,
				[input.name]: input.value,
			};
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const submitData = { ...data };
		submitData.email = submitData.email.toLowerCase();

		let errors = {};
		const validationResult = schema.validate(data, { abortEarly: false });
		if (validationResult.error) {
			// Validation failed
			const error_list = { ...errors };
			for (let error of validationResult.error.details) {
				error_list[error.context.label] = error.message;
			}

			setErrors(error_list);
			setLoading(false);
			return;
		}
		try {
			const res = await axios.post("/api/authentification/register", data);
			setEmailsent(true);
		} catch (error) {
			console.log("Login error:", error);
			if (error.response.status == 500) {
				errors["request"] =
					"Server Error. Check your connexion or try again later";
			} else if (error.request) {
				errors["request"] = error.response.data.error;
			} else {
				errors["request"] = error.request.statusText;
			}
			setErrors(errors);
			console.log(errors);
		}
		setLoading(false);
	};
	const resendEmail = async () => {
		try {
			setTimer(90);
			const res = await axios.post("/api/authentification/resend", {
				email: data["email"],
			});
		} catch (error) {
			console.log("Login error:", error);
			if (error.response.status == 500) {
				errors["request"] =
					"Server Error. Check your connexion or try again later";
			} else if (error.request) {
				errors["request"] = error.response.data.error;
			} else {
				errors["request"] = error.request.statusText;
			}
		}
	};
	return (
		<div className=" flex flex-col ">
			{!emailsent ? (
				<form onSubmit={handleSubmit} noValidate className="flex flex-col p-5 ">
					<h2 className="font-bold text-2xl text-color-yellow-primary  self-center ">
						Register
					</h2>
					<label for="username" className="font-medium text-sm py-1">
						Username:
					</label>
					<Input
						icon={faUser}
						onChange={handleChange}
						value={data.username}
						name="username"
						type="text"
						id="username_input"
						valid={errors["username"] ? false : true}
						errors={errors["username"]}
					/>

					<label for="email" className="text-sm font-medium py-1">
						Email:
					</label>

					<Input
						icon={faEnvelope}
						onChange={handleChange}
						value={data.email}
						type="email"
						name="email"
						id="email_input"
						valid={errors["email"] ? false : true}
						errors={errors["email"]}
					/>

					<label for="password" className="text-sm font-medium py-1">
						Password:
					</label>

					<Input
						onChange={handleChange}
						value={data.password}
						type="password"
						name="password"
						icon={faKey}
						id="password_input"
						valid={errors["password"] ? false : true}
						errors={errors["password"]}
					/>

					{errors["request"] && (
						<p className="text-md my-2 text-center w-full  text-invalid-500 self-center">
							{errors["request"]}
						</p>
					)}

					<Button
						title="Register"
						type="submit"
						loading={loading}
						disabled={
							data.email && data.password && data.username ? false : true
						}
					/>

					<div className="self-end flex">
						{" "}
						<p className="text-sm font-light   "> Already got an account ?</p>
						<button
							className=" font-medium text-sm  ml-2 text-lila-300 underline  hover:text-lila-200  transition-colors duration-75"
							onClick={() => formSwitch("login")}
						>
							Log in
						</button>
					</div>
				</form>
			) : (
				<EmailVerificationMessage
					resendEmail={resendEmail}
					email={data.email}
					timer={timer}
				/>
			)}
		</div>
	);
}

export default Register;
