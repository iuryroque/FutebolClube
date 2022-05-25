const joi = require('joi');

module.exports = joi.object({
  email: joi.string().email().required()
    .messages({
    'any.required': '400|"email" is required',
  }),
  password: joi.string().required()
  .messages({
    'any.required': '400|"password" is required',
  }),
});
