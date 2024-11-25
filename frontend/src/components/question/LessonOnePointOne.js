import React, { useState, useEffect, useRef } from "react";
import '../../styles/question/Question.css';
import {useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointOne.css';

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


    const generateRandomNumberAndPosition = () => {
        // Generate random number between 0.0 and 5.9
        const randomNum = (Math.random() * 5.9).toFixed(1);
        setRandomNumber(randomNum);

    };

    // Use effect to set initial state and call the new function
    useEffect(() => {
        setLeftPosition(85); // Ensure the starting position is 85px
        startingMeasurementRef.current.style.left = '85px';

        generateRandomNumberAndPosition();
    }, []);


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


    const handleSubmit = () => {
        const targetPosition = 85 + (randomNumber / 5.9) * 790;
        const currentLeft = parseFloat(startingMeasurementRef.current.style.left || '0');
        const tolerance = 8;
        
        if (Math.abs(currentLeft - targetPosition) <= tolerance) {
            setFeedbackMessage("Correct! Moving to the next question.");
            setFeedbackClass('correct');

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
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
                <div className='insideheader'><h1>ChemClicks Assignments</h1></div>
            </div>
            <div className='lesson-one-point-one-box'>
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

            {/* Consistent for Each Question Page */}
            <div className='masterybox'>
                <div className='masteryboxtitle'><h1>Mastery</h1></div>
                <div className='masteryboxstars'>
                    <img src={require('../../assets/question/Stars.png')} className='masterystars' alt="Mastery Stars"/>
                </div>
            </div>
            <div className='goalbox'>
                <div className='goalboxtitle'><h1>Goal</h1></div>
                <div className='goalboxchecks'>
                    <img src={require('../../assets/question/Checkmarks.png')} className='goalchecks' alt="Goal Checks"/>
                </div>
            </div>
            <div className='progressbox'>
                <div className='progressboxtitle'><h1>Progress</h1>
                    <h2>Current Topic Progress: 33%</h2>
                </div>
                <div className='progressboxbar'>
                    <img src={require('../../assets/question/ProgressBar.jpg')} className='progressbar' alt="Progress Bar" />
                </div>
            </div>
        </div>
    );
}

export default LessonOnePointOne;