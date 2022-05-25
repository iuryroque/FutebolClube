const express = require('express');
const { joiValidate, existsToken,
  expiredOrIvalidToken, checkEmpty, PostNotExist } = require('../middlewares/validate');
const PostsController = require('../controllers/PostsController');
const PostsSchema = require('../Schemas/postsSchema');

const router = express.Router();

router.post('/', checkEmpty, existsToken, 
  expiredOrIvalidToken, joiValidate(PostsSchema), PostsController.create);
router.get('/', 
  existsToken, expiredOrIvalidToken, PostsController.getAll);
router.get('/:id', 
  existsToken, expiredOrIvalidToken, PostsController.getById);
router.delete('/:id', 
  existsToken, expiredOrIvalidToken, PostNotExist, PostsController.destroy);

module.exports = router;