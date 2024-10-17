import React from 'react';
import '../../styles/dashboard/Announcements.css';

function Announcements({ announcements }) {
    return (
        <div className="announcements-container">
            <div className="announcements-header">
                <h1 className="announcements-title">Announcements</h1>
            </div>
            <div className="announcements-content-box">
                {announcements.map((announcement, index) => (
                    <div key={index} className="announcement-message">
                        <div className="announcement-author">{announcement.author}</div>
                        <div className="announcement-date">Posted on: {announcement.date}</div>
                        <div className="announcement-text">{announcement.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Announcements;
