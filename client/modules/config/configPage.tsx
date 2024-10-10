import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ConfigurationPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove auth token
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h2>Configuration Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};


