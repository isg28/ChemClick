import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/profile/ProfileUnitList.css';
import { fetchLessonMastery, fetchUpdatedLessonProgress } from '../../components/question/LessonUtils';

function ProfileUnitList({ units, currentUnit }) {
  const navigate = useNavigate();
  const [openUnits, setOpenUnits] = useState(units.map(() => false));
  const studentId = localStorage.getItem('studentId'); 
  const teacherId = localStorage.getItem('teacherId'); 
  const isTeacher = !!teacherId;  
  const userId = isTeacher ? teacherId : studentId; 
  const [masteryLevels, setMasteryLevels] = useState({});
  const [updatedLessonProgress, setUpdatedLessonProgress] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchMasteryData = async () => {
      if (userId) {
        await fetchLessonMastery(userId, isTeacher, setMasteryLevels);
        setIsLoading(false); 
      }
    };
    fetchMasteryData();
  }, [userId, isTeacher]); 

  const toggleUnit = async (index, unitLessons = []) => {
    if (!userId) {
        console.error("Missing userId!");
        return;
    }

    setIsLoading(true); 

    const newOpenUnits = [...openUnits];
    newOpenUnits[index] = !newOpenUnits[index];
    setOpenUnits(newOpenUnits);

    if (newOpenUnits[index]) {
        const updates = {};
        await Promise.all(
            unitLessons.map(async (lesson) => {
                let studentProgress = {};
                let teacherProgress = {};
                let lessonDetails = {};

                try {
                    studentProgress = !isTeacher
                        ? await fetchUpdatedLessonProgress(userId, lesson.lesson_id, false) || {}
                        : {};
                } catch (error) {
                    console.error(`Failed to fetch student progress for ${lesson.lesson_id}`, error);
                }

                try {
                    teacherProgress = isTeacher
                        ? await fetchUpdatedLessonProgress(userId, lesson.lesson_id, true) || {}
                        : {};
                } catch (error) {
                    console.error(`Failed to fetch teacher progress for ${lesson.lesson_id}`, error);
                }

                try {
                    const isLocal = window.location.hostname.includes('localhost');

                    const BASE_URL = isLocal
                      ? 'http://localhost:8000'
                      : 'https://chemclick.onrender.com'
                    const lessonDetailsResponse = await fetch(`${BASE_URL}/lessons/${lesson.lesson_id}`);
                    lessonDetails = lessonDetailsResponse.ok ? await lessonDetailsResponse.json() : {};
                } catch (error) {
                    console.error(`Failed to fetch lesson details for ${lesson.lesson_id}`, error);
                }

                const hasProgressData = Object.keys(studentProgress).length > 0 || Object.keys(teacherProgress).length > 0;
                const wasLate = studentProgress?.is_late || teacherProgress?.is_late || false;
                const studentCompleted = studentProgress?.completion_timestamp;
                const teacherCompleted = teacherProgress?.completion_timestamp;
                const completedTimestamp = studentCompleted || teacherCompleted || null;

                let status;
                if (!hasProgressData) {
                    if (lessonDetails?.status === "locked") {
                        status = "locked";
                    } else if (lessonDetails?.status === "completed" || lessonDetails?.status === "in-progress") {
                        status = "not-started";
                    } else {
                        status = "not-started";
                    }
                } else if (wasLate) {
                    status = "late";  
                } else if (completedTimestamp) {
                    status = "completed";
                } else {
                    status = lessonDetails?.status || "not-started";
                }

                updates[lesson.lesson_id] = {
                    studentData: studentProgress,
                    teacherProgress: teacherProgress,
                    lessonDetails: lessonDetails || { status: "locked" },
                    status: status,
                    dueDate: lessonDetails?.due_date || "No Due Date",
                };
            })
        );

        setUpdatedLessonProgress((prev) => ({ ...prev, ...updates }));
    }

    setIsLoading(false); 
  };




  const checkLessonsCompleted = (unit) => {
    // check if all lessons are completed
    if (unit.lessons.every((lesson) => {
      const lessonData = updatedLessonProgress[lesson.lesson_id] || lesson;
      return lessonData.status === 'completed';
    })) return "Completed"; 
    
    if (unit.lessons.every((lesson) => {
      const lessonData = updatedLessonProgress[lesson.lesson_id] || lesson;
      return lessonData.status === 'locked';
    })) return "Locked";
    
    return "Work In-Progress";
  };

  const getStatusText = (lessonData) => {
    const { status } = lessonData;

    switch (status) {
        case "late":
            return "Late";
        case "locked":
            return "Locked";
        case "not-started":
            return "Not Started";
        case "in-progress":
            return "In Progress";
        case "completed":
            return "Completed";
        default:
            return "N/A";
    }
  };

  const handlePrintCertificate = (unit) => {
    if(checkLessonsCompleted(unit) === 'Completed')
      navigate('/congrats');
  };


  if (isLoading) {
    return <div className="loading-container"><h2>Loading...</h2></div>;
  }

  const deleteTeacherProgress = async (lessonId) => {
    if (!teacherId) return;

    const confirmDelete = window.confirm("Are you sure you want to delete this progress?");
    if (!confirmDelete) return;

    try {
        const isLocal = window.location.hostname.includes('localhost');

        const BASE_URL = isLocal
          ? 'http://localhost:8000'
          : 'https://chemclick.onrender.com'
        const response = await fetch(`${BASE_URL}/teacherLessons/progress/${teacherId}/${lessonId}/`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete progress");
        }

        alert("Progress deleted successfully!");
        window.location.reload(); 

    } catch (error) {
        console.error("Error deleting progress:", error);
    }
  };

  const deleteTeacherUnitProgress = async (unit) => {
    if (!teacherId || unit.lessons.length === 0) return;

    // Extract the unit number (X from lessonX.Y)
    const unitNumber = unit.number; 

    const confirmDelete = window.confirm(
        `Are you sure you want to delete all progress for Unit: ${unitNumber}?`
    );
    if (!confirmDelete) return;

    try {
        const lessonsToDelete = unit.lessons.filter((lesson) =>
            lesson.lesson_id.startsWith(unitNumber + ".")
        );
        // Loop through all lessons in the unit and send DELETE requests
        const isLocal = window.location.hostname.includes('localhost');

        const BASE_URL = isLocal
          ? 'http://localhost:8000'
          : 'https://chemclick.onrender.com'
        await Promise.all(
            unit.lessons.map(async (lesson) => {
                const response = await fetch(
                    `${BASE_URL}/teacherLessons/progress/${teacherId}/${lesson.lesson_id}/`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                if (!response.ok) {
                    console.error(`Failed to delete progress for lesson ${lesson.lesson_id}`);
                }
            })
        );

        alert(`All progress for Unit: ${unitNumber} deleted successfully!`);
        window.location.reload();
    } catch (error) {
        console.error("Error deleting unit progress:", error);
    }
  };

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
            <div className="profileunit-title" onClick={() => toggleUnit(unitIndex, unit.lessons)}>
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
                          {unit.lessons.map((lesson, lessonIndex) => {
                              const lessonData = updatedLessonProgress[lesson.lesson_id] || lesson;
                              const rawProgress = Number(masteryLevels[lesson.lesson_id]) || 0;
                              const formattedProgress = rawProgress % 1 === 0 ? rawProgress.toFixed(0) : rawProgress.toFixed(1);

                              return (
                                  <tr key={lessonIndex}>
                                      <td className="lessonResultstableCell">{lesson.name}</td>
                                      <td className="timeResultsTableCell">
                                          {getStatusText(lessonData)} 
                                      </td>
                                      <td className="QAresultsTableCell">
                                        {formattedProgress}%
                                        {isTeacher && (
                                            <span 
                                                className="delete-icon" 
                                                onClick={() => deleteTeacherProgress(lesson.lesson_id)}
                                                title="Delete Progress"
                                            >
                                                🗑️
                                            </span>
                                        )}
                                    </td>
                                  </tr>
                              );
                          })}
                      </tbody>

                      </table>

                      <table className="printResultsExpandedTable">
                        <thead>
                        <tr>
                          {isTeacher ? (
                            <button 
                            className='deleteAllButton' 
                            onClick={() => deleteTeacherUnitProgress(unit)} 
                            disabled={unit.lessons.length === 0}
                          >
                            Delete All Progress for Unit {unit.number}
                          </button>
                          ) : (
                            <button 
                              className='printButton' 
                              onClick={() => handlePrintCertificate(unit)}
                              disabled={checkLessonsCompleted(unit) !== "Completed"}
                            >
                              Click to Print Certificate
                            </button>
                          )}
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