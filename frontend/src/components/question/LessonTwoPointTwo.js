import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonTwoPointTwo.css';
import { useNavigate } from 'react-router-dom';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from './LessonUtils';

function LessonTwoPointTwo() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson2.2'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    const displayMedals = starsEarned >= 5;

    const [randomNumber, setRandomNumber] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handleQuestion = () => {
        navigate('/dashboard');
    };

    const generateRandNum = () => {
        const randomNum = (Math.random() * 0.99 + 10).toFixed(2);
        setRandomNumber(randomNum);
    };

    const getHundrethsPlace = (num) => {
        return Math.floor((num * 100) % 10);
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
        generateRandNum();
    }, [userId, lessonId, navigate, isTeacher]);

    const [nextLessonLocked, setNextLessonLocked] = useState(true);
    useEffect(() => {
        const checkNextLessonStatus = async () => {
        const nextLessonId = 'lesson2.3'; 
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

    const validateAnswer = async () => {
        const correctAnswer = getHundrethsPlace(randomNumber).toString();
    
        if (userInput === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });  
        } else {
            setFeedback(`Incorrect. The uncertain digit is the farthest right digit.`);
            setFeedbackClass('incorrect');
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2500);
        }
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        generateRandNum();
        setFeedback('');
        setFeedbackClass('hidden');
        setIsAnswerCorrect(false);
        setUserInput('');
    };

    return (
        <div className='lesson-two-point-two'>
            <div className='questionheader'>
                <div className="question-head-in">
                    <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                    <div className='insideheader'>
                        <h1>ChemClicks Assignments</h1>
                    </div>
                    <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handleQuestion} alt="Home Lines" />
                </div>
            </div>

            <div className="question-page-main">
                <div className='lesson-two-point-two-box'>
                    <div className='lesson-two-point-two-box-innercont'>
                        <div className='lesson-two-point-two-box-title'>
                            <h1>Unit Two: Identifying the Uncertain Digit</h1>
                        </div>
                        <div className='lesson-two-point-two-content'>
                            <p className='lesson-two-point-two-prompt'>
                                Observe the scale reading and determine the uncertain digit (hundreths place). 
                            </p>
                            <div className="lesson-two-point-two-container">
                                <div className="lesson-two-point-two-reading-container">
                                    <img src={require('../../assets/question/scale.png')} className="lesson-two-point-two-scale" alt="Scale" />
                                    <h3 className="lesson-two-point-two-scale-reading">{randomNumber}</h3>
                                </div>
                            </div>

                            <hr className="separator" />
                            <div className='lesson-two-point-two-question'>
                                <input type="text" 
                                    value={userInput} 
                                    onChange={(e) => setUserInput(e.target.value)} 
                                    className='lesson-two-point-two-input'
                                    placeholder="Enter the uncertain digit" />
                            </div>
                        
                        <span className={`lesson-two-point-two-feedback ${feedbackClass}`}>{feedback}</span>
                        <div className="lesson-two-point-two-submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-two-point-two-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-two-point-two-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            
                        </div>
                        </div>
                    </div>
                </div>

                <div className="side-column">
                    <div className="side-column-box-holder">
                        <div className="side-column-box masterybox">
                            <div className="side-column-box-title masteryboxtitle"> <h1>Mastery</h1> </div>
                            {displayMedals && (
                                <>
                                    <div className='reward-box-left' title="Congrats on achieving mastery! Feel free to keep practicing!">
                                        🏅 
                                    </div>
                                    <div className='reward-box-right' title="Congrats on achieving mastery! Feel free to keep practicing!">
                                        🏅 
                                    </div>
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
                            if (!nextLessonLocked) navigate('/lessontwopointthree');
                        }}
                        >
                        {nextLessonLocked ? 'Locked' : 'Next Lesson'}
                    </button>
                    </div>
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
    );
}

export default LessonTwoPointTwo;
