import Meeting, {IMeeting} from "../models/meeting";
import TimeOption, {ITimeOption} from "../models/timeOption";
import Vote, {IVote} from "../models/vote";

/** Create a new meeting */
export async function createMeeting(
    title: string,
    ownerName: string,
    dateFrom: string,
    dateTo: string
): Promise<IMeeting> {
    const meeting = new Meeting({title, ownerName, dateFrom, dateTo, optionIds: []});
    return meeting.save();
}

/** Retrieve a meeting by its MongoDB _id */
export async function getMeetingById(meetingId: string): Promise<IMeeting | null> {
    return Meeting.findById(meetingId).exec();
}

/** Add a time option (date+hour) to a meeting, enforcing date range */
export async function addTimeOption(
    meetingId: string,
    date: string,
    hour: number
): Promise<ITimeOption> {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) throw new Error('Meeting not found');

    const optionDate = new Date(date);
    const startDate = new Date(meeting.dateFrom);
    const endDate = new Date(meeting.dateTo);

    // Check if option date is within meeting range (inclusive)
    if (optionDate < startDate || optionDate > endDate) {
        throw new Error(
            `Option date ${date} is outside the meeting range (${meeting.dateFrom} to ${meeting.dateTo})`
        );
    }
    // Check if there is already an option for this date and hour
    const existingOption = await TimeOption.findOne({
        meetingId,
        date,
        hour
    }).exec();
    if (existingOption) {
        throw new Error(`An option for ${date} at hour ${hour} already exists`);
    }

    const option = new TimeOption({meetingId, date, hour});
    const saved = await option.save();

    meeting.optionIds.push(saved.id);
    await meeting.save();

    return saved;
}

/** Delete a time option (and any votes for it) */
export async function deleteTimeOption(meetingId: string, optionId: string): Promise<void> {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) throw new Error('Meeting not found');
    if (!meeting.optionIds.includes(optionId)) throw new Error('Option not part of meeting');

    // Remove optionId from meeting
    meeting.optionIds = meeting.optionIds.filter(id => id !== optionId);
    await meeting.save();

    // Remove the TimeOption doc
    await TimeOption.findByIdAndDelete(optionId);

    // Remove any votes tied to this option
    await Vote.deleteMany({meetingId, optionId});
}

/** Cast a vote */
export async function castVote(
    meetingId: string,
    optionId: string,
    userName: string
): Promise<IVote> {
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) throw new Error('Meeting not found');
    if (!meeting.optionIds.includes(optionId)) throw new Error('Option not part of meeting');

    const exists = await Vote.exists({meetingId, optionId, userName});
    if (exists) throw new Error('User has already voted for this option');

    const vote = new Vote({meetingId, optionId, userName});
    return vote.save();
}

/** Get all votes for a meeting */
export async function getVotesByMeeting(meetingId: string): Promise<IVote[]> {
    return Vote.find({meetingId}).exec();
}

/** Summarize votes per option (including zero-vote options) */
export async function getVotesSummary(
    meetingId: string
): Promise<Array<{ option: ITimeOption; count: number }>> {
    // 1) fetch all options for this meeting
    const options = await TimeOption.find({meetingId}).lean().exec();

    // 2) aggregate vote counts
    const counts = await Vote.aggregate([
        {$match: {meetingId}},
        {$group: {_id: '$optionId', count: {$sum: 1}}}
    ]);

    const countMap = new Map<string, number>();
    counts.forEach(c => countMap.set(c._id, c.count));

    // 3) merge and sort
    const summary = options.map(opt => ({
        option: opt,
        count: countMap.get(opt.id) || 0
    }));
    summary.sort((a, b) => b.count - a.count);

    return summary;
}
