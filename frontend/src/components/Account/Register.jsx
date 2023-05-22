import { useState } from "react";
import { registerSchema } from "../../joi_schemas/register_schema";
import AuthService from "../../services/authentification.service";
import Input from "../Common/Input.jsx";
import Button from "../Common/Button";
import EmailVerificationMessage from "../EmailVerificationMessage";
import axios from "axios";
function Register(props) {
	const [data, setData] = useState({ username: "", email: "", password: "" });
	const [errors, setErrors] = useState({});
	const [emailsent, setEmailsent] = useState(false);
	const [emailresent, setEmailResent] = useState(false);
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
			console.log(data, [input.name], input.value);
			return {
				...data,
				[input.name]: input.value,
			};
		});
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		let errors = {};
		const validationResult = schema.validate(data, { abortEarly: false });
		if (validationResult.error) {
			// Validation failed
			console.error(validationResult.error.details);
			const error_list = { ...errors };

			for (let error of validationResult.error.details) {
				error_list[error.context.label] = error.message;
			}

			setErrors(error_list);
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
	};
	const resendEmail = async () => {
		try {
			const res = await axios.post("/api/authentification/resend", {
				email: data["email"],
			});
			setEmailResent(true);
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
				<form onSubmit={handleSubmit} className="flex flex-col p-5 ">
					<h2 className="font-bold text-2xl text-color-yellow-primary  self-center ">
						Register
					</h2>
					<label for="username" className="font-medium text-sm py-1">
						Username:
					</label>
					<Input
						onChange={handleChange}
						value={data.username}
						type="text"
						name="username"
						id="username_input"
						valid={errors["username"] ? false : true}
						errors={errors["username"]}
					/>

					<label for="email" className="text-sm font-medium py-1">
						Email:{" "}
					</label>

					<Input
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
						disabled={
							data.email && data.password && data.username ? false : true
						}
					/>
					<p className="text-sm font-light self-center mt-2 ">
						Already got an account ?
					</p>
					<button
						className="font-medium   underline  decoration-dashed  "
						onClick={() => props.formSwitch("login")}
					>
						Sign in
					</button>
				</form>
			) : (
				<EmailVerificationMessage
					resendEmail={resendEmail}
					email={data.email}
				/>
			)}
		</div>
	);
}

export default Register;
