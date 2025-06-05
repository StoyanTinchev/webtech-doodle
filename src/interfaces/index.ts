export interface IMeeting {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  dateFrom: string; // ISO date start
  dateTo: string; // ISO date end
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
  meetingId: string;  // identifies which meeting this vote belongs to
  optionId: string;   // identifies which slot they picked
  userId: string;     // references User.id
  votedAt: Date;      // timestamp when this vote was cast
}

export interface VoteSummary {
  option: TimeOption;
  count: number;
}

export interface MeetingWithVotesSummary {
  meeting: IMeeting;
  votesSummary: VoteSummary[];
}

export interface VotingOptionProps {
  voteSummary: VoteSummary;
  handleOptionSelect: (optionId: string) => void;
  selectedOptionIds?: string[];
  hasVoted: boolean;
  successfulVotedOptionIds: string[];
  isVoted?: boolean;
}

export interface VotingOptionsListProps {
  votesSummary: VoteSummary[];
  meetingId: string;
  refreshAfterVote: () => Promise<void>;
}
