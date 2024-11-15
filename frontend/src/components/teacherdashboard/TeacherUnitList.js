import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/teacherdashboard/TeacherUnitList.css';
import TeacherProgressBox from "./TeacherStudentProgress";

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
  const navigate = useNavigate();
    const handleClickToBegin = () => {
        navigate('/statistics');
    };

  const getStatusClass = (status) => {
    switch (status) {
      case 'teachercompleted':
        return 'teachercompleted-lesson';
      case 'teacherin-progress':
        return 'teacherin-progress-lesson';
      case 'teacherlocked':
        return 'teacherlocked-lesson';
      default:
        return '';
    }
  };

  return (
    <div className="teacherunitlist-container">
      <div className="teacherunitlist-header">
        <h1>Student Progress</h1> 
      </div>
      <div className='unit-student-progress-button'>
            <h3 onClick = {handleClickToBegin} >View Full Statistics</h3> 
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
                        <span>{lessonIndex + 1}. {lesson.name} </span>
                        <span className="teacherdue-date">Due: {lesson.dateDue}</span>
                        <span className="teachertriangle" onClick={(e) => {
                          e.stopPropagation(); // Prevent the unit toggle when clicking the triangle
                          toggleLesson(unitIndex, lessonIndex);
                        }}>
                          {openLessons[unitIndex][lessonIndex] ? '▲' : '▶'}
                        </span>
                      </div>
                      {openLessons[unitIndex][lessonIndex] && (
                        <div>
                          <TeacherProgressBox/>
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
