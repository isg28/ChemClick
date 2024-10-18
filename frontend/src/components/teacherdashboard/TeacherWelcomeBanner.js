import React from 'react';
import '../../styles/teacherdashboard/TeacherWelcomeBanner.css';

const TeacherWelcomeBanner = ({ username }) => {
  return (
    <div className="welcome-banner">
      <h2>Welcome Back, {username}!</h2>
    </div>
  );
};

export default TeacherWelcomeBanner;
