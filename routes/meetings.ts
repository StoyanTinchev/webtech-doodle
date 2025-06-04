import {Request, Response, Router} from 'express';
import {body, param} from 'express-validator';
import * as meetingCtrl from '../controllers/meetingCtrl';
import {requireAuth} from '../middleware/authMiddleware';

const router = Router();

router.post(
    '/',
    requireAuth,
    [
        body('title').isString().notEmpty(),
        body('ownerId').isString().isMongoId().withMessage('Invalid ownerId'),
        body('dateFrom').isISO8601(),
        body('dateTo')
            .isISO8601()
            .custom((val, {req}) => new Date(val) >= new Date(req.body.dateFrom))
    ],
    (req: Request, res: Response) => {
        // override ownerId from token rather than client‐provided JSON
        (req.body as any).ownerId = (req as any).userId;
        return meetingCtrl.createMeeting(req, res);
    }
);

router.get(
    '/:id',
    [param('id').isMongoId().withMessage('Invalid meeting ObjectID')],
    meetingCtrl.getMeeting
);

export default router;
