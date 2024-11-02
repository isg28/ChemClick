import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/dashboard/DashboardHeader.css';

const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleMenuBarClick = () =>{
    document.getElementById("myDropdown").classList.toggle("show");
  };
  window.onclick = function(event) {
    if(!event.target.matches('.menu-bar')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown  = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
  }
  const handleDashboardClick = () =>{
    navigate('/dashboard');
  }
  const handleProfileClick = () =>{
    navigate('/profile');
  }
  const handleTeacherDashboardClick = () =>{
    navigate('/teacherdashboard');
  }
  const handleLogoutClick = () =>{
    navigate('/logout');
  }

  return (
    <header className="main-header">
      <div className="inner-container">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt="ChemClick Logo" className="logo" />
          <span className="dashboard-title">ChemClicks Dashboard</span>
        </div>
        <div className = "profile-picture">
          <img src = {`${process.env.PUBLIC_URL}/defaultprofilepic.png`} alt="Default Profile" className = "profile-pic"/>
        </div>
        <div className = "dropdown">
            <div className = "menu-bar" onClick = {handleMenuBarClick}>
            </div>
            <div id = "myDropdown" class = "dropdown-content">
                <ul onClick = {handleDashboardClick}>Dashboard</ul>
                <ul onClick = {handleProfileClick}>Profile Page</ul>
                <ul onClick = {handleTeacherDashboardClick}>Teacher Dashboard</ul>
                <ul onClick = {handleLogoutClick}>Sign Out</ul>
            </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;