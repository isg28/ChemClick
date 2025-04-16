import React, { useEffect, useState } from 'react';
import DashboardHeader from './DashboardHeader';
import WelcomeBanner from './WelcomeBanner';
import ClickToBegin from './ClickToBegin';
import Announcements from './Announcements';
import UnitList from './UnitList';
import '../../styles/dashboard/Dashboard.css';
import { useNavigate } from 'react-router-dom';



function Dashboard() {
  const navigate = useNavigate();
  const [unitData, setUnitData] = useState([]); 
  const [currentUnit, setCurrentUnit] = useState(1); 
  const [loading, setLoading] = useState(true); 
  const [announcements, setAnnouncements] = useState([]);
  const [progressData, setProgressData] = useState({});

  const studentId = localStorage.getItem('studentId'); 
  const teacherId = localStorage.getItem('teacherId'); 
  
  const isTeacher = Boolean(teacherId);
  const userId = isTeacher ? teacherId : studentId;
  
  if (isTeacher) {
      console.log("Logged in as Teacher");
      console.log("Teacher ID:", teacherId);
      localStorage.removeItem('studentId');  // Remove student ID to prevent conflicts
  } else {
      console.log("Logged in as Student");
      console.log("Student ID:", studentId);
      localStorage.removeItem('teacherId');  // Remove teacher ID to prevent conflicts
  }
  
  console.log("Student ID:", studentId);
  console.log("Teacher ID:", teacherId);
  console.log("User ID:", userId);
  console.log("Is Teacher:", isTeacher);
  
  const numberToWord = (num) => {
    const numWords = [
      "Zero", "One", "Two", "Three", "Four", 
      "Five", "Six", "Seven", "Eight", "Nine", 
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", 
      "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen", "Twenty"
    ];

    if (num < 21) {
      return numWords[num];
    }
    return num.toString(); 
  };
  
  useEffect(() => {

    const BASE_URL = window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : 'https://chemclick-backend.onrender.com';

    fetch(`${BASE_URL}/announcements/`) 
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch announcements');
      return response.json();
    })
    .then((data) => {
      const sortedAnnouncements = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date) // Sort announcements by date (newest first)
      );
      setAnnouncements(sortedAnnouncements);
    })
    .catch((error) => console.error('Error fetching announcements:', error));

    fetch(`${BASE_URL}/lessons/`) 
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch lesson data');
        return res.json();
      })
      .then((data) => {
        const transformedData = [
          {
            number: 1,
            title: 'Uncertainty in Measurement: Visible Scale',
            // filtering by regular expressions prevents lessons 10 
            // and above from falling under this category too
            lessons: data.filter((lesson) => /^lesson1\./.test(lesson.lesson_id)) 
              .map((lesson) => {
                const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson1"
                const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
                return {
                  ...lesson,
                  dateDue: formatDate(lesson.due_date),
                  route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
                };
              }),
          },
          {
            number: 2,
            title: 'Uncertainty in Measurements (Digital Scale-Balance)',
            lessons: data.filter((lesson) => /^lesson2\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson2"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }
            }),
          },
          {
            number: 3,
            title: 'Atomic Structure',
            lessons: data.filter((lesson) => /^lesson3\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson3"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }            
            }),
          },
          {
            number: 4,
            title: 'Periodic Table Classification',
            lessons: data.filter((lesson) => /^lesson4\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson4"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }            
            }),
          },
          {
            number: 5,
            title: 'Periodic Trends (Valence Electrons)',
            lessons: data.filter((lesson) => /^lesson5\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson5"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }            
            }),
          },
          {
            number: 6,
            title: 'Forming Monatomic Ions',
            lessons: data.filter((lesson) => /^lesson6\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson6"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }            
            }),
          },
          {
            number: 7,
            title: 'Periodic Trends (Using group number to predict charge of monatomic ion)',
            lessons: data.filter((lesson) => /^lesson7\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson7"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }            
            }),
          },
          {
            number: 8,
            title: 'Monatomic Ions',
            lessons: data.filter((lesson) => /^lesson8\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson8"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }            
            }),
          },
          {
            number: 9,
            title: 'Ionic Compounds',
            lessons: data.filter((lesson) => /^lesson9\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson9"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }            
            }),
          },
          {
            number: 10,
            title: 'Ionic Compounds (Polyatomic Ions)',
            lessons: data.filter((lesson) => /^lesson10\./.test(lesson.lesson_id))
            .map((lesson) => {
              const unit = lesson.lesson_id.split('.')[0]; // Extract "lesson10"
              const lessonNumber = parseInt(lesson.lesson_id.split('.')[1], 10); // Extract "#"
              return {
                ...lesson,
                dateDue: formatDate(lesson.due_date),
                route: `/Lesson${numberToWord(parseInt(unit.replace("lesson", ""), 10))}Point${numberToWord(lessonNumber)}`,
              }            
            }),
          },
        ];
        // ^ format ex. Unit 2, Lesson 4 -> lesson2.4 (for the lesson id)
        setUnitData(transformedData);

        const inProgressLesson = data.find((lesson) => lesson.status === 'in-progress');
        console.log('In-progress lesson:', inProgressLesson);
        
        if (inProgressLesson) {
          const match = inProgressLesson.lesson_id.match(/lesson(\d+)\.\d+/);
          if (match && match[1]) {
            const unitNumber = parseInt(match[1], 10);
            console.log('Parsed unit number:', unitNumber);
            setCurrentUnit(unitNumber);
          } else {
            console.warn('Invalid lesson_id format:', inProgressLesson.lesson_id);
          }
        } else{
          console.log('No in-progress lesson found, defaulting to unit 1');
        }
      })
      .catch((error) => console.error('Error fetching unit data:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!userId) {
      console.error("No user ID found");
      return;
    }

    const BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://chemclick-backend.onrender.com';
    const lessonProgressUrl = isTeacher 
    ? `${BASE_URL}/teacherLessons/progress/${userId}` 
    : `${BASE_URL}/lessons/progress/${userId}`; 


    fetch(lessonProgressUrl)
      .then((res) => {
          if (!res.ok) throw new Error(`Failed to fetch progress for ${userId}`);
          return res.json();
      })
      .then((data) => {
          console.log("Progress Data for", isTeacher ? "Teacher's Student View" : "Student:", data);
          const progressMap = data.reduce((acc, item) => {
              acc[item.lesson_id] = item.progress; 
              return acc;
          }, {});
          setProgressData(progressMap); 
      })
      .catch((error) => console.error('Fetch Error:', error));
  }, [userId, isTeacher]);
  

  const handleClickToBegin = () => {
    navigate('/question');
  };
  
  const handleLessonClick = (route) => {
    navigate(route);
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
  
  return (
    <div className="Dashboard">
      <DashboardHeader />
      <WelcomeBanner />
{/*       <UnitList units={unitData} currentUnit={currentUnit} currentLessons={currentLessons} onLessonClick={handleLessonClick} />
 */}      
      {loading ? (
        <p>Loading lessons...</p>
      ) : (
        <UnitList
          units={unitData}
          currentUnit={currentUnit}
          currentLessons={[]}
          onLessonClick={handleLessonClick}
          progressData={progressData}
          userId={userId}
          isTeacher={isTeacher}
        />
      )}
      <ClickToBegin onClick = {handleClickToBegin} />
      <Announcements announcements={announcements} />
    </div>
  );
}

export default Dashboard;