import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState('not healthy');
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/api/health`);
        if (response.data.status === 'healthy') {
          setApiStatus('healthy');
        } else {
          setApiStatus('not healthy');
        }
      } catch (error) {
        console.error('Error checking API health:', error);
        setApiStatus('not healthy');
      } finally {
        setLoading(false);
      }
    };

    checkApiHealth();
    // Check health every 10 seconds
    const interval = setInterval(checkApiHealth, 10000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} />
          <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <Register setToken={setToken} setUser={setUser} />} />
          <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/register" />} />
        </Routes>
        
        {/* API Status Indicator */}
        <div className="api-status-indicator">
          <span className={apiStatus === 'healthy' ? 'healthy' : 'not-healthy'}>
            API: {loading ? 'checking...' : apiStatus}
          </span>
        </div>
      </div>
    </Router>
  );
}

export default App;
