import { Router } from 'express';
import * as optionCtrl from '../controllers/optionCtrl';

const router = Router();

router.post('/:id/options', optionCtrl.addOption);

export default router;
