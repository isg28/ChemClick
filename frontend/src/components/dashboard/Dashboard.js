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

  const numberToWord = (num) => {
    const numWords = [
      "Zero", "One", "Two", "Three", "Four", 
      "Five", "Six", "Seven", "Eight", "Nine", 
      "Ten", "Eleven", "Twelve"
    ];
    if (num < 13) {
      return numWords[num];
    }
    return num.toString(); 
  };
  
  useEffect(() => {
    fetch('http://localhost:8000/announcements/') 
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

    fetch('http://localhost:8000/lessons/') 
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
    if (!studentId) {
      console.error("No student ID found");
      return;
    }

    fetch(`http://localhost:8000/lessons/progress/${studentId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Progress Data:", data);
        const progressMap = data.reduce((acc, item) => {
          acc[item.lesson_id] = item.progress; 
          return acc;
        }, {});
        setProgressData(progressMap); 
      })
      .catch((error) => console.error('Fetch Error:', error));
  }, [studentId]);
  

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
        />
      )}
      <ClickToBegin onClick = {handleClickToBegin} />
      <Announcements announcements={announcements} />
    </div>
  );
}

export default Dashboard;