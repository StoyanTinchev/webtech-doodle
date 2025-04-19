import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as meetingService from '../services/meetingService';

export function castVote(req: Request, res: Response) {
    const meetingId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { optionId, userName } = req.body;
    try {
        const vote = meetingService.castVote(meetingId, optionId, userName);
        res.status(201).json(vote);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

export function listVotes(req: Request, res: Response) {
    const meetingId = req.params.id;
    const allVotes = meetingService.getVotesByMeeting(meetingId);
    res.json(allVotes);
}

export function getSummary(req: Request, res: Response) {
    const meetingId = req.params.id;
    const summary = meetingService.getVotesSummary(meetingId);
    res.json(summary);
}