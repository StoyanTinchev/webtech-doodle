export interface Meeting {
    id: number;
    title: string;
    ownerName: string;
    dateFrom: string; // ISO date start of range
    dateTo: string;   // ISO date end of range
    optionIds: number[]; // associated option IDs
}

export interface TimeOption {
    id: number;
    meetingId: number;
    date: string; // YYYY-MM-DD
    hour: number; // 0-23
}

export interface Vote {
    id: number;
    meetingId: number;
    optionId: number;
    userName: string;
}