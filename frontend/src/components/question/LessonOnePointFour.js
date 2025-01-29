import React, { useState, useEffect, useRef } from "react";
import '../../styles/question/Question.css';
import {useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointFour.css';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonOnePointFour(){
    const navigate = useNavigate();

    const [randomNumber, setRandomNumber] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');

    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson1.4'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const generateRandomNumberAndPosition = () => {
        const randomNum = (Math.random() * 5.99).toFixed(2);
        setRandomNumber(randomNum);
    };

    useEffect(() => {
        if (!studentId) {
            console.error('Student ID not found');
            navigate('/login'); // Redirect to login if studentId is missing
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

        generateRandomNumberAndPosition();
    }, [studentId, lessonId, navigate]);

    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const handleSubmit = async () => {
        const targetPosition = randomNumber;
        
        if (targetPosition == sliderValue/100) {
            setFeedbackMessage("Correct! Moving to the next question.");
            setFeedbackClass('correct');
            await CorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal,starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            }); 

            setTimeout(() => {
                setFeedbackMessage('');
                setFeedbackClass('');
            }, 2000);

            setRandomNumber((Math.random() * 5.99).toFixed(2))
        
        } else {
            setFeedbackMessage("Try again! Please adjust the measurement. You may just be a little off.");
            setFeedbackClass('incorrect');

            await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            });
            setTimeout(() => {
                setFeedbackMessage('');
                setFeedbackClass('');
            }, 4000);
        }
    };

    return (
        <div className='lesson-one-point-four'>
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
                <div className='lesson-one-point-four-box'>
                    <div className='lesson-one-point-four-box-innercont'>
                        <div className='lesson-one-point-four-box-title'>
                            <h1>Unit One: Uncertainty in Measurement - Hundredths Value</h1>
                        </div>
                        <div className='lesson-one-point-four-content'>
                            <p className='lesson-one-point-four-prompt'>
                                Click and drag the dot to create a line to the measurement listed below. Submit the answer when you are ready.
                            </p>
                            <div className="lesson-one-point-four-measurement-container">
                            <div 
                                className="slider-value-display"
                                style={{ left: `${(sliderValue / 600) * 100}%` }}
                            >
                                {sliderValue/100}
                            </div>
                                <input
                                type="range"
                                min="0"
                                max="600"
                                value={sliderValue}
                                onChange={handleSliderChange}
                                className="lesson-one-point-four-slider"
                                />
                            </div>
                            <div className="lesson-one-point-four-ruler-container">
                                <img src={require('../../assets/question/RulerH.png')} className="lesson-one-point-four-ruler" alt="Ruler" />
                            </div>

                            <hr className="separator" />
                            <div className='lesson-one-point-four-question'>
                                <h1>Click and drag the cursor to show the measurement of {randomNumber} inches. </h1>
                            </div>
                        </div>
                        <div className="submit-feedback-container">
                            <button className='lesson-one-point-one-submit' onClick={handleSubmit}>Submit Answer</button>
                            <div className={`lesson-one-point-one-feedback ${feedbackClass}`}>
                            <p>{feedbackMessage}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Consistent for Each Question Page */}
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
                        <div className='side-column-box'>
                            <div className='side-column-box-title'><h1>Progress</h1></div>
                            <div className='side-column-box-info'>              
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

export default LessonOnePointFour;