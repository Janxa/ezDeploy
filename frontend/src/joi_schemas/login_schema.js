import Joi from "joi";

const loginSchema = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			"string.email": "Please enter a valid email address",
			"string.empty": "Please insert an email",
		}),
	password: Joi.string()
		.pattern(new RegExp("^[ a-zA-Z0-9!@#$%^&*()_+-=[\\]'\"{};:,.<>/?]+$"))
		.required()
		.messages({
			"string.pattern.base": "Password contain invalid characters",
			"string.empty": "Password is required",
		}),
});

export { loginSchema };
