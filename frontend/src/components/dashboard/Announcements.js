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
                <div
                    key={announcement.id}
                    className={`announcement-message ${
                    index === 0 ? 'latest-message' : ''
                    }`}
                    >
                    <div className="teacherannouncement-author">{announcement.author}</div>
                        <div className="teacherannouncement-date">
                            Posted on: {new Date(announcement.date).toLocaleString()}
                        </div>
                    <div className="teacherannouncement-text">{announcement.message}</div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Announcements;
