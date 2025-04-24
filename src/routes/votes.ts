import {Router} from 'express';
import {body, param} from 'express-validator';
import * as voteCtrl from '../controllers/voteCtrl';

const router = Router();

router.post(
    '/:id/votes',
    [
        param('id').isUUID(),
        body('optionId').isUUID(),
        body('userName').isString().notEmpty()
    ],
    voteCtrl.castVote
);

router.get(
    '/:id/votes',
    [param('id').isUUID()],
    voteCtrl.listVotes
);

router.get(
    '/:id/votes/summary',
    [param('id').isUUID()],
    voteCtrl.getSummary
);
export default router;