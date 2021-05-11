const NotFoundError = require('../errors/notFound.error');
const AuthorizationError = require('../errors/authorization.error');
const BadRequest = require('../errors/badRequest.error');

module.exports = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    if (
      error instanceof BadRequest ||
      error instanceof AuthorizationError ||
      error instanceof NotFoundError
    ) {
      res.status(error.statusCode).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: 'Something went wrong!',
      });
    }
  }
};
