import Joi from 'joi';

  const verifyEmailSchema = Joi.object({
    code: Joi.string()
          .hex()
          .length(32)
          .required()
          .messages({
            'string.required': 'Token is required',
            'any.invalid': 'Token is invalid' })

  });

  export {verifyEmailSchema};
