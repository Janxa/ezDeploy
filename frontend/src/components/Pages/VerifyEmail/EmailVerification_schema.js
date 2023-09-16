import Joi from "joi";

const EmailVerificationSchema = Joi.object({
	code: Joi.string().length(32).required().messages({
		"string.required": "Token is required",
		"any.invalid": "Token is invalid",
	}),
});

export { EmailVerificationSchema };
