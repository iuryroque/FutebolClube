import { Router } from 'express';
import { tokenValidation } from '../utils/Validations';
import MatchesController from '../controllers/MatchesController';

const router = Router();

router.get('/', MatchesController.redirect);
router.post('/', tokenValidation, MatchesController.createMatches);
router.patch('/:id/finish', MatchesController.finish);
router.patch('/:id', tokenValidation, MatchesController.alterMatches);

export default router;