const CategoriesServices = require('../services/CategoriesService');

const getAll = async (req, res, next) => {
  try {
    const categories = await CategoriesServices.getAll();
    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const categories = await CategoriesServices.create(name);
    return res.status(201).json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  create,
};
