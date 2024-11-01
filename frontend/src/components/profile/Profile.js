import React from 'react';
import ProfileHeader from './ProfileHeader';
import '../../styles/profile/Profile.css';


function Profile() {
    return (
      <div className="Profile">
        <ProfileHeader />
        <div className = "history-container">
            <span className = "sub-title">History</span>
        </div>
        <div className = "progress-container">
            <span className = "sub-title">Progress</span>
        </div>
        <div className = "achievements-container">
            <span className = "sub-title">Achievements</span>
        </div>
      </div>
      
    );
}

export default Profile;