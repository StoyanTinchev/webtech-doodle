import {Router} from 'express';
import {body, param} from 'express-validator';
import * as optionCtrl from '../controllers/optionCtrl';

const router = Router();

router.post(
    '/:id/options',
    [
        param('id').isMongoId().withMessage('Invalid param meeting ObjectID'),
        body('date').isISO8601(),
        body('hour').isInt({min: 0, max: 23})
    ],
    optionCtrl.addOption
);

router.delete(
    '/:id/options/:optionId',
    [
        param('id').isMongoId().withMessage('Invalid param meeting ObjectID'),
        param('optionId').isMongoId().withMessage('Invalid param option ObjectID')
    ],
    optionCtrl.deleteOption
);

export default router;