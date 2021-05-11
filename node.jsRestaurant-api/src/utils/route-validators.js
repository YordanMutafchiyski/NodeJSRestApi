const JoiValidation = require('express-joi-validation');
const Validation = JoiValidation.createValidator({});

module.exports = (route) => {
  const validators = [];

  if (route.body) {
    validators.push(
      Validation.body(route.body, {
        joi: {
          stripUnknown: true,
          convert: true,
        },
      })
    );
  }

  if (route.query) {
    validators.push(
      Validation.body(route.query, {
        joi: {
          stripUnknown: true,
          convert: true,
        },
      })
    );
  }

  return validators;
};
