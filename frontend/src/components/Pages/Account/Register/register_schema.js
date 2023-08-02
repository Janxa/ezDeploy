import Joi from "joi";
import Schema from "../../../JOI/schema";

const registerSchema = Joi.object({
	email: Schema.email,
	password: Schema.password,
	username: Schema.username,
});
export { registerSchema };
