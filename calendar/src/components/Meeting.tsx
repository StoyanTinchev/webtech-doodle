import "./Meeting.css";

import { useState } from "react";
import { IOption, IMeeting } from "../models";
import Option from "./Option";
import OptionCreator from "./OptionCreator";

interface MeetingProps {
    startDate: Date | null;
    endDate: Date | null;
}

function Meeting({ startDate, endDate }: MeetingProps) {
    const [options, setOptions] = useState<Array<IOption>>([]);
    const [title, setTitle] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
    const [createdMeetings, setCreatedMeetings] = useState<Array<IMeeting>>([]);

    const createMeeting = () => {
        if (!startDate || !endDate) {
            alert("You must select start and end date first!");
            return;
        }
        if (!title || !ownerName) {
            alert("You must enter title and owner name!");
            return;
        }

        const newMeeting: IMeeting = {
            id: crypto.randomUUID(),
            title: title,
            ownerName: ownerName,
            dateFrom: startDate.toISOString(),
            dateTo: endDate.toISOString(),
            options: options.map(opt => ({ ...opt }))
        };

        setCreatedMeetings(prev => [...prev, newMeeting]);

        setTitle("");
        setOwnerName("");
        setOptions([]);
    };

    return (
        <div className="meeting-container">
            {startDate && endDate ? (
                <>
                    <div className="form-section">
                        <div className="label-input">
                        <label>Meeting Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter meeting title"
                            className="input-field"
                        />
                        </div>

                        <div className="label-input">
                        <label>Owner Name:</label>
                        <input
                            type="text"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            placeholder="Enter owner name"
                            className="input-field"
                        />
                        </div>

                        <button className="create-button" onClick={createMeeting} disabled={!options.length}>Create Meeting</button>
                    </div>

                    <div className="options-section">
                        {options.map((option: IOption) => (
                            <Option
                                key={option.id}
                                option={option}
                                options={options}
                                setOptions={setOptions}
                            />
                        ))}
                        <OptionCreator options={options} setOptions={setOptions} />
                    </div>

                    <h2 className="meetings-header">Meetings</h2>
                    <div className="meetings-list">
                        {createdMeetings.map((meeting) => (
                            <div key={meeting.id} className="meeting-card">
                                <div className="meeting-info">
                                    <div className="meeting-dates">
                                        {new Date(meeting.dateFrom).toDateString()} ➔ {new Date(meeting.dateTo).toDateString()}
                                    </div>
                                    <div className="meeting-title">
                                        {meeting.title}
                                    </div>
                                    <div className="meeting-owner">
                                        Organizer: {meeting.ownerName}
                                    </div>
                                    <div className="meeting-times">
                                        {meeting.options.map((opt, idx) => (
                                            <div key={idx}>
                                                Time: {opt.startTime}:00 - {opt.endTime}:00
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Please select a start and end date first!</p>
            )}
        </div>
    );
}

export default Meeting;
