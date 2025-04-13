import React, { useState, useEffect } from 'react';
import '../../styles/dashboard/UnitList.css';
import { fetchUpdatedLessonProgress } from '../../components/question/LessonUtils';

function UnitList({ units, currentUnit, onLessonClick, progressData, userId, isTeacher }) {
  const [openUnits, setOpenUnits] = useState(units.map(() => false));
  const [updatedLessonProgress, setUpdatedLessonProgress] = useState({});
  const [loadedUnit, setLoadedUnits] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const preFetchUnits = async () => {
      if (!userId) {
        console.error("Missing userId!");
        return;
      }

      const updates = {};
      for (const unit of units) {
        for (const lesson of unit.lessons) {
          updates[lesson.lesson_id] = { status: "loading" }; 
        }
      }
      setUpdatedLessonProgress(updates);
      setLoading(false); 
    };

    preFetchUnits();
  }, [userId, units]);

  const toggleUnit = async (index, unitLessons = []) => {
    if (!userId) {
        console.error("Missing userId!");
        return;
    }

    const newOpenUnits = [...openUnits];
    newOpenUnits[index] = !newOpenUnits[index];
    setOpenUnits(newOpenUnits);

    if (newOpenUnits[index] && !loadedUnit[index]) {
        const updates = {};
        for (const lesson of unitLessons) {
          updates[lesson.lesson_id] = { status: "loading" };
      }

        for (const lesson of unitLessons) {
            let studentProgress = {};
            let teacherProgress = {};
            let lessonDetails = {};

            // Fetch student progress
            if (!isTeacher) {
                try {
                    studentProgress = await fetchUpdatedLessonProgress(userId, lesson.lesson_id, false) || {};
                } catch (error) {
                    console.error(`Failed to fetch student progress for lesson ${lesson.lesson_id}`, error);
                }
            }

            // Fetch teacher progress
            if (isTeacher) {
                try {
                    teacherProgress = await fetchUpdatedLessonProgress(userId, lesson.lesson_id, true) || {};
                } catch (error) {
                    console.error(`Failed to fetch teacher progress for lesson ${lesson.lesson_id}`, error);
                }
            }

            // Fetch lesson details
            try {
                const lessonDetailsResponse = await fetch(`http://localhost:8000/lessons/${lesson.lesson_id}`);
                lessonDetails = lessonDetailsResponse.ok ? await lessonDetailsResponse.json() : {};
            } catch (error) {
                console.error(`Failed to fetch lesson details for ${lesson.lesson_id}`, error);
            }

            const wasLate = studentProgress?.is_late || teacherProgress?.is_late || false;

            const studentCompleted = studentProgress?.completion_timestamp;
            const teacherCompleted = teacherProgress?.completion_timestamp;
            const completedTimestamp = studentCompleted || teacherCompleted || null;

            // Determine lesson status
            let status = completedTimestamp
                ? "completed"
                : lessonDetails?.status || "not-started";

            // If the lesson was late and not completed, mark as "Late"
            if (wasLate && !completedTimestamp) {
                status = "late";
            }

            // If lesson was submitted after being late, show "Submitted Late"
            if (wasLate && completedTimestamp) {
                status = "submitted-late";
            }

            updates[lesson.lesson_id] = {
                studentData: studentProgress,
                teacherProgress: teacherProgress,
                lessonDetails: lessonDetails || { status: "locked" },
                status: status,
                dueDate: lessonDetails?.due_date || "No Due Date",
            };
        }
        setUpdatedLessonProgress((prev) => ({ ...prev, ...updates }));
        setLoadedUnits((prev) => ({ ...prev, [index]: true }));
    }
  };

  const getStatusClass = (status, studentData, teacherProgress, lessonDetails) => {
    const studentCompleted = studentData?.completion_timestamp || teacherProgress?.completion_timestamp;
    const lessonInProgress = lessonDetails?.status === "in-progress"; 
    const wasLate = studentData?.is_late || teacherProgress?.is_late || false;

    if (studentCompleted && wasLate) {
        return "submitted-late-lesson";
    }

    if (studentCompleted && lessonInProgress) {
        return "completed-lesson in-progress-lesson"; 
    }

    switch (status) {
        case "completed":
            return "completed-lesson";
        case "submitted-late":
            return "submitted-late-lesson";  
        case "in-progress":
            return "in-progress-lesson";
        case "locked":
            return "locked-lesson";
        case "late":
            return "late-lesson"; 
        default:
            return "";
    }
  };

  const getStatusText = (lesson) => {
    const updatedLesson = updatedLessonProgress[lesson.lesson_id] || lesson;
    if (updatedLesson.status === "loading") {
      return <span className="status-text">Loading...</span>;
    }
    const wasLate = updatedLesson.studentData?.is_late || updatedLesson.teacherProgress?.is_late || false;
    const submitted = updatedLesson.studentData?.completion_timestamp || updatedLesson.teacherProgress?.completion_timestamp;
    const dueDate = formatDate(updatedLesson.dueDate);
    
    const submittedDate = submitted
        ? new Date(submitted).toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        })
        : null;

    if (wasLate && submitted) {
        return ;
    }

    if (submitted) {
        return (
          <span className="status-text">
            Submitted
          </span> // NOT LATE
        );
    }

    switch (updatedLesson.status) {
        case 'in-progress':
            return <span className="status-text">In Progress, Due: {dueDate}</span>;

        case 'not-started':
            return <span className="status-text">Not Started</span>;

        case 'locked':
            return <span className="status-text">Due: [LOCKED]</span>;

        default:
            return <span className="status-text">Past Due: {dueDate || "Unknown"}</span>;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "No Due Date") return "No Due Date";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; 
  
    const options = { month: "long", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };  

  if (loading) {
    return <div className="loading-spinner">Loading...</div>; 
  }

  return (
    <div className="unitlist-container">
      <div className="unitlist-header">
        <h1>Units</h1>
      </div>

      <div className="unitlist-content">
        {units.map((unit, index) => (
          <div key={index} className={`unit-item ${currentUnit === unit.number ? 'current-unit' : ''}`}>
            <div className="unit-title" onClick={() => toggleUnit(index, unit.lessons)}>
              <span className="unit-number">{unit.number}</span>
              <span className="unit-text">{unit.title}</span>
              <span className="triangle">{openUnits[index] ? '▲' : '▶'}</span>
            </div>
            {openUnits[index] && (
              <div className="unit-details">
                <ul>
                  {unit.lessons.map((lesson, lessonIndex) => {
                    const lessonData = updatedLessonProgress[lesson.lesson_id] || lesson;
                    const rawProgress = progressData[lesson.lesson_id] ?? 0;
                    const formattedProgress =
                      rawProgress % 1 === 0 ? rawProgress.toFixed(0) : rawProgress.toFixed(1);
                      return (
                        <li 
                          key={lessonIndex} 
                          className={`lesson-item ${getStatusClass(
                              lessonData.status, 
                              lessonData.studentData, 
                              lessonData.teacherProgress,  
                              lessonData.lessonDetails     
                          )}`}
                        >
                        <div className="lesson-info">
                        <span
                          className={`${lessonData.status === "locked" ? "locked-cursor" : ""}`}
                          style={{
                            cursor:
                              isTeacher || ["not-started", "in-progress", "late", "completed", "submitted-late"].includes(lessonData.status)
                                ? "pointer"
                                : "not-allowed",
                          }}
                          
                          onClick={() => {
                            if (isTeacher) {
                              onLessonClick(lesson.route);
                              return;
                            }

                            const status = lessonData.status;
                            const allowedStatuses = ["not-started", "in-progress", "late", "completed"];
                            if (allowedStatuses.includes(status)) {
                              onLessonClick(lesson.route);
                            } else {
                              alert("This lesson is currently locked.");
                            }
                          }}
                        >
                          {lessonIndex + 1}. {lesson.name}
                        </span>

                        {/* Show Demo link for locked lessons if teacher */}
                        {isTeacher && lessonData.status === "locked" && (
                          <span
                            className="demo-link"
                            onClick={() => onLessonClick(lesson.route)}
                            style={{ marginLeft: '6px' }}
                          >
                            (Demo)
                          </span>
                        )}


                        </div>
                        <div className="due-date-container">
                          <span className="due-date">
                            {getStatusText(lesson)}
                            {lessonData.status === 'completed'  && (
                              <span className="tooltip">
                                Due: {formatDate(lessonData.dueDate)} <br />
                                Submitted on: {lessonData.teacherProgress?.completion_timestamp || lessonData.studentData?.completion_timestamp
                                    ? new Date(
                                        lessonData.teacherProgress?.completion_timestamp || lessonData.studentData?.completion_timestamp
                                      ).toLocaleString("en-US", {
                                        timeZone: "America/Los_Angeles",
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                      })
                                    : " "}
                              </span>
                              )}
                              {lessonData.status === 'submitted-late'  && (
                              <span className="status-text submitted-late-lesson">
                                Submitted Late
                                <span className="tooltip">
                                  Past Due: {formatDate(lessonData.dueDate)} <br />
                                  Submitted on: {lessonData.teacherProgress?.completion_timestamp || lessonData.studentData?.completion_timestamp
                                      ? new Date(
                                          lessonData.teacherProgress?.completion_timestamp || lessonData.studentData?.completion_timestamp
                                        ).toLocaleString("en-US", {
                                          timeZone: "America/Los_Angeles",
                                          year: "numeric",
                                          month: "2-digit",
                                          day: "2-digit",
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: true,
                                        })
                                      : " "}
                                </span>
                              </span>
                            )}
                          </span>
                          {lessonData.status !== 'locked' && (
                            <div className="progress-bar-container">
                              <div className="progress-bar" style={{ width: `${rawProgress}%` }}></div>
                            </div>
                          )}
                        </div>
                      </li>
                    );
                  })}
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
