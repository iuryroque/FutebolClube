require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWTCONFIG = {
  expiresIn: '10000000000000000m',
  algorithm: 'HS256',
};

const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, JWTCONFIG);
  return token;
};

module.exports = {
  createToken,
};
