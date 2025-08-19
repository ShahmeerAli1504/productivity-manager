import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ token }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
            withCredentials: true
          }
        );
        setUser(response.data.user);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data. Please try logging in again.');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
      setError('Authentication required');
    }
  }, [token]);

  if (loading) {
    return <div className="dashboard-loading">Loading...</div>;
  }

  if (error || !user) {
    return <div className="dashboard-error">{error || 'Authentication required'}</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Productivity Manager</h1>
        <div className="user-info">
          <span>Welcome, {user.name}!</span>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-card">
          <h2>User Information</h2>
          <div className="user-details">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Account created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="dashboard-card">
          <h2>Getting Started</h2>
          <p>Welcome to your productivity dashboard! This is where you'll manage your tasks and track your progress.</p>
          <p>More features coming soon...</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;