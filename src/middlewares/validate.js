require('dotenv').config();
const jwt = require('jsonwebtoken');
const ValidateService = require('../services/ValidateService');

const NOT_EMPTY = ['email', 'password', 'title', 'content'];

// middleware que chama schema validação do joi
const joiValidate = (schema) => (req, res, next) => {
  // Validação nessecaria quando o corpo da requisição é um array
  let error;
  if (req.body[0]) {
    req.body.forEach((sale) => {
      ({ error } = schema.validate(sale));
    });
  } else {
    ({ error } = schema.validate(req.body));
  }

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  next();
};

const checkEmailExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExists = await ValidateService.checkEmailExist(email);
    if (emailExists) {
      res.status(409).json({ message: 'User already registered' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const separaChaves = (body) => {
  const bodyKeys = Object.keys(body);
  return bodyKeys;
};

// Valida os campos vazios de acordo com o que está no array NOT_EMPTY
const checkEmpty = async (req, res, next) => {
  try {
    const { body } = req;
    const bodyKeys = separaChaves(body);
    // console.log('-----------', bodyKeys, '------------');
    
    bodyKeys.forEach((bodyKey) => {
      NOT_EMPTY.forEach((KEY_FOR_NOT_EMPTY) => {
        if (KEY_FOR_NOT_EMPTY.includes(bodyKey) && body[KEY_FOR_NOT_EMPTY] === '') {
          res.status(400).json({ message: 'Some required fields are missing' });
        }
      });
    });
    next();
  } catch (error) {
    next(error);
  }
};

const existsToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const expiredOrIvalidToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const verifyId = jwt.verify(authorization, process.env.JWT_SECRET);    
    req.userId = verifyId.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const PostNotExist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await ValidateService.PostNotExist(id);
    if (!post) {
      res.status(404).json({ message: 'Post does not exist' });
    }
    next();
  } catch (error) {
    return (error);
  }
};

module.exports = {
  joiValidate,
  checkEmailExist,
  existsToken,
  expiredOrIvalidToken,
  PostNotExist,
  checkEmpty,
};
