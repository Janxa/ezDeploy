import Joi from "joi";

const Schema = {
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
		.max(32)
		.pattern(new RegExp("^[ a-zA-Z0-9!@#$%^&*()_+-=[\\]'\"{};:,.<>/?]+$"))
		.required()
		.messages({
			"string.pattern.base": "Password contain invalid characters",
			"string.min": "Password must be at least 8 characters long",
			"string.max": "Password must shorter than 32 characters",

			"string.empty": "Password is required",
		}),
	username: Joi.string().alphanum().min(3).max(30).required().messages({
		"string.alphanum": "Username should only countain letters and numbers",
		"string.empty": "Please insert a username",
		"string.min": "Username too short",
		"string.max": "Username too long",
	}),
};

export default Schema;
