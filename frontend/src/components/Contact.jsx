import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { contact_schema } from "../joi_schemas/contact_schema";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/react-toastify-custom.css";
import Input from "./Common/Input/Input";
import Textarea from "./Common/Input/Textarea";
import Button from "./Common/Button";
import emailjs from "@emailjs/browser";
import { faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
function Contact() {
	const [data, setData] = useState({
		mail_sender: "",
		mail_sender_name: "",
		mail_content: "",
	});
	const [errors, setErrors] = useState({});
	const schema = contact_schema;

	const [mail_service, mail_template, mail_key] = [
		import.meta.env.VITE_MAIL_SERVICE,
		import.meta.env.VITE_MAIL_TEMPLATE,
		import.meta.env.VITE_MAIL_KEY,
	];

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

	const verifyFields = (templateParams) => {
		const result = schema.validate(templateParams, { abortEarly: false });
		let new_errors = {};
		result.error?.details.forEach(
			(error) => (new_errors[error.context.label] = error.message)
		);
		setErrors(new_errors);
		return new_errors;
	};
	const sendEmail = async (templateParams) => {
		const res = await toast.promise(
			emailjs.send(mail_service, mail_template, templateParams, mail_key),
			{
				pending: "Loading",
				success: "📧 Your email has been sent!",
				error: "🤯 Error, could not send email",
			},
			{ theme: "dark" }
		);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		let templateParams = {
			mail_sender: data["mail_sender"],
			mail_sender_name: data["mail_sender_name"],
			mail_content: data["mail_content"],
		};

		let new_errors = verifyFields(templateParams);
		if (Object.keys(new_errors).length === 0) {
			try {
				sendEmail(templateParams);
				setData({ mail_sender: "", mail_sender_name: "", mail_content: "" });
			} catch (err) {
				let new_errors = {};
				if (err.details) {
					err.details.forEach(
						(error) => (new_errors[error.context.label] = error.message)
					);
				} else {
					new_errors.general = "An error occurred while sending the email.";
				}
				setErrors(new_errors);
			}
		}
	};
	return (
		<main className="mt-28 md:mt-32 w-11/12 m-auto flex  flex-col">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<h2 className="bg-flat-700  w-4/5 md:w-1/2 lg:w-11/12 mx-auto text-2xl p-2 font-bold text-center  shadow-md rounded-md m-2">
				Contact
			</h2>
			<form className=" [&>*]:p-1  bg-flat-700 flex flex-col h-full  w-4/5  md:w-1/2 lg:w-11/12  overflow-hidden  mx-auto p-2 shadow-md rounded-md">
				<p>
					Any question ? Send me an e-mail through this form and i'll answer you
					asap !
				</p>
				<label for="mail_sender_name" title="So I can answer your mail !">
					Your name :
				</label>
				<Input
					type="text"
					icon={faUser}
					name="mail_sender_name"
					id="mail_sender_name"
					value={data["mail_sender_name"]}
					onChange={handleChange}
					errors={errors["mail_sender_name"]}
				/>
				<label for="mail_sender" title="So I can answer your mail !">
					Your email adress :
				</label>
				<Input
					type="email"
					icon={faEnvelope}
					name="mail_sender"
					id="mail_sender"
					value={data["mail_sender"]}
					onChange={handleChange}
					errors={errors["mail_sender"]}
				/>

				<label for="contact_message" title="Cant exceed 10 000 characters">
					Your Message :
				</label>
				<Textarea
					name="mail_content"
					id="contact_message"
					value={data["mail_content"]}
					onChange={handleChange}
					errors={errors["mail_content"]}
				/>

				<Button
					extraStyle="font-medium text-sm my-2 py-2 rounded-xl w-1/2 m-auto"
					type="submit"
					title="Send Email !"
					onClick={handleSubmit}
				/>
			</form>
		</main>
	);
}

export default Contact;
