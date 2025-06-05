import React, { useState } from "react";
import Calendar from "../Calendar/Calendar";
import MeetingForm from "./MeetingForm";
import "./MeetingCreator.css";

const MeetingCreator: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <div className="MeetingCreator">
            <h1>Create Your Meeting</h1>
            <div className="MeetingCreatorContainer">
                <Calendar
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />

                {startDate && endDate && (
                    <MeetingForm
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}
            </div>
        </div>
    );
};

export default MeetingCreator;
