module.exports = class NotFoundError {
  statusCode = 404;

  message = 'Not found';

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
