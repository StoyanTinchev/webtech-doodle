import { useEffect, useState } from "react";
import { MeetingWithVotesSummary, VoteSummary } from "../../interfaces";
import VotingOptionsList from "../VotingOptionsList/VotingOptionsList";

const MeetingPage = () => {
  const [meetingWithVotesSummary, setMeetingWithVotesSummary] =
    useState<MeetingWithVotesSummary | null>(null);
  const [isAddOptionVisible, setIsAddOptionVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(
      "https://webtech-doodle-f3165275f403.herokuapp.com/api/meetings/5e3c0822-067e-4e18-9e3d-752a88946419"
    )
      .then((res) => res.json())
      .then((response) => {
        setMeetingWithVotesSummary(response);
      });
  }, []);

  const handleAddOptionClick = () => {
    setIsAddOptionVisible(true);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedHour(Number(e.target.value));
  };

  const handleSubmitNewOption = async () => {
    if (!selectedDate || selectedHour < 0 || selectedHour > 23) {
      alert("Please select a valid date and time.");
      return;
    }

    setIsSubmitting(true);
    
    const newOption = {
      date: selectedDate,
      hour: selectedHour,
      meetingId: meetingWithVotesSummary?.meeting.id,
    };

    try {
      const response = await fetch(
        `https://webtech-doodle-f3165275f403.herokuapp.com/api/meetings/${meetingWithVotesSummary?.meeting.id}/options`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newOption),
        }
      );
      const data = await response.json();
      // Add the new option to the state
      setMeetingWithVotesSummary((prevState) => {
        if (prevState) {
          const newVotesSummary = [...prevState.votesSummary, { option: data, count: 0 }];
          return { ...prevState, votesSummary: newVotesSummary };
        }
        return prevState;
      });
      setIsAddOptionVisible(false);
      setSelectedDate("");
      setSelectedHour(0);
    } catch (error) {
      console.error("Error adding new option:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!meetingWithVotesSummary?.meeting) {
    return <p>No meeting found!</p>;
  }

  return (
    <div>
      <h1>{`Organized by ${meetingWithVotesSummary.meeting.ownerName}`}</h1>
      <h2>{`Title: ${meetingWithVotesSummary.meeting.title}`}</h2>
      <VotingOptionsList votesSummary={meetingWithVotesSummary.votesSummary} />
      {!isAddOptionVisible ? (
        <button className="add-option-button" onClick={handleAddOptionClick}>
          Add Option
        </button>
      ) : (
        <div className="add-option-form">
          <label>
            Select Date:
            <input
              type="date"
              min={meetingWithVotesSummary.meeting.dateFrom}
              max={meetingWithVotesSummary.meeting.dateTo}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </label>
          <label>
            Select Hour:
            <select value={selectedHour} onChange={handleHourChange}>
              {[...Array(24).keys()].map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={handleSubmitNewOption}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit New Option"}
          </button>
        </div>
      )}
    </div>
  );
};

export default MeetingPage;
