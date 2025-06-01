import { VotingOptionProps } from "../../interfaces";
import "./VotingOption.css";
import { useState, useEffect } from "react";

const VotingOption = (props: VotingOptionProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (props.isVoted) {
      setIsChecked(true);
    }
  }, [props.isVoted]);

  const handleCheckboxChange = () => {
    setIsChecked((prevState) => !prevState);
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
          Date: {props.voteSummary.option.date}, Hour:{" "}
          {props.voteSummary.option.hour}, Votes: {props.voteSummary.count}
          {props.successfulVotedOptionIds.includes(
            props.voteSummary.option.id
          ) && <strong> (Voted)</strong>}
        </span>
      </label>
    </li>
  );
};

export default VotingOption;
