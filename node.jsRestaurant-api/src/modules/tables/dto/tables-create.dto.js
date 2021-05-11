const Joi = require('joi');


const createTablesDTO = Joi.object({
  name: Joi.string().required(),
  capacity: Joi.string().required(),
  location: Joi.string(),
  
});

module.exports = createTablesDTO;