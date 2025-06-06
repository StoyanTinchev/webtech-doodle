import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import MeetingForm from "../MeetingForm/MeetingForm";
import "./MeetingCreator.css";

const MeetingCreator: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <div className="meeting-creator-page">
            <h1 className="meeting-creator-title">Create Your Meeting</h1>
            <div className="meeting-creator-container">
                <Calendar
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
                {startDate && endDate && (
                    <MeetingForm startDate={startDate} endDate={endDate} />
                )}
            </div>
        </div>
    );
};

export default MeetingCreator;
