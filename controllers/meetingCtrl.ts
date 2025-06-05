import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import * as meetingService from '../services/meetingService';

export async function createMeeting(
    req: Request,
    res: Response
): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({error: errors.array()[0].msg});
        return;
    }

    const {title, ownerId, dateFrom, dateTo} = req.body;
    try {
        const meeting = await meetingService.createMeeting(title, ownerId, dateFrom, dateTo);
        res.status(201).json(meeting);
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
}

// ?includeVotes=ture
export async function getMeeting(req: Request, res: Response): Promise<void> {
    const meetingId = req.params.id;

    const meeting = await meetingService.getMeetingById(meetingId);
    if (!meeting) {
        res.status(404).json({error: 'Meeting not found'});
        return;
    }

    const includeVotes = req.query.includeVotes === 'true';

    // 1) fetch all slots for this meeting
    const options = await meetingService.getOptionsByMeeting(meetingId);

    // 2) fetch vote counts per slot
    const counts = await meetingService.getVoteCountsByOption(meetingId);

    // 3) merge into the desired shape
    const optionsWithCounts = await Promise.all(
        options.map(async (opt) => {
            const base: any = {
                optionId: opt.id,
                date: opt.date,
                hour: opt.hour,
                voteCount: counts.get(opt.id) || 0,
                _links: {
                    self: `/api/options/${opt.id}`,
                    votes: `/api/options/${opt.id}/votes`
                }
            };

            if (includeVotes) {
                // fetch all votes for this option if requested
                base.votes = await meetingService.getVotesByOptionWithUserInformation(opt.id);
            }

            return base;
        })
    );

    // Respond with the meeting + embedded options array
    res.json({
        meetingId: meeting.id,
        title: meeting.title,
        ownerId: meeting.ownerId,
        dateFrom: meeting.dateFrom,
        dateTo: meeting.dateTo,
        options: optionsWithCounts
    });
}

// Notes:
//
// The request body for POST /api/meetings now must include a valid ownerId (e.g. the authenticated user’s id).
// GET /api/meetings/:id by default returns:
// {
//   "meetingId": "...",
//   "title": "...",
//   "ownerId": "...",
//   "dateFrom": "2025-06-10",
//   "dateTo": "2025-06-20",
//   "options": [
//     {
//       "optionId": "abc",
//       "date": "2025-06-11",
//       "hour": 14,
//       "voteCount": 3,
//       "_links": { "self": "/api/options/abc", "votes": "/api/options/abc/votes" }
//     },
//     ...
//   ]
// }
// If appended ?includeVotes=true, then each option object also has a "votes":[ { voteId, userId, votedAt }, … ] array.
