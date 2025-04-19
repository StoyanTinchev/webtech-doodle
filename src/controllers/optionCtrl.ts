import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import * as meetingService from '../services/meetingService';

export async function addOption(req: Request, res: Response) {
    const meetingId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {date, hour} = req.body;
    try {
        const option = await meetingService.addTimeOption(meetingId, date, hour);
        res.status(201).json(option);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
}