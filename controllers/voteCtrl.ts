import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as meetingService from '../services/meetingService';

/** Cast (or switch) a vote on a given slot */
export async function castVoteOnOption(req: Request, res: Response): Promise<void> {
    const optionId = req.params.optionId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const { userId } = req.body;
    try {
        const vote = await meetingService.castVoteOnOption(optionId, userId);
        res.status(201).json({
            voteId: vote.id,
            meetingId: vote.meetingId,
            optionId: vote.optionId,
            userId: vote.userId,
            votedAt: vote.votedAt
        });
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}

/** List all votes for a given slot */
export async function listVotesByOption(req: Request, res: Response): Promise<void> {
    const optionId = req.params.optionId;
    const votes = await meetingService.getVotesByOption(optionId);

    res.json(
        votes.map(v => ({
            voteId: v.id,
            userId: v.userId,
            votedAt: v.votedAt
        }))
    );
}

/** Delete a single vote by ID */
export async function deleteVote(req: Request, res: Response): Promise<void> {
    const { voteId, optionId } = req.params;

    const existing = await meetingService.getVotesByOption(optionId);
    const found = existing.find(v => v.id === voteId);
    if (!found) {
        res.status(404).json({ error: 'Vote not found for this option' });
        return;
    }

    try {
        await meetingService.deleteVoteById(voteId);
        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({ error: err.message });
    }
}
