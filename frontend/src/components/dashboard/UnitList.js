import React, { useState } from 'react';
import '../../styles/dashboard/UnitList.css';

function UnitList({ units, currentUnit }) {
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
                      className={getStatusClass(lesson.status)}
                    >
                      <span>{lessonIndex + 1}. {lesson.name} </span>
                      <span className="due-date">Due: {lesson.dateDue}</span>
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
