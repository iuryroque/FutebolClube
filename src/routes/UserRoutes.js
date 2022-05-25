const express = require('express');
const UserController = require('../controllers/UserController');
const { joiValidate,
   checkEmailExist, existsToken, expiredOrIvalidToken } = require('../middlewares/validate');
const userSchema = require('../Schemas/userSchema');

const router = express.Router();

router.post('/', joiValidate(userSchema), checkEmailExist, UserController.create);
router.get('/', existsToken, expiredOrIvalidToken, UserController.getAll);
router.get('/:id', existsToken, expiredOrIvalidToken, UserController.getById);
router.delete('/me', existsToken, expiredOrIvalidToken, UserController.destroy);

module.exports = router;