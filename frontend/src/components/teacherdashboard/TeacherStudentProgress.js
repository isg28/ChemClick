import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/teacherdashboard/TeacherStudentProgress.css'


const TeacherProgressBox = () => {
    const navigate = useNavigate();
    const handleClickToBegin = () => {
        navigate('/statistics');
    };
    return (
        <div className="student-progress-wrapper">
           <div className='student-progress-not-started'>
            <h3>Students Not Started: 50</h3>
           </div>
           <div className='student-progress-started'>
            <h3>Students In Progress: 30</h3>
           </div>
           <div className='student-progress-finished'>
            <h3>Students Finished: 15</h3>
           </div>
           <div className='student-progress-button'>
            <h3 onClick = {handleClickToBegin} >View Full Statistics</h3> 
           </div>
        </div>
    );
  };
  
  export default TeacherProgressBox;
  