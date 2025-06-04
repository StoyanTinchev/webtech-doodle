import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as meetingService from '../services/meetingService';

/** Add a new time‐slot under a given meeting */
export async function addOption(req: Request, res: Response): Promise<void> {
    const meetingId = req.params.meetingId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array()[0].msg });
        return;
    }

    const { date, hour } = req.body;
    try {
        const option = await meetingService.addTimeOption(meetingId, date, hour);
        res.status(201).json({
            optionId: option.id,
            date: option.date,
            hour: option.hour,
            voteCount: 0,
            _links: {
                self: `/api/options/${option.id}`,
                votes: `/api/options/${option.id}/votes`
            }
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

/** List all slots for a meeting (each with voteCount) */
export async function listOptions(req: Request, res: Response): Promise<void> {
    const meetingId = req.params.meetingId;
  // No need to re‐validate meetingId here (router already checks isMongoId)

  // If the meeting itself doesn’t exist, getOptionsByMeeting will return an empty array.
    const options = await meetingService.getOptionsByMeeting(meetingId);
    const counts = await meetingService.getVoteCountsByOption(meetingId);

    const result = options.map(opt => ({
        optionId: opt.id,
        date: opt.date,
        hour: opt.hour,
        voteCount: counts.get(opt.id) || 0,
        _links: {
            self: `/api/options/${opt.id}`,
            votes: `/api/options/${opt.id}/votes`
        }
    }));

    res.json(result);
}

/** Get a single slot by its ID (with voteCount + links) */
export async function getOptionById(req: Request, res: Response): Promise<void> {
    const optionId = req.params.optionId;
  // No need to re‐validate optionId here (router already checks isMongoId)

    const opt = await meetingService.getOptionById(optionId);

    if (!opt) {
        res.status(404).json({ error: 'Option not found' });
        return;
    }

    // Get how many votes this slot has
    const counts = await meetingService.getVoteCountsByOption(opt.meetingId);
    const count = counts.get(optionId) || 0;

    res.json({
        optionId: opt.id,
        meetingId: opt.meetingId,
        date: opt.date,
        hour: opt.hour,
        voteCount: count,
        _links: {
            votes: `/api/options/${opt.id}/votes`
        }
    });
}

/** Delete one slot (and all its votes) */
export async function deleteOption(req: Request, res: Response): Promise<void> {
    const meetingId = req.params.meetingId;
    const optionId = req.params.optionId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ error: errors.array()[0].msg });
        return;
    }

    try {
        await meetingService.deleteTimeOption(meetingId, optionId);
        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}
