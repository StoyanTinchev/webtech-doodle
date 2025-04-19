import { Router } from 'express';
import * as meetingCtrl from '../controllers/meetingCtrl';

const router = Router();

router.post('/', meetingCtrl.createMeeting);
router.get('/:id', meetingCtrl.getMeeting);

export default router;