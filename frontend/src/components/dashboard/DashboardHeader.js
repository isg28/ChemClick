import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard/DashboardHeader.css';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleMenuBarClick = () =>{
    navigate('/login');
  };
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
        <div className = "menu-bar" onClick = {handleMenuBarClick}></div>
      </div>
    </header>
  );
};

export default DashboardHeader;