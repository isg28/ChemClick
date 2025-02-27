import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/teacherdashboard/TeacherUnitList.css';
import TeacherProgressBox from "./TeacherStudentProgress";

function TeacherUnitList({ units, currentUnit }) {
  const [openUnits, setOpenUnits] = useState(units.map(() => false));
  const [openLessons, setOpenLessons] = useState(units.map(() => units[0].lessons.map(() => false)));
  const [editingLesson, setEditingLesson] = useState(null); 
  const [editedData, setEditedData] = useState({}); 
  const [isCreating, setIsCreating] = useState(false); 
  const [modalScrollTop, setModalScrollTop] = useState(0);
  const [shake, setShake] = useState(false);



  const toggleUnit = (index) => {
    const newOpenUnits = [...openUnits];
    newOpenUnits[index] = !newOpenUnits[index];
    setOpenUnits(newOpenUnits);
  };

  const toggleLesson = (unitIndex, lessonIndex) => {
    const newOpenLessons = [...openLessons];
    newOpenLessons[unitIndex][lessonIndex] = !newOpenLessons[unitIndex][lessonIndex];
    setOpenLessons(newOpenLessons);
  };
  const navigate = useNavigate();
   const handleClickToBegin = () => {
      navigate('/statisticsindividual');
  };

  const handleEditClick = (unitIndex, lessonIndex) => {
    const lesson = units[unitIndex].lessons[lessonIndex];
  
    setEditingLesson({ unitIndex, lessonIndex });
    // Get the coordinates of the clicked edit icon
    const container = document.querySelector('.teacherunitlist-container');
    const scrollTop = container.scrollTop;

    setModalScrollTop(scrollTop); 
    container.style.overflow = 'hidden'; 

    setEditingLesson({ unitIndex, lessonIndex });

    fetch(`http://localhost:8000/lessons/${lesson.lesson_id}/`)
      .then((res) => {
        if (res.status === 404) {
          // If the lesson does not exist, set to create mode
          setIsCreating(true);
          setEditedData({
            lessonId: lesson.lesson_id, 
            name: lesson.name,
            status: 'locked', 
            dueDate: '', 
            goalLevel: 0, 
          });
          return;
        }
        if (!res.ok) {
          throw new Error(`Failed to fetch lesson data for ID: ${lesson.lesson_id}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          // If data exists, populate for editing
          setIsCreating(false);
          setEditedData({
            lessonId: data.lesson_id || lesson.lesson_id,
            name: lesson.name,
            status: data.status || 'locked',
            dueDate: data.due_date || '',
            goalLevel: data.goal_level || 0,
          });
        }
      })
      .catch((error) => console.error('Error fetching lesson data:', error));
  };
  
  const handleSaveClick = () => {
    if (["completed", "in-progress", "not-started"].includes(editedData.status) && !editedData.dueDate) {
      setShake(true); 
      setTimeout(() => setShake(false), 600); 
      return;
    }
    const url = isCreating
      ? `http://localhost:8000/lessons/`
      : `http://localhost:8000/lessons/${editedData.lessonId}/`;
  
    const method = isCreating ? 'POST' : 'PATCH';
  
    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lesson_id: isCreating ? editedData.lessonId : undefined, 
        name: editedData.name, 
        status: editedData.status,
        due_date: editedData.status === 'locked' ? null : editedData.dueDate,
        goal_level: editedData.goalLevel,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to ${isCreating ? 'create' : 'update'} lesson`);
        return res.json();
      })
      .then(() => {
        setEditingLesson(null);
        const container = document.querySelector('.teacherunitlist-container');
        container.style.overflow = ''; 
        container.scrollTop = modalScrollTop;
  
        window.location.reload(); 
      })
      .catch((error) => console.error('Error saving changes:', error));
  };
  

  
  const handleInputChange = (field, value) => {
    setEditedData((prev) => {
      if (field === 'status' && value === 'locked') {
        return {
          ...prev,
          [field]: value,
          dueDate: '', 
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };
    
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'completed';
      case 'in-progress':
        return 'teacherin-progress-lesson'; 
      case 'not-started':
        return 'not-started';
      case 'locked':
        return 'locked';
      default:
        return '';
    }
  };

  const getStatusText = (status, dueDate) => {
    const formattedDate = formatDate(dueDate);
    if (status === 'locked') return '[LOCKED]';
    if (status === 'not-started') return 'Not Started'
    if (status === 'completed') return `Completed: ${formattedDate}`;
    return `Due: ${formattedDate || 'N/A'}`;
  };
  
  const formatDate = (isoDate) => {
    if (!isoDate) return '[LOCKED]';
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };
  
  const handleCancelClick = () => {
    setEditingLesson(null);
    const container = document.querySelector('.teacherunitlist-container');
    container.style.overflow = ''; 
    container.scrollTop = modalScrollTop;
  };

  return (
    <div className={`teacherunitlist-container ${editingLesson ? 'modalActive' : ''}`}>
      <div className="teacherunitlist-header">
        <h1>Student Progress</h1> 
      </div>
      <div className='unit-student-progress-button'>
            <h4 onClick = {handleClickToBegin} >View Full Individual Statistics</h4> 
      </div>

      <div className="teacherunitlist-content">
        {units.map((unit, unitIndex) => (
          <div
            key={unitIndex}
            className={`teacherunit-item ${currentUnit === unit.number ? 'teachercurrent-unit' : ''}`}
          >
            <div className="teacherunit-title" onClick={() => toggleUnit(unitIndex)}>
              <span className="teacherunit-number">{unit.number}</span>
              <span className="teacherunit-text">{unit.title}</span>
              <span className="teachertriangle">{openUnits[unitIndex] ? '▲' : '▶'}</span>
            </div>
            {openUnits[unitIndex] && (
              <div className="teacherunit-details">
                <ul>
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <li 
                      key={lessonIndex} 
                      className={getStatusClass(lesson.status)}
                    >
                      <div className="teacherunit-title">
                        <span>{lessonIndex + 1}. {lesson.name}</span>
                        <span
                          className={`teacherdue-date ${lesson.status === 'completed' ? 'completed' : ''}`}
                        >
                          {getStatusText(lesson.status, lesson.dateDue)}
                        </span>
                        <span className="edit-icon" onClick={() => handleEditClick(unitIndex, lessonIndex)}>
                          ✎
                        </span>
                        <span className="teachertriangle" onClick={(e) => {
                          e.stopPropagation(); // Prevent the unit toggle when clicking the triangle
                          toggleLesson(unitIndex, lessonIndex);
                        }}>
                          {openLessons[unitIndex][lessonIndex] ? '▲' : '▶'}
                        </span>
                      </div>
                      {openLessons[unitIndex][lessonIndex] && (
                          <div>
                              <TeacherProgressBox lessonId={lesson.lesson_id} />
                          </div>
                      )}
                    </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {editingLesson && (
        <div className="modal-overlay" style={{ top: `${modalScrollTop}px` }}>
          <div className="modal-content">
            <h2>{isCreating ? 'Create Lesson Data' : 'Edit Lesson'}</h2>
            <label>
              Lesson Name:
              <input
                type="text"
                value={editedData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </label>
            <label>
              Status:
              <select
                value={editedData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="not-started">Not Started</option>
                <option value="locked">Locked</option>
              </select>
            </label>
            <label>
              Due Date:
                <input
                  type="date"
                  className={shake ? "shake" : ""} 
                  value={editedData.status === "locked" ? "" : editedData.dueDate || ""}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  placeholder={editedData.status === "locked" ? "mm/dd/yyyy" : ""}
                  disabled={editedData.status === "locked"}
                />
            </label>
            <label>
                Goal Level:
                <input
                  type="number"
                  value={editedData.goalLevel || ''} // Allow empty string for typing
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      handleInputChange('goalLevel', value); 
                    } else {
                      const numericValue = parseInt(value, 10);
                      if (!isNaN(numericValue) && numericValue >= 1 && numericValue <= 20) {
                        handleInputChange('goalLevel', numericValue);
                      }
                    }
                  }}
                  min="1"
                  max="20"
                  step="1"
                  placeholder="Enter a value between 1 and 20"
                />
              </label>

            <div className="modal-actions">
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherUnitList;