import { User } from "../types/auth";

export interface IMeeting {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  dateFrom: string; 
  dateTo: string;
}

export interface TimeOption {
  id: string;
  meetingId: string; // parent Meeting ID
  date: string; // YYYY-MM-DD
  hour: number; // 0-23
}

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  registrationDate: Date;
}

export interface IVote {
  voteId: string; // identifies which slot they picked
  user: User; // references User
  votedAt: Date; // timestamp when this vote was cast
}

export interface VoteSummary {
  option: TimeOption;
  count: number;
  votes: IVote[];
}

export interface MeetingWithVotesSummary {
  meeting: IMeeting;
  votesSummary: VoteSummary[];
}

export interface VotingOptionProps {
  voteSummary: VoteSummary;
  handleOptionSelect: (optionId: string) => void;
  selectedOptionIds?: string[];
  hasVoted: string[];
  successfulVotedOptionIds: string[];
  refreshAfterVote: () => Promise<void>;
}

export interface VotingOptionsListProps {
  votesSummary: VoteSummary[];
  meetingId: string;
  refreshAfterVote: () => Promise<void>;
  hasVoted: string[];
}
