import { Meeting, TimeOption, Vote } from '../models/types';

let meetings: Meeting[] = [];
let timeOptions: TimeOption[] = [];
let votes: Vote[] = [];

let meetingIdCounter = 1;
let optionIdCounter = 1;
let voteIdCounter = 1;

export function createMeeting(title: string, ownerName: string, dateFrom: string, dateTo: string): Meeting {
    const newMeeting: Meeting = {
        id: meetingIdCounter++,
        title,
        ownerName,
        dateFrom,
        dateTo,
        optionIds: []
    };
    meetings.push(newMeeting);
    return newMeeting;
}

export function getMeetingById(meetingId: number): Meeting | undefined {
    return meetings.find(m => m.id === meetingId);
}

export function addTimeOption(meetingId: number, date: string, hour: number): TimeOption {
    const meeting = getMeetingById(meetingId);
    if (!meeting) throw new Error('Meeting not found');
    const newOption: TimeOption = {
        id: optionIdCounter++,
        meetingId,
        date,
        hour
    };
    timeOptions.push(newOption);
    meeting.optionIds.push(newOption.id);
    return newOption;
}

export function castVote(meetingId: number, optionId: number, userName: string): Vote {
    const meeting = getMeetingById(meetingId);
    if (!meeting) throw new Error('Meeting not found');
    if (!meeting.optionIds.includes(optionId)) throw new Error('Option not part of this meeting');
    const newVote: Vote = {
        id: voteIdCounter++,
        meetingId,
        optionId,
        userName
    };
    votes.push(newVote);
    return newVote;
}

export function getVotesSummary(meetingId: number) {
    const summary: Record<number, { option: TimeOption; count: number }> = {};
    votes.filter(v => v.meetingId === meetingId).forEach(v => {
        if (!summary[v.optionId]) {
            const option = timeOptions.find(o => o.id === v.optionId)!;
            summary[v.optionId] = { option, count: 0 };
        }
        summary[v.optionId].count++;
    });
    return Object.values(summary).sort((a, b) => b.count - a.count);
}
