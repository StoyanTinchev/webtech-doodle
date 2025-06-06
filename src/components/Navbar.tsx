import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";  // ensure this is imported

const Navbar: React.FC = () => {
    const { isAuthenticated, logout, user } = useAuth();

    const authLinks = (
        <ul className="navbar-links">
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
        <ul className="navbar-links">
            <li>
                <Link to="/register">Create Account</Link>
            </li>
            <li>
                <Link to="/login">Sign In</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar-container">
            <div className="navbar-brand">
                <Link to="/">Doodle Calendar</Link>
            </div>
            <div className="navbar-right">
                {isAuthenticated && (
                    <span className="navbar-user">Hello, {user?.name}</span>
                )}
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>
    );
};

export default Navbar;
