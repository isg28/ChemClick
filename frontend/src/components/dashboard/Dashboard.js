import React from 'react';
import DashboardHeader from './DashboardHeader';
import WelcomeBanner from './WelcomeBanner';
import ClickToBegin from './ClickToBegin';
import Announcements from './Announcements';
import UnitList from './UnitList';
import '../../styles/dashboard/Dashboard.css';
import { useNavigate } from 'react-router-dom';



function Dashboard() {
  const navigate = useNavigate();

  const handleClickToBegin = () => {
    navigate('/question');
  };
  
  const handleLessonClick = (route) => {
    navigate(route);
  };

  const unitData = [
    {
      number: 1,
      title: "Uncertainty in Measurement: Visible Scale",
      lessons: [
        { name: "Lesson 1.1: Tenths Value", status: "completed", dateDue: "Oct. 30, 2024", dateSubmitted: "Nov. 1, 2024", route: "/LessonOnePointOne" },       
        { name: "Lesson 1.2: Tenths Value", status: "completed", submittedLate: true, dateDue: "Nov. 10, 2024", dateSubmitted: "Nov. 11, 2024", route: "/LessonOnePointTwo" },
        { name: "Lesson 1.3: Tenths Value", status: "in-progress", dateDue: "Nov. 18, 2024", route: "/LessonOnePointThree" },
        { name: "Lesson 1.4: Hundredths Digit", status: "locked", dateDue: "[LOCKED]", route: "/LessonOnePointFour" },
        { name: "Lesson 1.5: Hundredths Digit", status: "locked", dateDue: "[LOCKED]", route: "/LessonOnePointFive" },
        { name: "Lesson 1.6: Hundredths Digit", status: "locked", dateDue: "[LOCKED]", route: "/LessonOnePointSix"},
        { name: "Lesson 1.7: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]", route: "/LessonOnePointSeven"},
        { name: "Lesson 1.8: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]", route: "/LessonOnePointEight" },
        { name: "Lesson 1.9: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]" },
        { name: "Lesson 1.10: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]" },
        { name: "Lesson 1.11: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]" },
        { name: "Lesson 1.12: Meniscus (Vertical Scale)", status: "locked", dateDue: "[LOCKED]" }
      ]
    },
    {
      number: 2,
      title: "Uncertainty in Measurements (Digital Scale-Balance)",
      lessons: [
        { name: "Lesson 2.1: Digital Scale-Balance", status: "locked", dateDue: "[LOCKED]" },
        { name: "Lesson 2.2: Reading a Standard", status: "locked", dateDue: "[LOCKED]" }
      ]
    },
    {
      number: 3,
      title: "Nomenclature: Symbols Name",
      lessons: [
        { name: "Periodic Table Symbols", status: "locked", dateDue: "[LOCKED]" },
        { name: "Element Naming", status: "locked", dateDue: "[LOCKED]" }
      ]
    }
  ];
    
  const currentUnit = 1;
  const currentLessons = ["Visible Scale - Cylinder"]; // Hard coded for now

  const announcementsData = [
    {
      author: "MATT BRIMBERRY",
      date: "Jan 15, 2024, 2:20pm",
      message: "Unit One, Lesson 1, due Friday. Make sure to turn in the certificate to Google Classroom!",
    },
    {
      author: "MATT BRIMBERRY",
      date: "Feb 1, 2024, 3:30pm",
      message: "Don't forget to submit your Visible Scale - Ruler by the end of the week!",
    },
  ];

  const sortedAnnouncements = announcementsData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA; // Dates are sorted in descending order (newest first)
  });

  return (
    <div className="Dashboard">
      <DashboardHeader />
      <WelcomeBanner />
      <UnitList units={unitData} currentUnit={currentUnit} currentLessons={currentLessons} onLessonClick={handleLessonClick} />
      <ClickToBegin onClick = {handleClickToBegin} />
      <Announcements announcements={sortedAnnouncements} />
    </div>
  );
}

export default Dashboard;