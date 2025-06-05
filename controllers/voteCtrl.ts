import {Request, Response} from 'express';
import {validationResult} from 'express-validator';
import * as meetingService from '../services/meetingService';
import {findUserById} from "../models/user";

/** Cast (or switch) a vote on a given slot */
export async function castVoteOnOption(req: Request, res: Response): Promise<void> {
    const optionId = req.params.optionId;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({error: errors.array()[0].msg});
        return;
    }

    // get userId from the authenticated token:
    const userId = (req as any).userId as string;

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
        res.status(400).json({error: err.message});
    }
}

/** List all votes for a given slot */
export async function listVotesByOption(req: Request, res: Response): Promise<void> {
    const optionId = req.params.optionId;

    const votes = await meetingService.getVotesByOptionWithUserInformation(optionId);

    res.json(votes);
}

/** Delete a single vote by ID */
export async function deleteVote(req: Request, res: Response): Promise<void> {
    const {voteId, optionId} = req.params;

    // First, check that the vote actually belongs to this option:
    const allVotes = await meetingService.getVotesByOption(optionId);
    const found = allVotes.find(v => v.id === voteId);
    if (!found) {
        res.status(404).json({error: 'Vote not found for this option'});
        return;
    }

    try {
        await meetingService.deleteVoteById(voteId);
        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({error: err.message});
    }
}
