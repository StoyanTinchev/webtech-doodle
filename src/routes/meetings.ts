import { Router } from 'express';
import { body, param } from 'express-validator';
import * as meetingCtrl from '../controllers/meetingCtrl';

const router = Router();

router.post(
    '/',
    [
        body('title').isString().notEmpty(),
        body('ownerName').isString().notEmpty(),
        body('dateFrom').isISO8601(),
        body('dateTo').isISO8601().custom((val, { req }) => new Date(val) >= new Date(req.body.dateFrom))
    ],
    meetingCtrl.createMeeting
);

router.get(
    '/:id',
    [param('id').isUUID()],
    meetingCtrl.getMeeting
);
export default router;
