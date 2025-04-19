import { Request, Response } from 'express';
import * as meetingService from '../services/meetingService';

export function castVote(req: Request, res: Response) {
    const meetingId = parseInt(req.params.id, 10);
    const { optionId, userName } = req.body;
    try {
        const vote = meetingService.castVote(meetingId, optionId, userName);
        res.status(201).json(vote);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}