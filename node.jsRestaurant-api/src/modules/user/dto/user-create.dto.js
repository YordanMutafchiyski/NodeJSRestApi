const Joi = require('joi');

const createUserDTO = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  password: Joi.required()
});

module.exports = createUserDTO;
