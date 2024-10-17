import React from 'react';
import '../../styles/dashboard/WelcomeBanner.css';

const WelcomeBanner = ({ username }) => {
  return (
    <div className="welcome-banner">
      <h2>Welcome Back, {username}!</h2>
    </div>
  );
};

export default WelcomeBanner;
