import Joi from "joi";

const contact_schema = Joi.object({
	mail_sender: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"string.email": "Invalid email",
			"string.empty": "Please insert an email",
		}),
	mail_content: Joi.string().min(20).max(10000).required().messages({
		"string.max": "Your email cant exceed 10 000 characters",
		"string.min": "Your email must be at least 20 characters long",
		"string.empty": "Your message can't be empty",
	}),
});

export { contact_schema };
