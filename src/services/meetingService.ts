import {v4 as uuidv4} from 'uuid';
import {Meeting, TimeOption, Vote} from '../models/types';

// In-memory stores keyed by UUID string
const meetings = new Map<string, Meeting>();
const timeOptions = new Map<string, TimeOption>();
const votes = new Map<string, Vote>();

/** Create a new meeting and return it */
export function createMeeting(
    title: string,
    ownerName: string,
    dateFrom: string,
    dateTo: string
): Meeting {
    const id = uuidv4();
    const newMeeting: Meeting = {id, title, ownerName, dateFrom, dateTo, optionIds: []};
    meetings.set(id, newMeeting);
    return newMeeting;
}

/** Retrieve a meeting by its UUID */
export function getMeetingById(meetingId: string): Meeting | undefined {
    return meetings.get(meetingId);
}

/** Add a time option (date+hour) to a meeting, enforcing date range */
export function addTimeOption(
    meetingId: string,
    date: string,
    hour: number
): TimeOption {
    const meeting = meetings.get(meetingId);
    if (!meeting) throw new Error('Meeting not found');

    const optionDate = new Date(date);
    const startDate = new Date(meeting.dateFrom);
    const endDate = new Date(meeting.dateTo);

    // Check if option date is within meeting range (inclusive)
    if (optionDate < startDate || optionDate > endDate) {
        throw new Error(`Option date ${date} is outside the meeting range (${meeting.dateFrom} to ${meeting.dateTo})`);
    }

    const id = uuidv4();
    const newOption: TimeOption = {id, meetingId, date, hour};
    timeOptions.set(id, newOption);
    meeting.optionIds.push(id);
    meetings.set(meetingId, meeting);
    return newOption;
}

/** Cast a vote for a specific option, preventing duplicates */
export function castVote(
    meetingId: string,
    optionId: string,
    userName: string
): Vote {
    const meeting = meetings.get(meetingId);
    if (!meeting) throw new Error('Meeting not found');
    if (!meeting.optionIds.includes(optionId)) throw new Error('Option not part of meeting');

    // Prevent duplicate votes by same user for same option
    for (const vote of votes.values()) {
        if (vote.meetingId === meetingId && vote.optionId === optionId && vote.userName === userName) {
            throw new Error('User has already voted for this option');
        }
    }

    const id = uuidv4();
    const newVote: Vote = {id, meetingId, optionId, userName};
    votes.set(id, newVote);
    return newVote;
}

/** Get all votes for a meeting */
export function getVotesByMeeting(meetingId: string): Vote[] {
    return Array.from(votes.values()).filter(v => v.meetingId === meetingId);
}

/** Summarize votes per option (including zero-vote options) and sort descending */
export function getVotesSummary(meetingId: string) {
    const meeting = meetings.get(meetingId);
    if (!meeting) throw new Error('Meeting not found');

    // Initialize summary with all options at count 0
    const summaryMap = new Map<string, { option: TimeOption; count: number }>();
    meeting.optionIds.forEach(optId => {
        const option = timeOptions.get(optId);
        if (option) {
            summaryMap.set(optId, {option, count: 0});
        }
    });

    // Tally votes into the summaryMap
    for (const vote of votes.values()) {
        if (vote.meetingId !== meetingId) continue;
        const entry = summaryMap.get(vote.optionId);
        if (entry) {
            entry.count++;
        }
    }

    // Convert to array and sort descending by vote count
    return Array.from(summaryMap.values()).sort((a, b) => b.count - a.count);
}
