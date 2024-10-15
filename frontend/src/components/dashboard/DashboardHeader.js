import React from 'react';
import '../../styles/dashboard/DashboardHeader.css';

const DashboardHeader = () => {
  return (
    <header className="main-header">
      <div className="inner-container">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt="ChemClick Logo" className="logo" />
          <span className="dashboard-title">ChemClick Dashboard</span>
        </div>
        <div className = "profile-picture">
          <img src = {`${process.env.PUBLIC_URL}/defaultprofilepic.png`} alt="Default Profile" className = "profile-pic"/>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;