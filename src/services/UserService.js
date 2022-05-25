const { User } = require('../database/models');
const { createToken } = require('../middlewares/generateToken');

const create = async (displayName, email, password, image) => {
  const { dataValues } = await User.create({ displayName, email, password, image });
  const token = createToken(dataValues.id);
  return token;
};

const getAll = async () => {
  const userList = await User.findAll({ attributes: { exclude: ['password'] } });
  return userList;
};

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  return user;
};

const destroy = async (id) => {
  const user = await User.destroy({ where: { id } });
  return user;
};

module.exports = {
  create,
  getAll,
  getById,
  destroy,
};
