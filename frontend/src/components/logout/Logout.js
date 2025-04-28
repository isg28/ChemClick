import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/logout/Logout.css';

function Logout() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="logout-body">
      <div className="logout-home-container">
        <div className="logout-main-container">
          <div className="logout-main-item" id="logoutTitle">
            <div className="logout-title-text">You have been logged out!</div>
          </div>

          <div className="logout-main-item" id="logoutMenuOptions">
            <div className="logout-menu-container">
              <div className="logout-header">
                <div className="logout-logo-wrapper">
                  <img
                    src={`${process.env.PUBLIC_URL}/ChemClickLogo.png`}
                    alt="ChemClick Logo"
                    className="logout-logo"
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              </div>
              <div className="logout-button" onClick={handleSignIn}>
                SIGN BACK IN
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
