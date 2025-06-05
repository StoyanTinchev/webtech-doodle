import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();

    const authLinks = (
        <ul>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
                <Link to="/createMeeting">Create Meeting</Link>
            </li>
            <li>
                <a
                    href="#!"
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                >
                    Sign Out
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Create Account</Link>
            </li>
            <li>
                <Link to="/login">Sign In</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar" style={{ padding: "1rem", background: "#1e1e1e", color: "white" }}>
            <h1>
                <Link to="/" style={{ color: "white", textDecoration: "none" }}>
                    Doodle Calendar
                </Link>
            </h1>
            {isAuthenticated ? (
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <span style={{ marginRight: "1rem" }}>Hello, {user?.name}</span>
                    {authLinks}
                </div>
            ) : (
                guestLinks
            )}
        </nav>
    );
};

export default Navbar;
