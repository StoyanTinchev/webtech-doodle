import { Router } from 'express';
import * as voteCtrl from '../controllers/voteCtrl';

const router = Router();

router.post('/:id/votes', voteCtrl.castVote);

export default router;