const { createToken } = require('../middlewares/generateToken');
const { User } = require('../database/models');

const login = async (email, password) => {
  const retorno = await User.findOne({ where: { email } });
  if (retorno === null) {
    return 0;
  }
  if (password !== retorno.password) {
    return 0;
  }
  const token = createToken(retorno.dataValues.id);
  return token;
};

module.exports = {
  login,
};
