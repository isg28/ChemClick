import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/profile/ProfileUnitList.css';
import {fetchLessonMastery} from '../../components/question/LessonUtils';


function ProfileUnitList({ units, currentUnit }) {
  const navigate = useNavigate();
  const [openUnits, setOpenUnits] = useState(units.map(() => false));
  const studentId = localStorage.getItem('studentId'); 
  const teacherId = localStorage.getItem('teacherId'); 
  
  const isTeacher = !!teacherId;  
  const userId = isTeacher ? teacherId : studentId; 
    const [masteryLevels, setMasteryLevels] = useState({});


  const toggleUnit = (index) => {
    const newOpenUnits = [...openUnits];
    newOpenUnits[index] = !newOpenUnits[index];
    setOpenUnits(newOpenUnits);

};


  const checkLessonsCompleted = (unit) => {
    if (unit.lessons.every((lesson) => lesson.status === 'completed')) return "Completed";
    if (unit.lessons.every((lesson) => lesson.status === 'locked')) return "Locked";
    return "Work In-Progress";
  };

  const getStatusText = (status) => {
    if (status === 'locked') return 'Locked';
    if (status === 'not-started') return 'Not Started'
    if (status === 'in-progress') return 'In Progress'
    if (status === 'completed') return 'Completed';
    return 'N/A';
  };

  const handlePrintCertificate = (unit) => {
    if(checkLessonsCompleted(unit) === 'Completed')
      navigate('/congrats');
  };

  useEffect(() => {
    if (userId) {
        fetchLessonMastery(userId, isTeacher, setMasteryLevels);
    }
  }, [userId, isTeacher]); 


  return (
    <div className="profileunitlist-container">
      <div className="profileunitlist-header">
        <h1>Your Progress</h1> 
      </div>

      <div className="profileunitlist-content">
        {units.map((unit, unitIndex) => (
          <div
            key={unitIndex}
            className={`profileunit-item ${currentUnit === unit.number ? 'profilecurrent-unit' : ''}`}
          >
            <div className="profileunit-title" onClick={() => toggleUnit(unitIndex)}>
              <span className="profileunit-number">{unit.number}</span>
              <span className="profileunit-text">{unit.title}</span>
              <span className="profiletriangle">{openUnits[unitIndex] ? '▲' : '▶'}</span>
            </div>
            {openUnits[unitIndex] && (
              <div className="profileunit-details">
                <div className="expandedColorBox">
                  <div className="overflowContainer">
                    <>
                      <table className="dateResultsExpandedTable">
                        <thead>
                          <tr>
                            <th className="DateResultstableHeader"> Unit Status: {checkLessonsCompleted(unit)} </th>
                          </tr>
                        </thead>
                      </table>

                      <table className="resultsExpandedTable">
                      <thead>
                          <tr>
                            <th className="lessonResultstableHeader">Lesson</th>
                            <th className="timeResultsTableHeader">Progression Status</th>
                            <th className="QAresultstableHeader">Mastery Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {unit.lessons.map((lesson, lessonIndex) => (
                            <tr key={lessonIndex}>
                              <td className="lessonResultstableCell">{lesson.name}</td>
                              <td className="timeResultsTableCell">{getStatusText(lesson.status) || 'N/A'}</td>
                              <td className="QAresultsTableCell">{(masteryLevels[lesson.lesson_id] ?? 0) + '%'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <table className="printResultsExpandedTable">
                        <thead>
                          <tr>
                            <button 
                              className='printButton' 
                              onClick={() => handlePrintCertificate(unit)}
                              disabled={/Locked|Work In-Progress/.test(checkLessonsCompleted(unit))}
                              >
                                Click to Print Certificate
                              </button>
                          </tr>
                        </thead>
                      </table>
                    </>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileUnitList;