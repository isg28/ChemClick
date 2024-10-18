import React from 'react';
import TeacherDashboardHeader from './TeacherDashboardHeader';
import TeacherWelcomeBanner from './TeacherWelcomeBanner';
import TeacherAnouncements from './TeacherAnouncements';
import TeacherUnitList from './TeacherUnitList';
import '../../styles/teacherdashboard/TeacherDashboard.css';




function TeacherDashboard() {
  const username = "Walter W"; // CHANGE, once we can make the data dynamic!
  const unitData = [
    {
      number: 1,
      title: "Uncertainty of Measurement: Visible Scale",
      lessons: [
        { name: "Visible Scale - Ruler", status: "completed", dateDue: "Jan. 17, 2024"},
        { name: "Visible Scale - Cylinder", status: "in-progress", dateDue: "Feb. 3, 2024"},
        { name: "Digital Scale - Balance", status: "locked", dateDue: "[LOCKED]" }
      ]
    },
    {
      number: 2,
      title: "Structure of an Atom: Bohr's Model",
      lessons: [
        { name: "Bohr's Model Description", status: "locked", dateDue: "[LOCKED]" },
        { name: "Subatomic Particles", status: "locked", dateDue: "[LOCKED]" }
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
    <div className="TeacherDashboard">
      <TeacherDashboardHeader />
      <TeacherWelcomeBanner username={username} />
      <TeacherUnitList units={unitData} currentUnit={currentUnit} currentLessons={currentLessons} />
      <TeacherAnouncements announcements={sortedAnnouncements} />
    </div>
  );
}

export default TeacherDashboard;