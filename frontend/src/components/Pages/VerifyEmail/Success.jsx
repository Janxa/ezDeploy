import { Link } from "react-router-dom";
const Success = ({ verified }) => {
	return (
		<div className="bg-flat-700  w-3/4 md:w-1/2 lg:w-1/3 m-auto p-5 shadow-md rounded-md flex flex-col ">
			<h2 className="font-bold text-2xl text-chili-500 self-center mb-2">
				Success
			</h2>
			<p>{verified}</p>
			<p>
				You can now
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

export default Success;
