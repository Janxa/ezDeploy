import Joi from "joi";

const registerSchema = Joi.object({
	username: Joi.string().alphanum().min(3).max(30).required().messages({
		"string.alphanum": "Username should only countain letters and numbers",
		"string.empty": "Please insert a username",
		"string.min": "Username too short",
		"string.max": "Username too long",
	}),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.max(254)
		.required()
		.messages({
			"string.max": "Email too long",
			"string.email": "Please enter a valid email address",
			"string.empty": "Please insert an email",
		}),
	password: Joi.string()
		.min(8)
		.pattern(new RegExp("^[ a-zA-Z0-9!@#$%^&*()_+-=[\\]'\"{};:,.<>/?]+$"))
		.required()
		.messages({
			"string.pattern.base": "Password contain invalid characters",
			"string.min": "Password must be at least 8 characters long",
			"string.empty": "Password is required",
		}),
});

export { registerSchema };
