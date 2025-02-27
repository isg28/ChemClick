import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/teacherdashboard/TeacherStudentProgress.css';

const TeacherProgressBox = ({ lessonId }) => {
    const navigate = useNavigate();
    const [studentProgress, setStudentProgress] = useState({
        not_started: 0,
        in_progress: 0,
        completed: 0
    });

    useEffect(() => {
        const fetchStudentProgress = async () => {
            try {
                const response = await fetch(`http://localhost:8000/lessons/studentProgress/${lessonId}/`);
                if (!response.ok) throw new Error("Failed to fetch progress");
                
                const data = await response.json();
                setStudentProgress(data);
            } catch (error) {
                console.error("Error fetching student progress:", error);
            }
        };

        if (lessonId) {
            fetchStudentProgress();
        }
    }, [lessonId]);

    return (
        <div className="student-progress-wrapper">
           <div className='student-progress-not-started'>
            <h3>Students Not Started: {studentProgress.not_started}</h3>
           </div>
           <div className='student-progress-started'>
            <h3>Students In Progress: {studentProgress.in_progress}</h3>
           </div>
           <div className='student-progress-finished'>
            <h3>Students Finished: {studentProgress.completed}</h3>
           </div>
           <div className='student-progress-button'>
            <h3 onClick={() => navigate('/statistics')}>View Full Statistics</h3> 
           </div>
        </div>
    );
};

export default TeacherProgressBox;
