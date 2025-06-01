import { VotingOptionsListProps } from "../../interfaces";
import VotingOption from "../VotingOption/VotingOption";
import { useState } from "react";
import "./VotingOptionsList.css";

const VotingOptionsList = (props: VotingOptionsListProps) => {
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
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

    const voteResults = await Promise.all(
      selectedOptionIds.map((optionId) =>
        fetch(
          `https://webtech-doodle-f3165275f403.herokuapp.com/api/meetings/${props.votesSummary[0].option.meetingId}/votes`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ optionId: optionId, userName: "Petya" }),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Request failed with status ${response.status}`);
            } else {
              return response.json();
            }
          })
          .catch((error) => {
            console.error(`Error voting for option ${optionId}: `, error);
            return { error };
          })
      )
    );

    let anySuccess = false;

    voteResults.forEach((result, index) => {
      if (!result.error) {
        anySuccess = true;
        const votedOptionId = selectedOptionIds[index];
        const voteSummary = props.votesSummary.find(
          (vs) => vs.option.id === votedOptionId
        );
        if (voteSummary) {
          voteSummary.count += 1;
          setSuccessfulVotedOptionIds((prev) => [...prev, votedOptionId]);
        }
      } else {
        alert(
          `You have already voted for option with id ${selectedOptionIds[index]}`
        );
      }
    });

    if (anySuccess) {
      setHasVoted(true);
    }
  };

  if (!props.votesSummary) {
    return <p>No options</p>;
  }

  return (
    <div>
      <form className="voting-options-wrapper" onSubmit={handleSubmitVote}>
        <ul className="voting-options-list">
          {props.votesSummary.map((voteSummary) => (
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
          Submit your vote
        </button>
      </form>
    </div>
  );
};

export default VotingOptionsList;
