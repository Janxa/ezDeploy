import { useState } from "react";
import { loginSchema } from "./login_schema";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import Button from "../../../Common/Button";
import Input from "../../../Common/Input/Input";
import { useAuth } from "../../../../context/AuthProvider";
import { Link } from "react-router-dom";
import AuthService from "../../../../services/authentification.service";
function Login({ data, setData, formSwitch, loading, setLoading }) {
	const [errors, setErrors] = useState({});
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
	const handleResend = async (event) => {
		event.preventDefault();
		setLoading(true);
		console.log(data.email);
		await AuthService.sendNewEmailToken({ email: data.email });
		setLoading(false);
		return;
	};

	const handleLogin = async (event) => {
		setLoading(true);
		{
			event.preventDefault();
			let errors = {};

			const validationResult = schema.validate(
				{ email: data.email, password: data.password },
				{ abortEarly: false }
			);
			if (validationResult.error) {
				console.log(validationResult.error.details);
				const error_list = { ...errors };

				for (let error of validationResult.error.details) {
					error_list[error.context.label] = error.message;
				}

				setErrors(error_list);
				setLoading(false);

				return;
			}

			try {
				await login(data["email"].toLowerCase(), data["password"]);
				navigate("/app/dashboard");
			} catch (error) {
				console.log("Hey ! Login error:", error);
				console.log(
					error.response.data["error"],
					error.response.data["error"] == "User not validated"
				);
				if (error.response.status == 500) {
					errors["request"] =
						"Server Error. Check your connexion or try again later";
				} else if (error.response.data.error) {
					errors["request"] = error.response.data.error;
					console.log(errors);
				} else {
					errors["request"] = error.request.statusText;
					console.log(errors);
				}
				setErrors(errors);
				setLoading(false);
				return;
			}
		}
		setLoading(false);
	};

	return (
		<div className="flex flex-col ">
			<form onSubmit={handleLogin} noValidate className="flex flex-col p-5 ">
				<h2 className="font-bold text-2xl text-flat-100  self-center">
					Log in
				</h2>
				<label htmlFor="email" className="font-medium text-sm py-1">
					Email:
				</label>
				<Input
					icon={faEnvelope}
					onChange={handleChange}
					value={data.email}
					type="email"
					name="email"
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

				<Button type="submit" loading={loading} title="Log in" />

				{errors["request"] && (
					<ErrorMessage
						message={errors["request"]}
						onButtonClick={handleResend}
					/>
				)}
				<div className="self-end flex">
					<p className="text-sm font-light">No account yet ? </p>
					<button
						className=" font-medium text-sm  ml-2 text-lila-300 underline  hover:text-lila-200  transition-colors duration-75"
						onClick={() => formSwitch("register")}
					>
						Sign up
					</button>
				</div>
			</form>
		</div>
	);
}

export default Login;
