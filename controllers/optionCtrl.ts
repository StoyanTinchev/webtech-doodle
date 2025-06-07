import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as meetingService from '../services/meetingService';

/**
 * Add a new time‐slot under a given meeting.
 *
 * @param[in]  req  Express request (param `meetingId`, body `date`, `hour`).
 * @param[in]  res  Express response with created option.
 * @return           void
 *
 * @throws 400 on validation or business error.
 */
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
                self: `/api/meetings/options/${option.id}`,
                votes: `/api/meetings/options/${option.id}/votes`
            }
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

/**
 * List all time‐slots for a meeting (each with vote counts).
 *
 * @param[in]  req  Express request (param `meetingId`).
 * @param[in]  res  Express response with array of options.
 * @return           void
 */
export async function listOptions(req: Request, res: Response): Promise<void> {
    const meetingId = req.params.meetingId;

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

/**
 * Get one time‐slot by ID (with voteCount and links).
 *
 * @param[in]  req  Express request (param `optionId`).
 * @param[in]  res  Express response with option details.
 * @return           void
 *
 * @throws 404 if option not found.
 */
export async function getOptionById(req: Request, res: Response): Promise<void> {
    const optionId = req.params.optionId;

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

/**
 * Delete a time‐slot (and all its votes).
 *
 * @param[in]  req  Express request (params `meetingId`, `optionId`).
 * @param[in]  res  Express response (204 on success).
 * @return           void
 *
 * @throws 400 on validation or business error.
 */
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
