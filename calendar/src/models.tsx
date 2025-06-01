// export interface IOption {
//     id: number;
//     startTime: number;
//     endTime: number;
// }

// export interface IMeeting {
//     id: string;
//     title: string;
//     ownerName: string;
//     dateFrom: string;
//     dateTo: string;
//     options: IOption[];  // String[]
// }

export interface IMeeting {
  id: string;
  title: string;
  description: string;
  ownerName: string;
  dateFrom: string;
  dateTo: string;
}
