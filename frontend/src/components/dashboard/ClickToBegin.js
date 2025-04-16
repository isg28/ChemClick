import React , {useState, useEffect} from 'react';
import '../../styles/dashboard/ClickToBegin.css';
import { useNavigate } from 'react-router-dom';

const ClickToBegin = () => {
    const navigate = useNavigate();
    const [firstInProgressLesson, setFirstInProgressLesson] = useState(null);

    // Map backend lesson IDs to frontend routes
    const lessonIdToRouteMap = {
        'lesson1.1': 'LessonOnePointOne',
        'lesson1.2': 'LessonOnePointTwo',
        'lesson1.3': 'LessonOnePointThree',
        'lesson1.4': 'LessonOnePointFour',
        'lesson1.5': 'LessonOnePointFive',
        'lesson1.6': 'LessonOnePointSix',
        'lesson1.7': 'LessonOnePointSeven',
        'lesson1.8': 'LessonOnePointEight',
        'lesson1.9': 'LessonOnePointNine',
        'lesson1.10': 'LessonOnePointTen',
        'lesson1.11': 'LessonOnePointEleven',
        'lesson1.12': 'LessonOnePointTwelve',
        'lesson2.1': 'LessonTwoPointOne',
        'lesson2.2': 'LessonTwoPointTwo',
        'lesson2.3': 'LessonTwoPointThree',
        'lesson2.4': 'LessonTwoPointFour',
        'lesson2.5': 'LessonTwoPointFive',
        'lesson2.6': 'LessonTwoPointSix',
        'lesson3.1': 'LessonThreePointOne',
        'lesson3.2': 'LessonThreePointTwo',
        'lesson4.1': 'LessonFourPointOne',
        'lesson4.2': 'LessonFourPointTwo',
        'lesson4.3': 'LessonFourPointThree',
        'lesson4.4': 'LessonFourPointFour',
        'lesson4.5': 'LessonFourPointFive',
        'lesson5.1': 'LessonFivePointOne',
        'lesson5.2': 'LessonFivePointTwo',
        'lesson5.3': 'LessonFivePointThree',
        'lesson5.4': 'LessonFivePointFour',
        'lesson5.5': 'LessonFivePointFive',
        'lesson5.6': 'LessonFivePointSix',
        'lesson5.7': 'LessonFivePointSeven',
        'lesson5.8': 'LessonFivePointEight',
        'lesson5.9': 'LessonFivePointNine',
        'lesson5.10': 'LessonFivePointTen',
        'lesson6.1': 'LessonSixPointOne',
        'lesson6.2': 'LessonSixPointTwo',
        'lesson6.3': 'LessonSixPointThree',
        'lesson6.4': 'LessonSixPointFour',
        'lesson7.1': 'LessonSevenPointOne',
        'lesson7.2': 'LessonSevenPointTwo',
        'lesson7.3': 'LessonSevenPointThree',
        'lesson7.4': 'LessonSevenPointFour',
        'lesson7.5': 'LessonSevenPointFive',
        'lesson7.6': 'LessonSevenPointSix',
        'lesson7.7': 'LessonSevenPointSeven',
        'lesson7.8': 'LessonSevenPointEight',
        'lesson7.9': 'LessonSevenPointNine',
        'lesson7.10': 'LessonSevenPointTen',
        'lesson8.1': 'LessonEightPointOne',
        'lesson9.1': 'LessonNinePointOne',
        'lesson9.2': 'LessonNinePointTwo',
    };

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const BASE_URL = window.location.hostname === 'localhost'
                ? 'http://localhost:8000'
                : 'https://chemclick-backend.onrender.com';
              
              const response = await fetch(`${BASE_URL}/lessons/`);
              
                if (!response.ok) throw new Error('Failed to fetch lessons');

                const lessons = await response.json();
                // Find the first lesson with in-progress status from the database
                const inProgressLesson = lessons.find(lesson => lesson.status === 'in-progress');
                if (inProgressLesson) {
                    setFirstInProgressLesson(inProgressLesson.lesson_id);
                }
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };
        fetchLessons();
    }, []);

    const handleClickToBegin = () => {
        if (firstInProgressLesson) {
            const route = lessonIdToRouteMap[firstInProgressLesson];
            if (route) {
                navigate(`/${route}`);
            } else {
                console.warn('No route found for lesson ID:', firstInProgressLesson);
                navigate('/dashboard'); 
            }
        } else {
            console.warn('No in-progress lesson found.');
            navigate('/dashboard'); 
        }
    };

    return (
        <div className="click-to-begin-container">
            <span className="click-text">Click to Begin</span>
            <img
                src={`${process.env.PUBLIC_URL}/ChemClickLogo.png`}
                alt="ChemClick Logo"
                className="click-logo"
                onClick={handleClickToBegin}
            />
        </div>
    );
};

export default ClickToBegin;