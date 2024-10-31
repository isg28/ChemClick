import React from 'react';
import '../../styles/teacherdashboard/TeacherAnnouncements.css';

    function Teacherannouncements({ announcements }) {
        
        
        const handlePost = () => {
        
        };
        return (
        <div class = "teacherannouncements-wrapper">   
            <div className="teacherannouncements-container">
                <div className="teacherannouncements-header">
                    <h1 className="teacherannouncements-title">Announcements</h1>
                </div>
                <div className = 'teacherannouncements-writing-box'>
                        <input type ="text" className="input-teacher" placeholder='Write an announcement...'></input>  
                            <div className = 'post' onClick = {handlePost}>Post</div>
  
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
        </div>     
        );
    }


export default Teacherannouncements;
