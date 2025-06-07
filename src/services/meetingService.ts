import { MeetingWithVotesSummary } from "../interfaces";
import { TimeOption } from "../interfaces";

const API_BASE = "https://webtech-doodle-f3165275f403.herokuapp.com/api";

export const meetingService = {
  fetchMeetingWithSummary: async (
    meetingId: string
  ): Promise<MeetingWithVotesSummary> => {
    const resp = await fetch(
      `${API_BASE}/meetings/${meetingId}?includeVotes=true`
    );
    if (!resp.ok) {
      throw new Error("Failed to load meeting");
    }
    const data = await resp.json();

    // Transform into front-end shape:
    const meeting = {
      id: data.meetingId,
      title: data.title,
      ownerId: data.ownerId,
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
    };

    const votesSummary = data.options.map((opt: any) => ({
      option: {
        id: opt.optionId,
        meetingId: data.meetingId,
        date: opt.date,
        hour: opt.hour,
      },
      count: opt.voteCount,
      votes: opt.votes,
    }));
    return { meeting, votesSummary };
  },

  addOption: async (
    meetingId: string,
    date: string,
    hour: number
  ): Promise<TimeOption> => {
    const payload = { date, hour };
    const resp = await fetch(`${API_BASE}/meetings/${meetingId}/options`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error || "Failed to add option");
    }
    const data = await resp.json();
    // returned object: { optionId, date, hour, voteCount, _links }
    return {
      id: data.optionId,
      meetingId: meetingId,
      date: data.date,
      hour: data.hour,
    };
  },

  castVote: async (
    optionId: string
  ): Promise<{ voteId: string; userId: string }> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not logged in");

    const resp = await fetch(`${API_BASE}/meetings/options/${optionId}/votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({}), // backend does not expect body content
    });
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.error || "Failed to cast vote");
    }
    return resp.json();
  },

  removeVote: async (optionId: string, voteId: string): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not logged in");
    const resp = await fetch(
      `${API_BASE}/meetings/options/${optionId}/votes/${voteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
        },
      }
    );
  },
};
