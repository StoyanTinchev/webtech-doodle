import React, {useState, useEffect} from "react";
import {VotingOptionProps} from "../../interfaces";
import "./VotingOption.css";

const VotingOption: React.FC<VotingOptionProps> = (props) => {
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (props.isVoted) {
            setIsChecked(true);
        }
    }, [props.isVoted]);

    const handleCheckboxChange = () => {
        setIsChecked((prev) => !prev);
        props.handleOptionSelect(props.voteSummary.option.id);
    };

    return (
        <li className="voting-option-card">
            <label className="voting-option-content">
                {!props.hasVoted && (
                    <input
                        type="checkbox"
                        className="voting-option-checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                )}
                <span>
 Date: {props.voteSummary.option.date},
 Hour: {props.voteSummary.option.hour},
 Votes: {props.voteSummary.count}{" "}
                    {props.successfulVotedOptionIds.includes(
                        props.voteSummary.option.id
                    ) && <span className="voting-option-voted">(Voted)</span>}
        </span>
            </label>
        </li>
    );
};

export default VotingOption;
