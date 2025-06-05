import React, { useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./MeetingForm.css";

interface MeetingFormProps {
    startDate: Date;
    endDate: Date;
}

const MeetingForm: React.FC<MeetingFormProps> = ({
                                                     startDate,
                                                     endDate
                                                 }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!title.trim()) {
            setError("Please enter a meeting title.");
            return;
        }
        setLoading(true);
        setError(null);

        const payload = {
            title: title.trim(),
            dateFrom: format(startDate, "yyyy-MM-dd"),
            dateTo: format(endDate, "yyyy-MM-dd")
        };

        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Not logged in");

            const resp = await fetch(
                "https://webtech-doodle-f3165275f403.herokuapp.com/api/meetings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-auth-token": token
                    },
                    body: JSON.stringify(payload)
                }
            );
            if (!resp.ok) {
                const err = await resp.json();
                throw new Error(err.error || "Failed to create meeting");
            }
            const data = await resp.json();
            navigate(`/meeting/${data.id}`);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="meeting-form">
            <h2>New Meeting Details</h2>
            {error && <div className="error-message">{error}</div>}

            <label>Meeting Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter meeting title"
            />
            <button onClick={handleCreate} disabled={loading}>
                {loading ? "Creating..." : "Create Meeting"}
            </button>
        </div>
    );
};

export default MeetingForm;
