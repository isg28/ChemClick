import React, { useState } from 'react';
import '../../styles/teacherdashboard/TeacherAnnouncements.css';

function TeacherAnnouncements({ announcements, postAnnouncement, editAnnouncement, deleteAnnouncement, announcementsRef }) {
  const [newMessage, setNewMessage] = useState('');
  const [editMessage, setEditMessage] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handlePost = () => {
    if (newMessage.trim()) {
      postAnnouncement('MATT BRIMBERRY', newMessage);
      setNewMessage(''); // Clear input field after posting
    }
  };
  
  const handleEdit = (index, currentMessage) => {
    setEditingIndex(index);
    setEditMessage(currentMessage);
  };

  const saveEdit = (id) => {
    editAnnouncement(id, editMessage);
    setEditingIndex(null);
    setEditMessage('');
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditMessage('');
  };

  const confirmDelete = (id) => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this announcement? This action cannot be undone.'
    );
    if (userConfirmed) {
      deleteAnnouncement(id);
    }
  };
  
  return (
    <div className="teacherannouncements-wrapper">
      <div className="teacherannouncements-container">
        <div className="teacherannouncements-header">
          <h1 className="teacherannouncements-title">Announcements</h1>
        </div>
        <div className="teacherannouncements-writing-box">
          <textarea
            className="textarea-teacher"
            placeholder="Write your announcement here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className="post" onClick={handlePost}>Post</div>
        </div>
        <div className="teacherannouncements-content-wrapper">
          <div className="teacherannouncements-content-box" ref={announcementsRef}>
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className={`teacherannouncement-message ${index === 0 ? 'latest-message' : ''}`}
              >
                {editingIndex === index ? (
                  <>
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                    className="textarea-teacher-edit"
                  />
                  <div className="button-group">
                    <button className="save-button" onClick={() => saveEdit(announcement.id)}>
                      Save
                    </button>
                    <button className="cancel-button" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </div>
                  </>
                ) : (
                  <>
                  <div className="teacherannouncement-author">{announcement.author}</div>
                  <div className="teacherannouncement-date">
                    Posted on: {new Date(announcement.date).toLocaleString()}
                  </div>
                  <div className="teacherannouncement-text">{announcement.message}</div>
                  <div className="button-group">
                    <button className="edit-button" onClick={() => handleEdit(index, announcement.message)}>Edit</button>
                    <button className="delete-button" onClick={() => confirmDelete(announcement.id)}>Delete</button>
                  </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default TeacherAnnouncements;
