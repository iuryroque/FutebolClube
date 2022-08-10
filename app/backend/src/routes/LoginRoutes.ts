import { Router } from 'express';
import { loginValidation } from '../utils/Validations';
import LoginController from '../controllers/LoginController';


const router = Router();

router.post('/', loginValidation, LoginController.getUserLogin);
router.get('/validate', LoginController.getUserRole);

export default router;