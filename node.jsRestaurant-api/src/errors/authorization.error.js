module.exports = class AuthorizationError {
  statusCode = 401;

  message = 'Unauthorized';

  constructor(data) {
    if (!data) {
      return;
    }

    if (typeof data.statusCode === 'number') {
      this.statusCode = data.statusCode;
    }

    if (typeof data.message === 'string') {
      this.message = data.message;
    }
  }
};
