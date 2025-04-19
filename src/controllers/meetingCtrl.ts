import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as meetingService from '../services/meetingService';

export function createMeeting(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, ownerName, dateFrom, dateTo } = req.body;
  try {
    const meeting = meetingService.createMeeting(title, ownerName, dateFrom, dateTo);
    res.status(201).json(meeting);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export function getMeeting(req: Request, res: Response) {
  const meetingId = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const meeting = meetingService.getMeetingById(meetingId);
  if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
  const votesSummary = meetingService.getVotesSummary(meetingId);
  res.json({ meeting, votesSummary });
}