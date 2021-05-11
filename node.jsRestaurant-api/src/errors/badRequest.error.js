module.exports = class BadRequest {
  statusCode = 400;

  message = 'Bad request';

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
