import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses, } from './LessonUtils';

import '../../styles/question/Question.css';
import '../../styles/question/LessonSevenPointTwelve.css';

function LessonSevenPointTwelve() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId');
    const teacherId = localStorage.getItem('teacherId');

    const isTeacher = !!teacherId;
    const userId = isTeacher ? teacherId : studentId;
    const lessonId = 'lesson7.12';

    const [goal, setGoal] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0);
    const [masteryLevel, setMasteryLevel] = useState(0);

    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const [firstChoice, setFirstChoice] = useState('');
    const [secondChoice, setSecondChoice] = useState('');
    const [thirdChoice, setThirdChoice] = useState('');

    const firstDropdownOptions = [
        'Equal to the group number',
        'Equal to the last digit of the group number',
        'Equal to the group number minus 18',
        'It cannot',
    ];

    const secondDropdownOptions = ['Group 13', 'Group 14', 'Group 15', 'Group 16', 'Group 17', 'Group 18'];;
    const thirdDropdownOptions = ['3-', '2-', '1-', '0', '1+', '2+', '3+'];

    useEffect(() => {
        if (!userId) {
            console.error('ID not found');
            navigate('/login');
            return;
        }

        const initializeData = async () => {
            await fetchLessonData(lessonId, setGoal);
            await fetchLessonProgress(userId, lessonId, isTeacher, { setCorrectAnswers, setIncorrectAnswers, setProgress, setMasteryLevel, setGoal, setTotalAttempts, });
        };

        initializeData();
    }, [userId, lessonId, navigate, isTeacher]);

        const [nextLessonLocked, setNextLessonLocked] = useState(true);
        useEffect(() => {
            const checkNextLessonStatus = async () => {
            const nextLessonId = 'lesson8.1'; 
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


    async function handleSubmit() {
        if (!firstChoice || !secondChoice || !thirdChoice) {
            setIsCorrect(false);
            setFeedbackMessage('Make sure all of the sections are filled.');
            setIsSubmitted(true);
            return;
        }

        const isAnswerCorrect =
            firstChoice === 'Equal to the group number minus 18' &&
            secondChoice === 'Group 13' &&
            thirdChoice === '3+';

        if (isAnswerCorrect) {
            setIsCorrect(true);
            await CorrectResponses({
                userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
            setFeedbackMessage('Correct! Click done to go to the Dashboard.');
        } else {
            setIsCorrect(false);
            await IncorrectResponses({
                userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
            setFeedbackMessage('Incorrect. Please try again.');
        }

        setIsSubmitted(true);
    }

    function handleDone() {
        navigate('/dashboard');
    }

    function handleTryAgain() {
        setIsSubmitted(false);
        setFeedbackMessage('');
        setIsCorrect(null);
    }

    function handleButtonClick() {
        if (!isSubmitted) {
            handleSubmit();
        } else {
            isCorrect ? handleDone() : handleTryAgain();
        }
    }

    const buttonText = isSubmitted ? (isCorrect ? 'Done' : 'Try Again') : 'Submit Answer';

    return (
        <div className="LessonSevenPointTwelve">
            <div className="questionheader">
                <div className="question-head-in">
                    <img
                        src={require('../../assets/question/ChemClickLogo.png')}
                        className="ChemClickLogoHeader"
                        alt="Chem Click Logo"
                    />
                    <div className="insideheader">
                        <h1>ChemClicks Assignments</h1>
                    </div>
                    <img
                        src={require('../../assets/question/Home.png')}
                        className="homelines"
                        onClick={() => navigate('/dashboard')}
                        alt="Home"
                    />
                </div>
            </div>

            <div className="question-page-main">
                <div className="LessonSevenPointTwelveBox">
                    <div className="LessonSevenPointTwelveBoxInnercont">
                        <div className="LessonSevenPointTwelveBoxTitle">
                            <h1>
                                Unit Seven: Periodic Trends - (Predicting Monatomic Ion Charge by Group Number) - Right Side
                            </h1>
                        </div>
                        <div className="LessonSevenPointTwelveContent">
                            <p className="LessonSevenPointTwelvePrompt">
                                Complete the following sentence using drop-down selections.
                            </p>
                            <div className="LessonSevenPointTwelveRow">
                                <div className="LessonSevenPointElevenImageContainer">
                                    <div style={{ fontSize: '1.3rem' }}>
                                        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                                            Your answers to Groups 13 through 18:
                                        </div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <span>Group 13:</span> Selected "Equal to the last digit of the group number."
                                        </div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <span>Group 14:</span> Selected "Equal to the group number minus 18."
                                        </div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <span>Group 15:</span> Selected "Equal to the group number minus 18."
                                        </div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <span>Group 16:</span> Selected "Equal to the group number minus 18."
                                        </div>
                                        <div style={{ marginBottom: '15px' }}>
                                            <span>Group 17:</span> Selected "Equal to the group number minus 18."
                                        </div>
                                        <div>
                                            <span>Group 18:</span> Selected "Equal to the group number minus 18."
                                        </div>
                                    </div>
                                </div>
                                <div className="LessonSevenPointTwelveInput">
                                    <div className="LessonSevenPointTwelveSentence">
                                        On the left side of the periodic table, the charge of an ion derived from an element is{' '}
                                        <select value={firstChoice} onChange={(e) => setFirstChoice(e.target.value)}>
                                            <option value="">--Select--</option>
                                            {firstDropdownOptions.map((opt, idx) => (
                                                <option key={idx} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>{' '}
                                        except for{' '}
                                        <select value={secondChoice} onChange={(e) => setSecondChoice(e.target.value)}>
                                            <option value="">--Select--</option>
                                            {secondDropdownOptions.map((opt, idx) => (
                                                <option key={idx} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>{' '}
                                        because its ion has a charge of{' '}
                                        <select value={thirdChoice} onChange={(e) => setThirdChoice(e.target.value)}>
                                            <option value="">--Select--</option>
                                            {thirdDropdownOptions.map((opt, idx) => (
                                                <option key={idx} value={opt}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>.
                                    </div>
                                </div>
                            </div>
                            {feedbackMessage && (
                                <div
                                    className={'LessonSevenPointTwelveFeedback ' + (isCorrect ? 'correct' : 'incorrect')}
                                >
                                    {feedbackMessage}
                                </div>
                            )}
                        </div>
                        <div className="submit-feedback-container">
                            <button className="LessonSevenPointTwelveSubmit" onClick={handleButtonClick}>
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="side-column">
                    <div className="side-column-box-holder">
                        <div className="side-column-box masterybox">
                            <div className="side-column-box-title masteryboxtitle">
                                <h1>Mastery</h1>
                            </div>
                            {displayMedals && (
                                <div>
                                    <div className="reward-box-left" title="Congrats on achieving mastery!">🏅</div>
                                    <div className="reward-box-right" title="Congrats on achieving mastery!">🏅</div>
                                </div>
                            )}
                            <div className="side-column-box-info masteryboxstars">{stars}</div>
                        </div>
                        <div className="side-column-box">
                            <div className="side-column-box-title"><h1>Goal</h1></div>
                            <div className="side-column-box-info">{renderGoalChecks(goal, correctAnswers)}</div>
                        </div>
                    </div>
                    {/* Next Lesson button positioned below the Goals box */}
                    <div className="next-lesson-button-container" style={{ marginTop: '20px' }}>
                    <button 
                        className={`next-lesson-button ${nextLessonLocked ? 'locked' : ''}`} 
                        onClick={() => {
                            if (!nextLessonLocked) navigate('/lessoneightpointone');
                        }}
                        >
                        {nextLessonLocked ? 'Locked' : 'Next Lesson'}
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessonSevenPointTwelve;
