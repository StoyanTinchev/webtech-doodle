import React, { useState } from "react";
import { VotingOptionsListProps } from "../../interfaces";
import "./VotingOptionsList.css";
import { meetingService } from "../../services/meetingService";
import VotingOption from "../VotingOption/VotingOption.tsx";

const VotingOptionsList: React.FC<VotingOptionsListProps> = ({
  votesSummary,
  refreshAfterVote,
  hasVoted,
}) => {
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [successfulVotedOptionIds, setSuccessfulVotedOptionIds] = useState<
    string[]
  >([]);

  const handleOptionSelect = (optionId: string) => {
    if (hasVoted) return;
    if (selectedOptionIds.includes(optionId)) {
      setSelectedOptionIds(selectedOptionIds.filter((id) => id !== optionId));
    } else {
      setSelectedOptionIds([...selectedOptionIds, optionId]);
    }
  };

  const handleSubmitVote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedOptionIds.length === 0) {
      alert("Please select at least one option to vote for!");
      return;
    }

    let anySuccess = false;
    for (const optionId of selectedOptionIds) {
      try {
        await meetingService.castVote(optionId);
        anySuccess = true;
        setSuccessfulVotedOptionIds((prev) => [...prev, optionId]);
      } catch (err: any) {
        alert(`Error voting for option ${optionId}: ${err.message}`);
      }
    }

    if (anySuccess) {
      // After we vote, we should refresh the meeting data:
      refreshAfterVote();
    }
  };

  if (!votesSummary || votesSummary.length === 0) {
    return <p>No options available.</p>;
  }

  return (
    <div>
      <form className="voting-options-wrapper" onSubmit={handleSubmitVote}>
        <ul className="voting-options-list">
          {votesSummary.map((voteSummary) => (
            <VotingOption
              key={voteSummary.option.id}
              voteSummary={voteSummary}
              handleOptionSelect={handleOptionSelect}
              hasVoted={hasVoted}
              successfulVotedOptionIds={successfulVotedOptionIds}
            />
          ))}
        </ul>
        <button type="submit" disabled={hasVoted}>
          {hasVoted ? "You’ve Voted" : "Submit Your Vote"}
        </button>
      </form>
    </div>
  );
};

export default VotingOptionsList;
