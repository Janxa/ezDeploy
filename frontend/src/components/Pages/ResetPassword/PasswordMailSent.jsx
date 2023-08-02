import Button from "../../Common/Button";

const PasswordMailSent = ({ mail }) => {
	return (
		<div className="mx-auto mt-48 md:mt-32 w-11/12 flex">
			<h1>Update Password Reset</h1>
			<p>
				If your email address {mail} is linked to an account, you'll receive a
				confirmation email within seconds. Check your inbox. If it's not there,
				try your spam folder, try again or reach out to us.
			</p>
			<Button />
			<p></p>
		</div>
	);
};

export default PasswordMailSent;
