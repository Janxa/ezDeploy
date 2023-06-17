import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { EmailVerificationSchema } from "./EmailVerification_schema";
import axios from "axios";
import VerifyEmailForm from "./VerifyEmailForm/VerifyEmailForm";

function EmailVerificationForm() {
	const Code = useParams();
	const [verificationCode, setVerificationCode] = useState(
		Object.keys(Code).length !== 0 ? Code.verificationCode : ""
	);
	const [errors, setErrors] = useState({});
	const [verified, setVerified] = useState(null);
	const schema = EmailVerificationSchema;

	const handleChange = ({ currentTarget: input }) => {
		console.log(errors);
		setVerificationCode(input.value);
	};
	const handleSubmit = async (event) => {
		let errors = {};
		event.preventDefault();
		try {
			await schema.validateAsync({ code: verificationCode });
		} catch (error) {
			errors["code"] = "The verification code is incorrect.";
			setErrors(errors);
			return;
		}
		try {
			let res = await axios.get(
				`/api/authentification/verify/${verificationCode}`
			);
			setVerified(res.data);
		} catch (error) {
			console.log("Error :", error);
		}
	};
	const content = () => {
		if (!verified)
			return (
				<VerifyEmailForm
					handleSubmit={handleSubmit}
					handleChange={handleChange}
					verificationCode={verificationCode}
					errors={errors}
				/>
			);
		return (
			<div className="bg-flat-700  w-3/4 md:w-1/2 lg:w-1/3 m-auto p-5 shadow-md rounded-md flex flex-col ">
				<h2 className="font-bold text-2xl text-chili-500 self-center mb-2">
					Success
				</h2>
				<p>{verified}</p>
				<p>
					You can now{" "}
					<Link
						className=" font-medium  text-color-blue-primary underline  decoration-dashed  "
						to="/app/account"
						state={{ disp: "login" }}
					>
						Log in
					</Link>
				</p>
			</div>
		);
	};
	return (
		<main className="mx-auto mt-48 md:mt-32 w-11/12 flex">{content()}</main>
	);
}

export default EmailVerificationForm;
