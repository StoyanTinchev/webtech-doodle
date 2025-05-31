import {Router} from 'express';
import {body, param} from 'express-validator';
import * as voteCtrl from '../controllers/voteCtrl';

const router = Router();

router.post(
    '/:id/votes',
    [
        param('id').isMongoId().isMongoId().withMessage('Invalid param meeting ObjectID'),
        body('optionId').isMongoId().isMongoId().withMessage('Invalid body param option ObjectID'),
        body('userName').isString().notEmpty()
    ],
    voteCtrl.castVote
);

router.get(
    '/:id/votes',
    [param('id').isMongoId().withMessage('Invalid param meeting ObjectID')],
    voteCtrl.listVotes
);

router.get(
    '/:id/votes/summary',
    [param('id').isMongoId().isMongoId().withMessage('Invalid param meeting ObjectID')],
    voteCtrl.getSummary
);
export default router;