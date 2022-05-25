const joi = require('joi');

module.exports = joi.object({
  title: joi.string().required()
    .messages({
    'any.required': '400|"title" is required',
  }),
  content: joi.string().required()
  .messages({
    'any.required': '400|"content" is required',
  }),
  categoryIds: joi.required()
  .messages({
    'any.required': '400|"categoryIds" is required',
  }),
});
