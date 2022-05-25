const joi = require('joi');

module.exports = joi.object({
  displayName: joi.string().required().min(8)
    .messages({
    'any.required': '400|"displayName" is required',
    'string.min': '400|"displayName" length must be at least 8 characters long',
    'string.empty': '409|"displayName" already exists',
  }),
  email: joi.string().email().required()
    .messages({
    'any.required': '400|"email" is required',
    'string.email': '400|"email" must be a valid email',
  }),
  password: joi.string().required().min(6)
  .messages({
    'string.min': '400|"password" length must be at least 6 characters long',
    'any.required': '400|"password" is required',
  }),
  image: joi.string(),
});
