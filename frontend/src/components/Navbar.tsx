import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <a href="#!" onClick={(e) => {
          //e.preventDefault();
          logout();
        }}>
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
    <nav className="navbar">
      <h1>
        <Link to="/">Doodle Calendar</Link>
      </h1>
      {isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

export default Navbar;