import React, {useState} from "react";
import {VotingOptionProps} from "../../interfaces";
import "./VotingOption.css";
import {meetingService} from "../../services/meetingService";
import {useAuth} from "../../context/AuthContext";

const VotingOption: React.FC<VotingOptionProps> = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    const {user} = useAuth();

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
        props.handleOptionSelect(props.voteSummary.option.id);
    };

    const handleRemoveVote = async () => {
        try {
            await meetingService.removeVote(
                props.voteSummary.option.id,
                props.voteSummary.votes.find((vote) => vote.user.id == user?.id)
                    ?.voteId || ""
            );
            await props.refreshAfterVote();
        } catch (err: any) {
            alert(
                `Error deleting option ${props.voteSummary.option.id}: ${err.message}`
            );
        }
    };
    return (
        <li className="voting-option-card">
            <label className="voting-option-content">
                {!props.hasVoted.includes(props.voteSummary.option.id) && (
                    <input
                        type="checkbox"
                        className="voting-option-checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                )}
                <span>
          Date: {props.voteSummary.option.date}, Hour:{" "}
                    {props.voteSummary.option.hour}, Votes: {props.voteSummary.count}{" "}
                    {props.hasVoted.includes(props.voteSummary.option.id) && (
                        <span className="voting-option-voted">(Voted)</span>
                    )}
        </span>
            </label>
            {props.hasVoted.includes(props.voteSummary.option.id) && (
                <button
                    type="button"
                    className="remove-vote"
                    onClick={handleRemoveVote}
                >
                    Remove your vote
                </button>
            )}
        </li>
    );
};

export default VotingOption;
