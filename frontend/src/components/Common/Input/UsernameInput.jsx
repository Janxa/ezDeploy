import Input from "./Input";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UsernameInput({ ...props }) {
	return (
		<Input
			{...props}
			type="text"
			icon={<FontAwesomeIcon icon={faUser} className="fa-md" />}
		/>
	);
}

export default UsernameInput;
