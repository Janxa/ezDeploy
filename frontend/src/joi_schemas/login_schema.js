
import Joi from 'joi';

  const loginSchema = Joi.object({
    email: Joi.string().email({tlds:{allow: false }}).required().messages({
    "string.email": "Please enter a valid email address",
    "string.empty": "Please insert an email",
    }),
    password: Joi.string().min(8)
    .pattern(new RegExp("^[ a-zA-Z0-9!@#$%^&*()_+\-=\[\\]'\"{};:,.<>\/?]+$")).required().messages({
    'string.pattern.base': 'Password contain invalid characters',
    'string.min':'Password must be at least 8 characters long',
    'string.empty': 'Password is required'
    }),
  });

  export {loginSchema};
  //^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};:'",.<>\/?]*$