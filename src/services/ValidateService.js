const { User, BlogPost } = require('../database/models');

const checkEmailExist = async (email) => {
  const emailExists = await User.findOne({ where: { email } });
  return emailExists;
};

const PostNotExist = async (id) => {
  const post = await BlogPost.findByPk(Number(id));
  return post;
};

module.exports = {
  checkEmailExist,
  PostNotExist,
};
