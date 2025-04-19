import { Request, Response } from 'express';
import * as meetingService from '../services/meetingService';

export function createMeeting(req: Request, res: Response) {
    const { title, ownerName, dateFrom, dateTo } = req.body;
    try {
        const meeting = meetingService.createMeeting(title, ownerName, dateFrom, dateTo);
        res.status(201).json(meeting);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export function getMeeting(req: Request, res: Response) {
    const meetingId = parseInt(req.params.id, 10);
    const meeting = meetingService.getMeetingById(meetingId);
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });
    const summary = meetingService.getVotesSummary(meetingId);
    res.json({ meeting, votesSummary: summary });
}