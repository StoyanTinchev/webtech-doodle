import Meeting, { IMeeting } from '../models/meeting';
import TimeOption, { ITimeOption } from '../models/timeOption';
import Vote, { IVote } from '../models/vote';

/** Create a new meeting (caller must supply a valid ownerId) */
export async function createMeeting(
    title: string,
    ownerId: string,
    dateFrom: string,
    dateTo: string
): Promise<IMeeting> {
    const meeting = new Meeting({ title, ownerId, dateFrom, dateTo });
    return meeting.save();
}

/** Retrieve a meeting by its ID */
export async function getMeetingById(meetingId: string): Promise<IMeeting | null> {
    return Meeting.findById(meetingId).lean().exec();
}

/** List all time‐options (slots) for a given meeting */
export async function getOptionsByMeeting(meetingId: string): Promise<ITimeOption[]> {
    return TimeOption.find({ meetingId }).lean().exec();
}

/** Get a single TimeOption by its ID */
export async function getOptionById(optionId: string): Promise<ITimeOption | null> {
    return TimeOption.findById(optionId).lean().exec();
}

/** Get vote‐counts grouped by optionId (Map<optionId → count>) for an entire meeting */
export async function getVoteCountsByOption(meetingId: string): Promise<Map<string, number>> {
    const raw = await Vote.aggregate([
        { $match: { meetingId } },
        { $group: { _id: '$optionId', count: { $sum: 1 } } }
    ]);
    const m = new Map<string, number>();
    raw.forEach((r: { _id: string; count: number }) => {
        m.set(r._id, r.count);
    });
    return m;
}

/** Add a time‐slot to a meeting, ensuring it falls within [dateFrom, dateTo] */
export async function addTimeOption(
    meetingId: string,
    date: string,
    hour: number
): Promise<ITimeOption> {
    const meeting = await Meeting.findById(meetingId).exec();
    if (!meeting) throw new Error('Meeting not found');

    const optionDate = new Date(date);
    const start = new Date(meeting.dateFrom);
    const end = new Date(meeting.dateTo);

    if (optionDate < start || optionDate > end) {
        throw new Error(
            `Option date ${date} is outside meeting range (${meeting.dateFrom} to ${meeting.dateTo})`
        );
    }

    // Check if a slot for this meeting/date/hour already exists
    const existing = await TimeOption.findOne({ meetingId, date, hour }).exec();
    if (existing) {
        throw new Error(`Slot for ${date} at hour ${hour} already exists`);
    }

    const slot = new TimeOption({ meetingId, date, hour });
    return slot.save();
}

/** Delete a slot and all its associated votes */
export async function deleteTimeOption(
    meetingId: string,
    optionId: string
): Promise<void> {
    // Verify the slot belongs to this meeting
    const slot = await TimeOption.findById(optionId).exec();
    if (!slot || slot.meetingId !== meetingId) {
        throw new Error('Option not found in this meeting');
    }

    await TimeOption.findByIdAndDelete(optionId).exec();
    await Vote.deleteMany({ meetingId, optionId }).exec();
}

/** Cast (or “switch”) a vote on a slot, enforcing one vote per user per meeting */
export async function castVoteOnOption(
    optionId: string,
    userId: string
): Promise<IVote> {
    // 1. Fetch the slot to learn its meetingId
    const slot = await TimeOption.findById(optionId).exec();
    if (!slot) throw new Error('Option not found');

    const meetingId = slot.meetingId;

    // 2. If this user already voted anywhere in that meeting, remove their old vote:
    const existing = await Vote.findOne({ meetingId, userId }).exec();
    if (existing) {
        await Vote.findByIdAndDelete(existing.id).exec();
    }

    // 3. Save the new vote
    const vote = new Vote({ meetingId, optionId, userId });
    return vote.save();
}

/** List all Vote documents for a given slot (option) */
export async function getVotesByOption(optionId: string): Promise<IVote[]> {
    return Vote.find({ optionId }).lean().exec();
}

/** (Optional) Delete a single vote by its ID */
export async function deleteVoteById(voteId: string): Promise<void> {
    await Vote.findByIdAndDelete(voteId).exec();
}
