import Joi from "joi";
import Schema from "../../../JOI/schema";

const loginSchema = Joi.object({
	email: Schema.email,
	password: Schema.password,
});

export { loginSchema };
