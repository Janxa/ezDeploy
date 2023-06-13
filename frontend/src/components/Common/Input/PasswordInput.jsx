import Input from "./Input";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PasswordInput({ ...props }) {
	return (
		<Input
			{...props}
			type="password"
			icon={<FontAwesomeIcon icon={faKey} className="fa-md" />}
		/>
	);
}

export default PasswordInput;
