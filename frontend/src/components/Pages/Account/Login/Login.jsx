import { useState } from "react";
import { loginSchema } from "./login_schema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEnvelope,
	faTriangleExclamation,
	faKey,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthProvider";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import EmailVerificationMessage from "../Register/EmailVerificationMessage";
import Button from "../../../Common/Button";
import Input from "../../../Common/Input/Input";
import { useAuth } from "../../../../context/AuthProvider";
import { Link } from "react-router-dom";
function Login(props) {
	const [data, setData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState({});
	const [emailSent, setEmailSent] = useState(false);
	const { login } = useAuth();
	const schema = loginSchema;
	const navigate = useNavigate();

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

	const handleLogin = async (event) => {
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
			await login(data["email"], data["password"]);
			console.log("response from login ");
			navigate("/app/dashboard");
		} catch (error) {
			console.log("Login error:", error);
			if (error.response.status == 500) {
				errors["request"] =
					"Server Error. Check your connexion or try again later";
			} else if (error.response.data["Error"] == "Not validated") {
				errors["request"] = (
					<ErrorMessage
						message="Your email has not been validated, please check your emails or "
						onButtonClick={resendEmail}
						buttonContent="Resend one"
					/>
				);
			} else if (error.response) {
				errors["request"] = error.response.data.error;
				console.log(errors);
			} else {
				errors["request"] = error.request.statusText;
				console.log(errors);
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
			setEmailSent(true);
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
		<div className="p-5 ">
			{!emailSent ? (
				<form onSubmit={handleLogin} className="flex flex-col">
					<h2 className="font-bold text-2xl text-flat-100  self-center">
						Log in
					</h2>
					<label htmlFor="email" className="font-medium text-sm py-1">
						Email:
					</label>
					<Input
						onChange={handleChange}
						type="email"
						value={data.email}
						name="email"
						icon={faEnvelope}
						id="email"
						valid={errors["email"] ? false : true}
						errors={errors["email"]}
					/>
					<div className="flex justify-between text-sm item-center py-1">
						<label htmlFor="password" className="text-sm font-medium">
							Password:
						</label>
						<Link
							to="../reset-password"
							className=" font-medium  text-lila-300 underline hover:text-lila-200  transition-colors duration-75  "
						>
							Forgot password ?
						</Link>
					</div>
					<Input
						icon={faKey}
						type="password"
						onChange={handleChange}
						value={data.password}
						name="password"
						id="password"
						valid={errors["password"] ? false : true}
						errors={errors["password"]}
					/>

					{errors["request"] && (
						<p className="text-md my-2 text-center w-fulls text-invalid-500 self-center">
							<FontAwesomeIcon icon={faTriangleExclamation} />
							{errors["request"]}
						</p>
					)}
					<Button type="submit" title="Log in" />
					<div className="self-end flex">
						{" "}
						<p className="text-sm font-light   ">No account yet ? </p>
						<button
							className=" font-medium text-sm  ml-2 text-lila-300 underline  hover:text-lila-200  transition-colors duration-75"
							onClick={() => props.formSwitch("register")}
						>
							Sign up
						</button>
					</div>
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

export default Login;
