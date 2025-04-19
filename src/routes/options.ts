import { Router } from 'express';
import { body, param } from 'express-validator';
import * as optionCtrl from '../controllers/optionCtrl';

const router = Router();

router.post(
    '/:id/options',
    [
        param('id').isUUID(),
        body('date').isISO8601(),
        body('hour').isInt({ min: 0, max: 23 })
    ],
    optionCtrl.addOption
);
export default router;