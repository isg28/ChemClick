import React, { useState, useEffect } from "react";
import '../../styles/question/Question.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/LessonTwoPointOne.css';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from '../../components/question/LessonUtils';

function LessonTwoPointOne() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson2.1'; 
    
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const [randomNumber, setRandomNumber] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [feedbackMessage, setFeedback] = useState("");
    const [feedbackClass, setFeedbackClass] = useState("hidden");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const generateRandNum = () => {
        const randomNum = (Math.random() * 0.99 + 10).toFixed(1);
        setRandomNumber(randomNum);
    };

    const getTenthsPlace = (num) => {
        return Math.floor((num * 10) % 10);
    };

    useEffect(() => {
        if (!studentId) { 
            console.error('Student ID not found');
            navigate('/login');
            return;
        }

        const initializeData = async () => {
            await fetchLessonData(lessonId, setGoal);
            await fetchLessonProgress(studentId, lessonId, {
                setCorrectAnswers,
                setProgress,
                setMasteryLevel,
                setGoal,
            });        
        };
                
        initializeData();
        generateRandNum();
    }, [studentId, lessonId, navigate]);

    const validateAnswer = async () => {
            const correctAnswer = getTenthsPlace(randomNumber).toString();
        
            if (userInput === correctAnswer) {
                setFeedback('Correct!');
                setFeedbackClass('correct');
                setIsAnswerCorrect(true);
                await CorrectResponses({ studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
                    setCorrectAnswers, setProgress, setMasteryLevel,
                });
            } else {
                setFeedback(`Incorrect. The uncertain digit is the farthest right digit.`);
                setFeedbackClass('incorrect');
                await IncorrectResponses({ studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
                    setCorrectAnswers, setProgress, setMasteryLevel,
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
        <div className='lesson-two-point-one'>
            <div className='questionheader'>
                <div className="question-head-in">
                    <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                    <div className='insideheader'>
                        <h1>ChemClicks Assignments</h1>
                    </div>
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
            </div>
        </div>

        <div className="question-page-main">
            <div className='lesson-two-point-one-box'>
                <div className='lesson-two-point-one-box-innercont'>
                    <div className='lesson-two-point-one-box-title'>
                        <h1>Unit Two: Identifying the Uncertain Digit </h1>
                    </div>
                    <div className="lesson-two-point-one-content">
                        <p className='lesson-two-point-one-prompt'>
                            Observe the digital scale reading and enter the uncertaint digit (tenths place).
                        </p>
                        <div className='lesson-two-point-one-container'>
                            <div className='lesson-two-point-one-reading-container'>
                                <img src={require('../../assets/question/scale.png')} className="lesson-two-point-one-scale" alt="Scale" />
                                <h3 className='lesson-two-point-one-scale-reading'>{randomNumber}</h3>
                            </div>
                        </div>

                        <hr className="separator" />    
                        <div className="lesson-two-point-one-question">
                            <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Enter the uncertain digit" />
                            </div>
                        </div>

                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-two-point-one-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-two-point-one-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            <span className={`lesson-two-point-one-feedback ${feedbackClass}`}>{feedbackMessage}</span>
                        </div>
                    </div>
                </div>


            {/* Sidebar */}
            <div className="side-column">
                <div className="side-column-box-holder">
                    <div className="side-column-box masterybox">
                        <div className="side-column-box-title masteryboxtitle">
                            <h1>Mastery</h1>
                        </div>
                        {displayMedals && (
                            <>
                                <div
                                    className="reward-box-left"
                                    title="Congrats on achieving mastery! Feel free to keep practicing!"
                                >
                                    🏅
                                </div>
                                <div
                                    className="reward-box-right"
                                    title="Congrats on achieving mastery! Feel free to keep practicing!"
                                >
                                    🏅
                                </div>
                            </>
                        )}
                        <div className="side-column-box-info masteryboxstars">{stars}</div>
                    </div>

                    <div className="side-column-box">
                        <div className="side-column-box-title">
                            <h1>Goal</h1>
                        </div>
                        <div className="side-column-box-info">
                            {renderGoalChecks(goal, correctAnswers)}
                        </div>
                    </div>

                    <div className="side-column-box">
                        <div className="side-column-box-title">
                            <h1>Progress</h1>
                        </div>
                        <div className="side-column-box-info">
                            <div className="progressbox">
                                <div
                                    className="progressbar"
                                    style={{ '--progress': progress }}
                                ></div>
                                <div className="progress-text">
                                    Current Topic Progress: {progress.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        
    );
        
}

export default LessonTwoPointOne;