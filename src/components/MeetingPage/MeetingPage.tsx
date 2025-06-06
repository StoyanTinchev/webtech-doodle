import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MeetingWithVotesSummary, VoteSummary } from "../../interfaces";
import VotingOptionsList from "../VotingOptionsList/VotingOptionsList";
import { meetingService } from "../../services/meetingService";
import { useAuth } from "../../context/AuthContext";

const MeetingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meetingData, setMeetingData] =
    useState<MeetingWithVotesSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingOption, setAddingOption] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [submittingOption, setSubmittingOption] = useState(false);

  const { user } = useAuth();
  const hasVoted: string[] = [];
  meetingData?.votesSummary.forEach((el) => {
    console.log(el);
    el?.votes.forEach((vote) => {
      console.log(vote.user.id, user?.id);

      if (vote.user.id === user?.id) {
        hasVoted.push(el.option.id);
      }
    });
  });

  const fetchMeeting = async () => {
    if (!id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await meetingService.fetchMeetingWithSummary(id);
      setMeetingData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeeting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddOptionClick = () => {
    setAddingOption(true);
  };

  const handleSubmitNewOption = async () => {
    if (!selectedDate || selectedHour < 0 || selectedHour > 23) {
      alert("Please select a valid date and time.");
      return;
    }
    setSubmittingOption(true);

    try {
      const newOpt = await meetingService.addOption(
        id!,
        selectedDate,
        selectedHour
      );
      // update local state:
      setMeetingData((prev) => {
        if (!prev) return prev;
        const updated: VoteSummary = {
          option: newOpt,
          count: 0,
          votes: [],
        };
        return {
          ...prev,
          votesSummary: [...prev.votesSummary, updated],
        };
      });
      setAddingOption(false);
      setSelectedDate("");
      setSelectedHour(0);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmittingOption(false);
    }
  };

  if (loading) return <p>Loading meeting...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!meetingData) return <p>No meeting found!</p>;

  return (
    <div className="meeting-page-container">
      <div className="meeting-page-header">
        <h1>{meetingData.meeting.title}</h1>
        <p>
          <span className="meeting-label">Owner:</span>{" "}
          <strong>{meetingData.meeting.ownerId}</strong>
        </p>
        <p>
          <span className="meeting-label">Range:</span>{" "}
          {meetingData.meeting.dateFrom} – {meetingData.meeting.dateTo}
        </p>
      </div>
      <hr className="meeting-separator" />
      <VotingOptionsList
        votesSummary={meetingData.votesSummary}
        meetingId={meetingData.meeting.id}
        refreshAfterVote={fetchMeeting}
        hasVoted={hasVoted}
      />
      {addingOption ? (
        <button onClick={handleAddOptionClick}> Add Option</button>
      ) : (
        <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <label style={{ marginRight: "1rem" }}>
            Date:
            <input
              type="date"
              min={meetingData.meeting.dateFrom}
              max={meetingData.meeting.dateTo}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </label>

          <label style={{ marginRight: "1rem" }}>
            Hour:
            <select
              value={selectedHour}
              onChange={(e) => setSelectedHour(Number(e.target.value))}
            >
              {[...Array(24).keys()].map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </label>

          <button onClick={handleSubmitNewOption} disabled={submittingOption}>
            {submittingOption ? "Submitting..." : "Submit Option"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingPage;
