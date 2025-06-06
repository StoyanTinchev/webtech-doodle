import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState<any[]>([]);

    useEffect(() => {
        // Fetch all meetings owned by this user
        const fetchMeetings = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const resp = await fetch(
                    `https://webtech-doodle-f3165275f403.herokuapp.com/api/meetings/user/${user?.id}`,
                    {
                        headers: {
                            "x-auth-token": token
                        }
                    }
                );
                if (!resp.ok) throw new Error("Failed to load meetings");
                const data = await resp.json();
                setMeetings(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchMeetings();
    }, [user]);

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1 className="dashboard-title">
                    Welcome to Doodle Calendar, {user?.name}!
                </h1>
                <button onClick={logout} className="logout-btn">
                    Logout
                </button>
            </header>

            <main className="dashboard-content">
                <section className="dashboard-actions">
                    <button
                        className="create-meeting-btn"
                        onClick={() => navigate("/createMeeting")}
                    >
                        + Create New Meeting
                    </button>
                </section>

                <section className="dashboard-meetings">
                    <h2 className="section-title">Your Meetings</h2>
                    {meetings.length === 0 ? (
                        <p className="no-meetings">You have no meetings yet.</p>
                    ) : (
                        <div className="meetings-list">
                            {meetings.map((m) => (
                                <div key={m.id} className="meeting-card">
                                    <h3>{m.title}</h3>
                                    <p>
                                        {m.dateFrom} → {m.dateTo}
                                    </p>
                                    <button
                                        onClick={() => navigate(`/meeting/${m.id}`)}
                                        className="meeting-link-btn"
                                    >
                                        View / Vote
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
