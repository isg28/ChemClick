import React, { useState } from 'react';
import '../../styles/teacherdashboard/TeacherUnitList.css';
import TableSearch from './TeacherTableSearch';

function TeacherUnitList({ units, currentUnit }) {
  const [openUnits, setOpenUnits] = useState(units.map(() => false));
  const [openLessons, setOpenLessons] = useState(units.map(() => units[0].lessons.map(() => false)));

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

  return (
    <div className="unitlist-container">
      <div className="unitlist-header">
        <h1>Student Progress</h1>
      </div>

      <div className="unitlist-content">
        {units.map((unit, unitIndex) => (
          <div
            key={unitIndex}
            className={`unit-item ${currentUnit === unit.number ? 'current-unit' : ''}`}
          >
            <div className="unit-title" onClick={() => toggleUnit(unitIndex)}>
              <span className="unit-number">{unit.number}</span>
              <span className="unit-text">{unit.title}</span>
              <span className="triangle">{openUnits[unitIndex] ? '▲' : '▶'}</span>
            </div>
            {openUnits[unitIndex] && (
              <div className="unit-details">
                <ul>
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <li 
                      key={lessonIndex} 
                      className={getStatusClass(lesson.status)}
                    >
                      <div className="unit-title">
                        <span>{lessonIndex + 1}. {lesson.name} </span>
                        <span className="due-date">Due: {lesson.dateDue}</span>
                        <span className="triangle" onClick={(e) => {
                          e.stopPropagation(); // Prevent the unit toggle when clicking the triangle
                          toggleLesson(unitIndex, lessonIndex);
                        }}>
                          {openLessons[unitIndex][lessonIndex] ? '▲' : '▶'}
                        </span>
                      </div>
                      {openLessons[unitIndex][lessonIndex] && (
                        <div>
                          <TableSearch/>
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
    </div>
  );
}

export default TeacherUnitList;
