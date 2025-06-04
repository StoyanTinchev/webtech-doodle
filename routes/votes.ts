import { Router } from 'express';
import { body, param } from 'express-validator';
import * as voteCtrl from '../controllers/voteCtrl';

const router = Router();

// Cast a new vote on a given slot
router.post(
    '/options/:optionId/votes',
    [
        param('optionId').isMongoId().withMessage('Invalid option ObjectID'),
        body('userId').isString().isMongoId().withMessage('Invalid userId')
    ],
    voteCtrl.castVoteOnOption
);

// List all votes for a slot
router.get(
    '/options/:optionId/votes',
    [param('optionId').isMongoId().withMessage('Invalid option ObjectID')],
    voteCtrl.listVotesByOption
);

// Delete one vote by ID
router.delete(
    '/options/:optionId/votes/:voteId',
    [
        param('optionId').isMongoId().withMessage('Invalid option ObjectID'),
        param('voteId').isMongoId().withMessage('Invalid vote ObjectID')
    ],
    voteCtrl.deleteVote
);

export default router;
