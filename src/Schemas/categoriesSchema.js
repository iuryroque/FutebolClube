const joi = require('joi');

module.exports = joi.object({
  name: joi.string().required()
    .messages({
    'any.required': '400|"name" is required',
  }),
});
