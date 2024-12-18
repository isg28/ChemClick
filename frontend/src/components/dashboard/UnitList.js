import React, { useState } from 'react';
import '../../styles/dashboard/UnitList.css';

function UnitList({ units, currentUnit, onLessonClick }) {
  const [openUnits, setOpenUnits] = useState(units.map(() => false));

  const toggleUnit = (index) => {
    const newOpenUnits = [...openUnits];
    newOpenUnits[index] = !newOpenUnits[index];
    setOpenUnits(newOpenUnits);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'completed-lesson';
      case 'in-progress':
        return 'in-progress-lesson';
      case 'locked':
        return 'locked-lesson';
      default:
        return '';
    }
  };

  const getStatusText = (lesson) => {
    if (lesson.status === 'completed') {
      const submittedText = lesson.submittedLate ? `Submitted (late)` : `Submitted`;
      return (
        <span className="status-text">
          {submittedText}
        </span>
      );
    }
    if (lesson.status === 'in-progress') {
      return (
        <span className="status-text">
          In Progress, Due: {lesson.dateDue}
        </span>
      );
    }
    if (lesson.status === 'locked') {
      return (
        <span className="status-text">
          Due: [LOCKED]
        </span>
      );
    }
    return (
      <span className="status-text">
        Past Due: {lesson.dateDue}
      </span>
    );
  };

  return (
    <div className="unitlist-container">
      <div className="unitlist-header">
        <h1>Units</h1>
      </div>

      <div className="unitlist-content">
        {units.map((unit, index) => (
          <div
            key={index}
            className={`unit-item ${currentUnit === unit.number ? 'current-unit' : ''}`}
          >
            <div className="unit-title" onClick={() => toggleUnit(index)}>
              <span className="unit-number">{unit.number}</span>
              <span className="unit-text">{unit.title}</span>
              <span className="triangle">{openUnits[index] ? '▲' : '▶'}</span>
            </div>
            {openUnits[index] && (
              <div className="unit-details">
                <ul>
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <li 
                      key={lessonIndex} 
                      className={`${getStatusClass(lesson.status)} lesson-item`}
                    >
                      <span 
                        onClick={() => lesson.route && onLessonClick(lesson.route)}
                        style={{ cursor: lesson.route ? 'pointer' : 'default' }}
                      >
                        {lessonIndex + 1}. {lesson.name}
                      </span>
                      <span 
                        className="due-date" 
                        style={{ cursor: lesson.status === 'in-progress' || lesson.status === 'locked' ? 'default' : 'pointer' }}
                      >
                        {getStatusText(lesson)}
                        {lesson.status === 'completed' && (
                          <span className="tooltip">
                            Due: {lesson.dateDue} <br />
                            Submitted on: {lesson.dateSubmitted}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UnitList;
