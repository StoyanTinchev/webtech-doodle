import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import * as meetingService from '../services/meetingService';

export async function createMeeting(req: Request, res: Response, next: NextFunction): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    const {title, ownerName, dateFrom, dateTo} = req.body;
    try {
        const meeting = await meetingService.createMeeting(title, ownerName, dateFrom, dateTo);
        res.status(201).json(meeting);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
}

export async function getMeeting(req: Request, res: Response, next: NextFunction): Promise<void> {
    const meetingId = req.params.id;

    const meeting = await meetingService.getMeetingById(meetingId);

    if (!meeting) {
        res.status(404).json({error: 'Meeting not found'});
        return;
    }

    const votesSummary = await meetingService.getVotesSummary(meetingId);
    res.json({meeting, votesSummary});
}