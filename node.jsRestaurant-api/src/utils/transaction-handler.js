const connection = require('../database/connection.js');

module.exports = {
  transactionHandler: (transaction, fn, functionArguments) => {
    if (transaction) {
      return Reflect.apply(fn, null, [...functionArguments, transaction]);
    }

    return connection.sequelize.transaction((t) =>
      Reflect.apply(fn, null, [...functionArguments, t])
    );
  },
};
