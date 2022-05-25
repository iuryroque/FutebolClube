const PostsService = require('../services/PostsService');
const categoriesService = require('../services/CategoriesService');

const create = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;

    const { userId } = req;

    const categoriesList = await categoriesService.getAll();

    let categoryExists = true;

    categoryIds.forEach((categoryId) => {
    const findCategory = categoriesList.find((category) => categoryId === category.id);

    if (!findCategory) categoryExists = false;
    });

    if (categoryExists === false) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }

    const { dataValues } = await PostsService.create(title, content, userId, categoryIds);
    return res.status(201).json(dataValues);    
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
  const { userId } = req;
  const postList = await PostsService.getAll(userId);
  return res.status(200).json(postList);    
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
  const { userId } = req;
  const { id } = req.params;
  const postList = await PostsService.getById(userId, id);
  if (postList !== null) {
    return res.status(200).json(postList);    
  }
  return res.status(404).json({ message: 'Post does not exist' });  
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
  const { userId } = req;
  const { id } = req.params;
  const post = await PostsService.destroy(userId, id);
  if (!post) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  return res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  destroy,
};
