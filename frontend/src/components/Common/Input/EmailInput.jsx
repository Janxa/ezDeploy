import Input from "./Input";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EmailInput({ ...props }) {
	return (
		<Input
			{...props}
			type="email"
			icon={<FontAwesomeIcon icon={faEnvelope} className="fa-md" />}
		/>
	);
}

export default EmailInput;
