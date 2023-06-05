import React from "react";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { contact_schema } from "../joi_schemas/contact_schema";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/react-toastify-custom.css";
import Input from "./Common/Input";
import Button from "./Common/Button";
import emailjs from "@emailjs/browser";
function Contact() {
	const [mail_sender, setmail_sender] = useState("");
	const [mail_content, setmail_content] = useState("");
	const [mail_sender_name, setMail_sender_name] = useState("");
	const [errors, setErrors] = useState({});
	const schema = contact_schema;

	const [mail_service, mail_template, mail_key] = [
		import.meta.env.VITE_MAIL_SERVICE,
		import.meta.env.VITE_MAIL_TEMPLATE,
		import.meta.env.VITE_MAIL_KEY,
	];

	const sendEmail = async (event) => {
		event.preventDefault();
		let new_errors = {};
		let templateParams = {
			mail_sender: mail_sender,
			mail_sender_name: mail_sender_name,
			mail_content: mail_content,
		};
		try {
			await schema.validateAsync(
				{
					mail_sender: mail_sender,
					mail_content: mail_content,
					mail_sender_name: mail_sender_name,
				},
				{ abortEarly: false }
			);
			const res = await toast.promise(
				emailjs.send(mail_service, mail_template, templateParams, mail_key),
				{
					pending: "Loading",
					success: "📧 Your email has been sent !",
					error: "🤯 Error, could not send email ",
				},
				{ theme: "dark" }
			);
			console.log(res);
			setmail_sender("");
			setmail_content("");
			setMail_sender_name("");
		} catch (err) {
			console.log(err);
			err.details.forEach(
				(error) => (new_errors[error.context.label] = error.message)
			);
			setErrors(new_errors);
		}
	};

	// might implement real time error handling
	useEffect(() => {
		console.log("error", errors);
	});
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
				theme="light"
			/>

			<h2 className="bg-flat-700  w-4/5 md:w-1/2 lg:w-11/12 mx-auto text-2xl p-2 font-bold text-center  shadow-md rounded-md m-2">
				Contact
			</h2>
			<form
				onSubmit={sendEmail}
				className=" [&>*]:p-1  bg-flat-700 flex flex-col h-full  w-4/5  md:w-1/2 lg:w-11/12  overflow-hidden  mx-auto p-2 shadow-md rounded-md"
			>
				<p>
					Any question ? Send me an e-mail through this form and i'll answer you
					asap !
				</p>
				<label for="mail_sender" title="So I can answer your mail !">
					Your name :
				</label>
				<Input
					className={errors["mail_sender_name"] ? "input-invalid" : "input"}
					type="text"
					name="username"
					id="mail_sender_name"
					value={mail_sender_name}
					onChange={(e) => setMail_sender_name(e.target.value)}
					errors={errors["mail_sender_name"]}
				/>
				<label for="mail_sender" title="So I can answer your mail !">
					Your email adress :
				</label>
				<Input
					className={errors["mail_sender"] ? "input-invalid" : "input"}
					type="text"
					name="email"
					id="mail_sender"
					value={mail_sender}
					onChange={(e) => setmail_sender(e.target.value)}
					errors={errors["mail_sender"]}
				/>

				<label for="contact_message" title="Cant exceed 10 000 characters">
					Your Message :
				</label>
				<Input
					// className="h-full w-full p-1 pl-8 rounded-sm focus:outline-none focus:bg-jade-200 z-10 text-flat-800 font-medium"
					name="contact_message"
					id="contact_message"
					type="textarea"
					cols="30"
					rows="10"
					value={mail_content}
					onChange={(e) => setmail_content(e.target.value)}
					errors={errors["mail_content"]}
				/>

				<Button
					extraStyle="font-medium text-sm my-2 py-2 rounded-xl w-1/2 m-auto"
					type="submit"
					title="Send Email !"
					onClick={sendEmail}
				/>
			</form>
		</main>
	);
}

export default Contact;
