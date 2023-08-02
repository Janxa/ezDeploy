import Joi from "joi";
import Schema from "../../JOI/schema";

const resetPasswordSchema = Joi.object({
	email: Schema.email,
});
export { resetPasswordSchema };
