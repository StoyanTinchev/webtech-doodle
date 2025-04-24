export interface Meeting {
    id: string;
    title: string;
    ownerName: string;
    dateFrom: string;       // ISO date start
    dateTo: string;         // ISO date end
    optionIds: string[];    // associated TimeOption IDs
}

export interface TimeOption {
    id: string;
    meetingId: string;      // parent Meeting ID
    date: string;           // YYYY-MM-DD
    hour: number;           // 0-23
}

export interface Vote {
    id: string;
    meetingId: string;      // parent Meeting ID
    optionId: string;       // voted TimeOption ID
    userName: string;
}