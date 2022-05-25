const { BlogPost, Category, User, PostCategory } = require('../database/models');

const create = async (title, content, userId, categoryIds) => {
  const dataValues = await BlogPost.create({ userId, title, content });
  const inserArray = [];
  categoryIds.forEach((categoryId) => {
  // dataValues.id é o id gerado na criação do post
    inserArray.push({ postId: dataValues.id, categoryId });
  });
  // Cria registros a partir de um array de objetos
  await PostCategory.bulkCreate(inserArray);
  return dataValues;
};

const getAll = async (userId) => {
  const posts = await BlogPost.findAll({
    where: { userId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

const getById = async (userId, Id) => {
  const posts = await BlogPost.findOne({
    where: { userId, Id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

const destroy = async (userId, id) => {
  const { dataValues } = await BlogPost.findOne({ where: { id } });
  if (dataValues.userId === userId) {
    const posts = await BlogPost.destroy({ where: { userId, id } });
    return posts;
  }
  return false;
};

module.exports = {
  create,
  getAll,
  getById,
  destroy,
};
