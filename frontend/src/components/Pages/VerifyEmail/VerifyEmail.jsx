import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { EmailVerificationSchema } from "./EmailVerification_schema";
import axios from "axios";
import VerifyEmailForm from "./VerifyEmailForm";
import AuthService from "../../../services/authentification.service";
import Success from "./Success";
import ResendVerifyEmail from "./ResendVerifyEmail";
function EmailVerificationForm() {
	const Code = useParams();
	const [verificationCode, setVerificationCode] = useState(
		Object.keys(Code).length !== 0 ? Code.verificationCode : ""
	);
	const [errors, setErrors] = useState(false);
	const [resendUserId, setResendUserId] = useState(false);
	const [verified, setVerified] = useState(null);
	const [loading, setLoading] = useState(false);
	const schema = EmailVerificationSchema;

	const handleChange = ({ currentTarget: input }) => {
		setErrors(false);
		setVerificationCode(input.value);
	};
	const handleResend = async (event) => {
		event.preventDefault();
		setLoading(true);
		await AuthService.sendNewEmailToken({ user_id: resendUserId });
		setResendUserId(false);
		setLoading(false);
		return;
	};
	const handleSubmit = async (event) => {
		setLoading(true);
		let error = {};
		event.preventDefault();
		try {
			await schema.validateAsync({ code: verificationCode });
		} catch (error) {
			error = error.message;
			setErrors(error);
			setLoading(false);
			return;
		}
		try {
			let res = await axios.get(
				`/api/authentification/verify/${verificationCode}`
			);
			setVerified(res.data);
		} catch (e) {
			if (e.response.status == 500)
				error = "No response, server might be offline, try again later";
			if (e.response.status == 401) {
				let user_id = e.response.data.user_id;
				setResendUserId(user_id);
				setLoading(false);

				return;
			} else error = e.response.data.error;
			setErrors(error);
			setLoading(false);
			return;
		}
		setLoading(false);
	};
	const content = () => {
		if (!verified) {
			if (!resendUserId)
				return (
					<VerifyEmailForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						verificationCode={verificationCode}
						resendUserId={resendUserId}
						errors={errors}
						loading={loading}
					/>
				);
			else
				return (
					<ResendVerifyEmail handleResend={handleResend} isLoading={loading} />
				);
		}
		return <Success />;
	};
	return (
		<main className="mx-auto mt-48 md:mt-32 w-11/12 flex">{content()}</main>
	);
}

export default EmailVerificationForm;
