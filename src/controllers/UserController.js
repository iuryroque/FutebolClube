const UserService = require('../services/UserService');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await UserService.create(displayName, email, password, image);
    return res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const userList = await UserService.getAll();
    return res.status(200).json(userList);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getById(id);
    if (user !== null) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'User does not exist' });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { userId } = req;
    await UserService.destroy(userId);
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
