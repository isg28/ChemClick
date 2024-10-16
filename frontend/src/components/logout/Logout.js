import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/logout/Logout.css';

function Logout() {
   const navigate = useNavigate(); 

   const handleLogout = () => {
      //clears user data from the session
      localStorage.removeItem('authToken');

      //after logging out, naviagtes to login 
      navigate('/Login');
    };

    const handleLogoClick = () => {
      navigate('/Login');
    };

    return (
      <div className = 'Logout'>
         <div className = 'container'> 
            <div className = 'header'>
               <img  
                  src = {`${process.env.PUBLIC_URL}/ChemClickLogo.png`} alt = "ChemClick Logo" className = "profile-logo" 
                  onClick={handleLogoClick}
                  style={{ cursor: 'pointer'}}
                  />
               <div className = 'underline'></div>
            </div>

         <div className = 'message'>
            <h2>You have been logged out!</h2>
            <p>Click on the logo to return to the login page</p>
         </div>
      </div> 
   </div> 
    );
}

export default Logout;  
