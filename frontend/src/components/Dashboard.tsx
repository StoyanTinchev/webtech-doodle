import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="welcome-container">
        <h2>Hello, {user?.username}!</h2>
        <p>You have successfully logged into your account.</p>
        <p>Account Email: {user?.email}</p>
        <button onClick={logout} className="btn btn-danger">
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;