import React from 'react';
import '../../styles/teacherdashboard/TeacherAnouncements.css';

    function TeacherAnouncements({ announcements }) {
        
        
        const handlePost = () => {
        
        };
        return (
            <div className="teacherannouncements-container">
                <div className="teacherannouncements-header">
                    <h1 className="teacherannouncements-title">Announcements</h1>
                </div>
                <div className = 'teacheranouncements-writing-box'>
                    <form>
                        <input type ="text" placeholder='Write an announcement...' className="input-teacher"></input>
                        <div className = 'post' onClick = {handlePost}>Post</div>
                    </form>
                </div>
                <div className="teacherannouncements-content-box">
                    {announcements.map((announcement, index) => (
                        <div key={index} className="teacherannouncement-message">
                            <div className="teacherannouncement-author">{announcement.author}</div>
                            <div className="teacherannouncement-date">Posted on: {announcement.date}</div>
                            <div className="teacherannouncement-text">{announcement.message}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


export default TeacherAnouncements;
