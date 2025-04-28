export interface IOption {
    id: number;
    startTime: number;
    endTime: number;
}

export interface IMeeting {
    id: string;
    title: string;
    ownerName: string;
    dateFrom: string;
    dateTo: string;
    options: IOption[];  
}
