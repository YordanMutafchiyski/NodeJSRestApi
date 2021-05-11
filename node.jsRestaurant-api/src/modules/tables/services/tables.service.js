const { Op } = require('sequelize');

module.exports = ({ models: { Table } }) => {
  const getTables = () =>
    Table.findAll({
      where: {
        [Op.or]: [{ isDeleted: null }, { isDeleted: 0 }],
      },
    });

  const createTable = async (tableData) => {
    const table = await Table.findOne({
      where: {
        name: tableData.name,
      },
    });

    if (table) {
      throw new Error('A table with that name already exists!');
    }

    return Table.create(tableData);
  };

  const deleteTable = async (id) => {
    const table = await Table.findOne({
      where: {
        id,
      },
    });

    if (!table) {
      throw new Error('A table with that id does not exist!');
    }

    return await table.update({
      isDeleted: true,
    });
  };

  const updateTable = async (id, payload) => {
    const table = await Table.findOne({
      where: {
        id,
      },
      returning: true,
    });
    if (!table) {
      throw new Error('A table with that id does not exist!');
    }
    return table.update(payload);
  };
  return {
    getTables,
    createTable,
    deleteTable,
    updateTable,
  };
};
