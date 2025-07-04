import React, { useState, useEffect, useRef } from "react";
import '../../styles/question/Question.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointThree.css';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonOnePointThree() {
    const navigate = useNavigate();
    const rulerRef = useRef(null);
    const cursorRef = useRef(null);
    const pencilRef = useRef(null);
    
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 

    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson1.3'; 

    const PIXELS_PER_INCH = 136;
    
    const [initialPosition, setInitialPosition] = useState(0);
    const [pencilLength, setPencilLength] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [cursorPosition, setCursorPosition] = useState(0);
    const dragState = useRef({ isDragging: false, offsetX: 0 });

   const [goal, setGoal] = useState(); 
       const [correctAnswers, setCorrectAnswers] = useState(0);
       const [incorrectAnswers, setIncorrectAnswers] = useState(0);
       const [totalAttempts, setTotalAttempts] = useState(0);
       const [progress, setProgress] = useState(0); 
       const [masteryLevel, setMasteryLevel] = useState(0); 
       const [showCompletionModal, setShowCompletionModal] = useState(false); 
       const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    
       const displayMedals = starsEarned >= 5;

       const handlequestion = () => {
        navigate('/dashboard');
    };

    useEffect(() => {
            if (!userId) { 
                console.error('ID not found');
                navigate('/login');
                return;
              }
    
            const initializeData = async () => {
                await fetchLessonData(lessonId, setGoal);
                await fetchLessonProgress(userId, lessonId, isTeacher, {
                    setCorrectAnswers,
                    setIncorrectAnswers,
                    setProgress,
                    setMasteryLevel,
                    setGoal,
                    setTotalAttempts,
                });        
            };
    
            initializeData();
        }, [userId, lessonId, navigate, isTeacher]);

            const [nextLessonLocked, setNextLessonLocked] = useState(true);
        
            useEffect(() => {
                const checkNextLessonStatus = async () => {
                    const nextLessonId = 'lesson1.4'; 
                    try {
                        const isLocal = window.location.hostname.includes('localhost');
                        const BASE_URL = isLocal
                        ? 'http://localhost:8000'
                        : 'https://chemclick.onrender.com';
                        const res = await fetch(`${BASE_URL}/lessons/${nextLessonId}`);
                        const data = await res.json();
                        setNextLessonLocked(data.status === 'locked');
                    } catch (error) {
                        console.error("Failed to check next lesson lock status:", error);
                    }
                };
        
                checkNextLessonStatus();
            }, []);    

        useEffect(() => {
                if (progress === 100) {
                    setShowCompletionModal(true);
                }
            }, [progress]);
    
    useEffect(() => {
        if (rulerRef.current) {
            const rulerLeft = rulerRef.current.getBoundingClientRect().left;
            setInitialPosition(rulerLeft);
            setCursorPosition(rulerLeft);
        }
        generateRandomPencilLength();
    }, []); 

    const generateRandomPencilLength = () => {
        const length = (Math.random() * 5 + 1).toFixed(1);
        setPencilLength(parseFloat(length));
    };

    const handleMouseDown = (e) => {
        dragState.current.isDragging = true;
        dragState.current.offsetX = e.clientX - cursorRef.current.getBoundingClientRect().left;
    };

    const handleMouseMove = (e) => {
        if (dragState.current.isDragging) {
            const newLeft = e.clientX - dragState.current.offsetX;
            if (newLeft >= initialPosition && newLeft <= initialPosition + (PIXELS_PER_INCH * 6)) {
                setCursorPosition(newLeft);
            }
        }
    };

    const handleMouseUp = () => {
        dragState.current.isDragging = false;
    };

    const resetQuestion = () => {
        setUserInput("");
        setFeedbackMessage('');
        setFeedbackClass('');
        setCursorPosition(initialPosition); // Reset cursor position
        generateRandomPencilLength(); // Generate new pencil length
    };
    

const handleSubmit = async () => {
    const correctAnswer = pencilLength.toFixed(1);
    const userAnswer = parseFloat(userInput).toFixed(1);

    if (Math.abs(userAnswer - correctAnswer) <= 0.05) {
        setFeedbackMessage("Correct! Moving to the next question.");
        setFeedbackClass('correct');

        await CorrectResponses({
            userId, lessonId, isTeacher, 
            correctAnswers, incorrectAnswers, totalAttempts, 
            progress, masteryLevel, goal, starsEarned, 
            setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts
        });

        // Reset cursor, input field, and generate new question
        setTimeout(() => {
            setFeedbackMessage('');
            setFeedbackClass('');
            setUserInput("");  // ✅ Clears input field
            setCursorPosition(initialPosition);  // ✅ Resets cursor position
            generateRandomPencilLength();  // ✅ Generates a new pencil length
        }, 2000);
    
    } else {
        setFeedbackMessage("Try again! Please adjust your measurement.");
        setFeedbackClass('incorrect');

        await IncorrectResponses({
            userId, lessonId, isTeacher, 
            correctAnswers, incorrectAnswers, totalAttempts, 
            progress, masteryLevel, goal, starsEarned, 
            setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts
        });

        setTimeout(() => {
            setFeedbackMessage('');
            setFeedbackClass('');
        }, 4000);
    }
};


    return (
        <div className='lesson-one-point-three' onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
            <div className='questionheader'>
                <div className="question-head-in">
                    <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                    <div className='insideheader'>
                        <h1>ChemClicks Assignments</h1>
                    </div>
                    <img src={require('../../assets/question/Home.png')} className='homelines' onClick={() => navigate('/dashboard')} alt="Home Lines" />
                </div>
            </div>
            <div className="question-page-main">
                <div className='lesson-one-point-three-box'>
                    <div className='lesson-one-point-three-box-innercont'>
                        <div className='lesson-one-point-three-box-title'>
                            <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                        </div>
                        <div className='lesson-one-point-three-content'>
                            <p>Measure the pencil using the cursor and type your estimate below.</p>
                            <div className='lesson-one-point-three-measurement-container'>
                                <img
                                    src={require('../../assets/question/pencil.png')}
                                    className='lesson-one-point-three-pencil'
                                    ref={pencilRef}
                                    alt="Pencil"
                                    style={{ width: `${(pencilLength * PIXELS_PER_INCH)}px`, left: `${initialPosition - 5}px` }}
                            />
                                {/* Red vertical line cursor */}
                                <div
                                    className="lesson-one-point-three-cursor"
                                    ref={cursorRef}
                                    onMouseDown={handleMouseDown}
                                    style={{ left: `${cursorPosition}px` }}
                                />
                            </div>
                            <div className="lesson-one-point-three-ruler-container">
                                <img
                                    src={require('../../assets/question/RulerH.png')}
                                    className="lesson-one-point-three-ruler"
                                    ref={rulerRef}
                                    alt="Ruler"
                                />
                            </div>
                            <div className="lesson-one-point-three-question">
                                <input
                                    type="text"
                                    className="lesson-one-point-three-input"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="ex. 4.5"
                                />
                                <button className='lesson-one-point-three-submit' onClick={handleSubmit}>Submit</button>
                            </div>
                            <div className={`lesson-one-point-three-feedback ${feedbackClass}`}>
                                <p>{feedbackMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Consistent for Each Question Page */}
                <div className="side-column">
    <div className="side-column-box-holder">
        <div className="side-column-box masterybox">
            <div className="side-column-box-title masteryboxtitle">
                <h1>Mastery</h1>
            </div>
            {displayMedals && (
                <>
                    <div className='reward-box-left' title="Congrats on achieving mastery! Feel free to keep practicing!">🏅</div>
                    <div className='reward-box-right' title="Congrats on achieving mastery! Feel free to keep practicing!">🏅</div>
                </>
            )}
            <div className="side-column-box-info masteryboxstars">{stars}</div>
        </div>
        <div className='side-column-box'>
            <div className='side-column-box-title'><h1>Goal</h1></div>
            <div className='side-column-box-info'>
                {renderGoalChecks(goal, correctAnswers)}
            </div>
        </div>
    </div>
    {/* Next Lesson button positioned below the Goals box */}
    <div className="next-lesson-button-container" style={{ marginTop: '20px' }}>
                     <button 
                        className={`next-lesson-button ${nextLessonLocked ? 'locked' : ''}`} 
                        onClick={() => {
                            if (!nextLessonLocked) navigate('/lessononepointfour');
                        }}
                        >
                        {nextLessonLocked ? 'Locked' : 'Next Lesson'}
                    </button>
                    </div>
    </div>
            {showCompletionModal && (
                <div className="completion-modal">
                    <div className="completion-modal-content">
                        <h2>🎉 Congratulations! 🎉</h2>
                        <p>You've finished the assignment! Keep practicing to strengthen your skills.</p>
                        <button onClick={() => setShowCompletionModal(false)}>Continue</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}

export default LessonOnePointThree;
