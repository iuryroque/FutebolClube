const { User } = require('../database/models');

const checkEmailExist = async (email) => {
  const emailExists = await User.findOne({ where: { email } });
  return emailExists;
};

/* const existPost = async (userId, Id) => {
  const novo = Number(Id);
  const post = await BlogPosts.findByPk(novo);
  
  if (!post) {
    const [status, message] = [404, 'Post does not exist'];
    return [status, message];
  }

  return post;
}; */

module.exports = {
  checkEmailExist,
  // existPost,
};
