const express = require('express');
const LoginController = require('../controllers/LoginController');
const { joiValidate, checkEmpty } = require('../middlewares/validate');
const loginSchema = require('../Schemas/loginSchema');

const router = express.Router();

router.post('/', checkEmpty, joiValidate(loginSchema), LoginController.login);

module.exports = router;