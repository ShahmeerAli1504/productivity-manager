import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import './Register.css';

const Register = ({ setToken, setUser }) => {
  const navigate = useNavigate();

  const handleRegisterSuccess = (token, user) => {
    // Store token in memory (not localStorage)
    setToken(token);
    setUser(user);
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Productivity Manager</h1>
        <p className="tagline">Sign up to start managing your tasks efficiently</p>
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Register;