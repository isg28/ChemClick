import React, { useState, useEffect, useRef } from "react";
import '../../styles/question/Question.css';
import {useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointOne.css';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonOnePointOne(){
    const navigate = useNavigate();
    const startingMeasurementRef = useRef(null);

    const handlequestion = () => {
        navigate('/dashboard');
    };
    const [offsetX, setOffsetX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [lineWidth, setLineWidth] = useState(0);
    const [randomNumber, setRandomNumber] = useState(0);
    const [leftPosition, setLeftPosition] = useState(85);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');

    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson1.1'; 
    
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const generateRandomNumberAndPosition = () => {
        // Generate random number between 0.0 and 5.9
        const randomNum = (Math.random() * 5.9).toFixed(1);
        setRandomNumber(randomNum);

    };

    // Use effect to set initial state and call the new function
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
        setLeftPosition(85); // Ensure the starting position is 85px
        startingMeasurementRef.current.style.left = '85px';

        generateRandomNumberAndPosition();
    }, [studentId, lessonId, navigate]);


    // Start dragging and record initial click position
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
    };


    const handleMouseMove = (e) => {
        if (isDragging) {
            const newLeft = e.clientX - offsetX;
            if (newLeft >= 85 && newLeft <= 889) { // Adjust boundaries as per container width
                document.querySelector('.lesson-one-point-one-starting-measurement').style.left = `${newLeft}px`;
                setLineWidth(newLeft - 85); // Update the line width based on position
            }
        }
    };


    const handleSubmit = async () => {
        const targetPosition = 85 + (randomNumber / 5.9) * 790;
        const currentLeft = parseFloat(startingMeasurementRef.current.style.left || '0');
        const tolerance = 8;
        
        if (Math.abs(currentLeft - targetPosition) <= tolerance) {
            setFeedbackMessage("Correct! Moving to the next question.");
            setFeedbackClass('correct');
            await CorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal,starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            }); 

            setTimeout(() => {
                setFeedbackMessage('');
                setFeedbackClass('');
            }, 2000);
        
            setRandomNumber((Math.random() * 5.9).toFixed(1));
            setLineWidth(0);
            setLeftPosition(85);
            startingMeasurementRef.current.style.left = '85px';
        } else {
            setFeedbackMessage("Try again! Please adjust the measurement. You may just be a little off.");
            setFeedbackClass('incorrect');
            setLineWidth(0);
            setLeftPosition(85);
            startingMeasurementRef.current.style.left = '85px';
            await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            });
            setTimeout(() => {
                setFeedbackMessage('');
                setFeedbackClass('');
            }, 4000);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className='lesson-one-point-one' onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
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
                <div className='lesson-one-point-one-box'>
                    <div className='lesson-one-point-one-box-innercont'>
                        <div className='lesson-one-point-one-box-title'>
                            <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                        </div>
                        <div className='lesson-one-point-one-content'>
                            <p className='lesson-one-point-one-prompt'>
                                Click and drag the dot to create a line to the measurement listed below. Submit the answer when you are ready.
                            </p>
                            <div className='lesson-one-point-one-measurement-container'>
                                <div className = 'lesson-one-point-one-line' style = {{width: `${lineWidth}px`}}></div>
                                <img src ={require('../../assets/question/startingmeasurement.png')} className= "lesson-one-point-one-starting-measurement" alt= "Starting Measurment"
                                onMouseDown={handleMouseDown} ref = {startingMeasurementRef}
                                style={{ cursor: 'pointer', left: `${leftPosition}px`}}/>
                            </div>
                            <div className="lesson-one-point-one-ruler-container">
                                <img src={require('../../assets/question/ruler.png')} className="lesson-one-point-one-ruler" alt="Ruler" />
                            </div>

                            <hr className="separator" />
                            <div className='lesson-one-point-one-question'>
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

export default LessonOnePointOne;