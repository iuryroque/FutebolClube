const { Category } = require('../database/models');

const getAll = async () => {
    const categories = await Category.findAll();
    return categories;
};

const create = async (name) => {
  const categories = await Category.create({ name });
  return categories;
};

module.exports = {
  getAll,
  create,
};
