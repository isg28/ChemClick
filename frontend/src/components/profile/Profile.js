import React, { useState, useEffect, useCallback } from 'react';
import ProfileHeader from './ProfileHeader';
import ProfileUnitList from './ProfileUnitList';
import '../../styles/profile/Profile.css';

function Profile() {
  const [unitData, setUnitData] = useState([]);
  const [currentUnit, setCurrentUnit] = useState(1);
  const [loading, setLoading] = useState(true); 

  const fetchLessonData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8000/lessons/'); 
      const lessons = await response.json();
      const updatedUnits = [
        {
          unit_id: 1,
          number: 1,
          title: "Uncertainty of Measurement: Visible Scale",
          lessons: [
            { lesson_id: "lesson1.1", unit_id: 1,  ...getLessonData(lessons, "lesson1.1") },
            { lesson_id: "lesson1.2", unit_id: 1, ...getLessonData(lessons, "lesson1.2") },
            { lesson_id: "lesson1.3", unit_id: 1, ...getLessonData(lessons, "lesson1.3") },
            { lesson_id: "lesson1.4", unit_id: 1, ...getLessonData(lessons, "lesson1.4") },
            { lesson_id: "lesson1.5", unit_id: 1, ...getLessonData(lessons, "lesson1.5") },
            { lesson_id: "lesson1.6", unit_id: 1, ...getLessonData(lessons, "lesson1.6") },
            { lesson_id: "lesson1.7", unit_id: 1, ...getLessonData(lessons, "lesson1.7") },
            { lesson_id: "lesson1.8", unit_id: 1, ...getLessonData(lessons, "lesson1.8") },
            { lesson_id: "lesson1.9", unit_id: 1, ...getLessonData(lessons, "lesson1.9") },
            { lesson_id: "lesson1.10", unit_id: 1, ...getLessonData(lessons, "lesson1.10") },
            { lesson_id: "lesson1.11", unit_id: 1, ...getLessonData(lessons, "lesson1.11") },
            { lesson_id: "lesson1.12", unit_id: 1, ...getLessonData(lessons, "lesson1.12") },
          ]
        },
        {
          unit_id: 2,
          number: 2,
          title: "Uncertainty in Measurements (Digital Scale-Balance)",
          lessons: [
            { lesson_id: "lesson2.1", unit_id: 2, ...getLessonData(lessons, "lesson2.1") },
            { lesson_id: "lesson2.2", unit_id: 2, ...getLessonData(lessons, "lesson2.2") },
            { lesson_id: "lesson2.3", unit_id: 2, ...getLessonData(lessons, "lesson2.3") },
            { lesson_id: "lesson2.4", unit_id: 2, ...getLessonData(lessons, "lesson2.4") },
            { lesson_id: "lesson2.5", unit_id: 2, ...getLessonData(lessons, "lesson2.5") },
            { lesson_id: "lesson2.6",  unit_id: 2, ...getLessonData(lessons, "lesson2.6") },
          ]
        },
        {
          unit_id: 3,
          number: 3,
          title: "Atomic Structure",
          lessons: [
            { lesson_id: "lesson3.1", unit_id: 3, ...getLessonData(lessons, "lesson3.1") },
            { lesson_id: "lesson3.2", unit_id: 3, ...getLessonData(lessons, "lesson3.2") },
          ]
        },
        {
          unit_id: 4,
          number: 4,
          title: "Periodic Table Classification",
          lessons: [
            { lesson_id: "lesson4.1", unit_id: 4, ...getLessonData(lessons, "lesson4.1") },
            { lesson_id: "lesson4.2", unit_id: 4, ...getLessonData(lessons, "lesson4.2") },
            { lesson_id: "lesson4.3", unit_id: 4, ...getLessonData(lessons, "lesson4.3") },
            { lesson_id: "lesson4.4", unit_id: 4, ...getLessonData(lessons, "lesson4.4") },
            { lesson_id: "lesson4.5", unit_id: 4, ...getLessonData(lessons, "lesson4.5") },
          ]
        },
        {
          unit_id: 5,
          number: 5,
          title: "Periodic Trends (Valence Electrons)",
          lessons: [
            { lesson_id: "lesson5.1", unit_id: 5, ...getLessonData(lessons, "lesson5.1") },
            { lesson_id: "lesson5.2", unit_id: 5, ...getLessonData(lessons, "lesson5.2") },
            { lesson_id: "lesson5.3", unit_id: 5, ...getLessonData(lessons, "lesson5.3") },
            { lesson_id: "lesson5.4", unit_id: 5, ...getLessonData(lessons, "lesson5.4") },
            { lesson_id: "lesson5.5", unit_id: 5, ...getLessonData(lessons, "lesson5.5") },
            { lesson_id: "lesson5.6", unit_id: 5, ...getLessonData(lessons, "lesson5.6") },
            { lesson_id: "lesson5.7", unit_id: 5, ...getLessonData(lessons, "lesson5.7") },
            { lesson_id: "lesson5.8", unit_id: 5, ...getLessonData(lessons, "lesson5.8") },
            { lesson_id: "lesson5.9", unit_id: 5, ...getLessonData(lessons, "lesson5.9") },
            { lesson_id: "lesson5.10", unit_id: 5, ...getLessonData(lessons, "lesson5.10") },
          ]
        },
        {
          unit_id: 6,
          number: 6,
          title: "Forming Monatomic Ions",
          lessons: [
            { lesson_id: "lesson6.1", unit_id: 6, ...getLessonData(lessons, "lesson6.1") },
            { lesson_id: "lesson6.2", unit_id: 6, ...getLessonData(lessons, "lesson6.2") },
            { lesson_id: "lesson6.3", unit_id: 6, ...getLessonData(lessons, "lesson6.3") },
            { lesson_id: "lesson6.4", unit_id: 6, ...getLessonData(lessons, "lesson6.4") },

          ]
        },
        {
          unit_id: 7,
          number: 7,
          title: "Periodic Trends (Using group number to predict charge of monatomic ion)",
          lessons: [
            { lesson_id: "lesson7.1", unit_id: 7, ...getLessonData(lessons, "lesson7.1") },
            { lesson_id: "lesson7.2", unit_id: 7, ...getLessonData(lessons, "lesson7.2") },
            { lesson_id: "lesson7.3", unit_id: 7, ...getLessonData(lessons, "lesson7.3") },
            { lesson_id: "lesson7.4", unit_id: 7, ...getLessonData(lessons, "lesson7.4") },
            { lesson_id: "lesson7.5", unit_id: 7, ...getLessonData(lessons, "lesson7.5") },
            { lesson_id: "lesson7.6", unit_id: 7, ...getLessonData(lessons, "lesson7.6") },
            { lesson_id: "lesson7.7", unit_id: 7, ...getLessonData(lessons, "lesson7.7") },
            { lesson_id: "lesson7.8", unit_id: 7, ...getLessonData(lessons, "lesson7.8") },
            { lesson_id: "lesson7.9", unit_id: 7, ...getLessonData(lessons, "lesson7.9") },
            { lesson_id: "lesson7.10", unit_id: 7, ...getLessonData(lessons, "lesson7.10") },
          ]
        },
        {
          unit_id: 8,
          number: 8,
          title: "Forming Ionic Compounds",
          lessons: [
            { lesson_id: "lesson8.1", unit_id: 8, ...getLessonData(lessons, "lesson8.1") },
          ]
        },
        {
          unit_id: 9,
          number: 9,
          title: "Writing the Formula of Ionic Compounds",
          lessons: [
            { lesson_id: "lesson9.1", unit_id: 9, ...getLessonData(lessons, "lesson9.1") },
            { lesson_id: "lesson9.2", unit_id: 9, ...getLessonData(lessons, "lesson9.2") },
          ]
        }
      ];
      setUnitData(updatedUnits);
      const current = determineCurrentUnit(updatedUnits);
      setCurrentUnit(current);

    } catch (error) {
      console.error('Error fetching lesson data:', error);
    } finally {
      setLoading(false);
    }
  }, ([]));

  const getLessonData = (lessons, lessonId) => {
    const lesson = lessons.find((l) => l.lesson_id === lessonId);
    return {
      name: lesson?.name || "Unnamed Lesson",
      status: lesson?.status || "locked",
      dateDue: lesson?.due_date || "[LOCKED]"
    };
  };

  const determineCurrentUnit = (units) => {
    for (let i = 0; i < units.length; i++) {
      const unit = units[i];
      if (unit.lessons.some((lesson) => lesson.status === "in-progress")) {
        return unit.number;
      }
    }
    return 1; // Default to unit 1 if no in-progress lessons are found
  };

  useEffect(() => {
    fetchLessonData();
  }, [fetchLessonData]);

  return (
    <div className="Profile">
      <ProfileHeader />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProfileUnitList units={unitData} currentUnit={currentUnit} />
      )}
    </div>
  );
}

export default Profile;
