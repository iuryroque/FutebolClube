const express = require('express');
const { joiValidate, existsToken, expiredOrIvalidToken } = require('../middlewares/validate');
const CategorieController = require('../controllers/CategoriesController');
const categoriesSchema = require('../Schemas/categoriesSchema');

const router = express.Router();

router.post('/',
  joiValidate(categoriesSchema), existsToken, expiredOrIvalidToken, CategorieController.create);
router.get('/', existsToken, expiredOrIvalidToken, CategorieController.getAll);

module.exports = router;