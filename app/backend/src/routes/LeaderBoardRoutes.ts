import { Router } from 'express';
import { loginValidation } from '../utils/Validations';
import LeaderBoardController from '../controllers/LeaderBoardController';


const router = Router();

router.get('/home', LeaderBoardController.getHomeBoard);
router.get('/away', LeaderBoardController.getAwayBoard);
router.get('/', LeaderBoardController.getAllBoard);

export default router;