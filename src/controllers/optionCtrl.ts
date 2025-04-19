import { Request, Response } from 'express';
import * as meetingService from '../services/meetingService';

export function addOption(req: Request, res: Response) {
    const meetingId = parseInt(req.params.id, 10);
    const { date, hour } = req.body;
    try {
        const option = meetingService.addTimeOption(meetingId, date, hour);
        res.status(201).json(option);
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}