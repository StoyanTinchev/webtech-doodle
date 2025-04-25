import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import * as meetingService from '../services/meetingService';

export async function castVote(req: Request, res: Response, next: NextFunction) {
    const meetingId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    }

    const {optionId, userName} = req.body;
    try {
        const vote = await meetingService.castVote(meetingId, optionId, userName);
        res.status(201).json(vote);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
}

export async function listVotes(req: Request, res: Response, next: NextFunction) {
    const meetingId = req.params.id;
    const allVotes = await meetingService.getVotesByMeeting(meetingId);
    res.json(allVotes);
}

export async function getSummary(req: Request, res: Response) {
    const meetingId = req.params.id;
    const summary = await meetingService.getVotesSummary(meetingId);
    res.json(summary);
}