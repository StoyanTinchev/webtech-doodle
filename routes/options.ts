import { Router } from 'express';
import { body, param } from 'express-validator';
import * as optionCtrl from '../controllers/optionCtrl';

const router = Router();

// Create a new slot under meeting {meetingId}
router.post(
    '/:meetingId/options',
    [
        param('meetingId').isMongoId().withMessage('Invalid meeting ObjectID'),
        body('date').isISO8601(),
        body('hour').isInt({ min: 0, max: 23 })
    ],
    optionCtrl.addOption
);

// List all slots for a meeting
router.get(
    '/:meetingId/options',
    [param('meetingId').isMongoId().withMessage('Invalid meeting ObjectID')],
    optionCtrl.listOptions
);

// Get details of a single slot by optionId
router.get(
    '/options/:optionId',
    [param('optionId').isMongoId().withMessage('Invalid option ObjectID')],
    optionCtrl.getOptionById
);

// Delete one slot (and its votes)
router.delete(
    '/:meetingId/options/:optionId',
    [
        param('meetingId').isMongoId().withMessage('Invalid meeting ObjectID'),
        param('optionId').isMongoId().withMessage('Invalid option ObjectID')
    ],
    optionCtrl.deleteOption
);

export default router;
