import joi from 'joi';

export const loginSchema = joi.object({
  email: joi.string().trim().messages({
    'string.email': 'Invalid email format',
    'string.empty': "Can't be empty"
  }),
  password: joi.string().trim().messages({
    'string.empty': "Can't be empty"
  })
});

export const registerSchema = joi.object({
  email: joi.string().trim().min(1).max(50).messages({
    'string.email': 'Invalid email format',
    'string.empty': "Can't be empty"
  }),
  password: joi
    .string()
    .trim()
    .min(5)
    .message('Must be 5 or more characters')
    .max(40)
    .message('Must be 40 characters or less')
    .regex(/[0-9a-zA-Z]*\d[0-9a-zA-Z]*/)
    .message('Must have at least one number')
    .messages({ 'string.empty': "Can't be empty" }),
  repeatPassword: joi
    .string()
    .trim()
    .valid(joi.ref('password'))
    .label('Confirm password')
    .messages({
      'string.empty': 'Password confirmation is required',
      'any.only': 'Password does not match'
    })
});
