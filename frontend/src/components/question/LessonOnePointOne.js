import React, { useState, useEffect } from "react";
import '../../styles/question/Question.css';
import {useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointOne.css';

function LessonOnePointOne(){
    const navigate = useNavigate();

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const [offsetX, setOffsetX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [lineWidth, setLineWidth] = useState(0); // Line width in pixels



    // Start dragging and record initial click position
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
    };

    // Handle movement while dragging
    const handleMouseMove = (e) => {
        if (isDragging) {
            const newLeft = e.clientX - offsetX;
            if (newLeft >= 85 && newLeft <= 889) { // Adjust boundaries as per container width
                document.querySelector('.lesson-one-point-one-starting-measurement').style.left = `${newLeft}px`;
                setLineWidth(newLeft - 85); // Update the line width based on position
            }
        }
    };

    // Stop dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className='lesson-one-point-one' onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}>
            <div className='questionheader'>
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
                <div className='insideheader'><h1>ChemClick Assignments</h1></div>
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
                        onMouseDown={handleMouseDown}
                        style={{ cursor: 'pointer' }}/>
                    </div>
                    <div className="lesson-one-point-one-ruler-container">
                        <img src={require('../../assets/question/ruler.png')} className="lesson-one-point-one-ruler" alt="Ruler" />
                    </div>

                    <hr className="separator" />
                    <div className='lesson-one-point-one-question'>
                        <h1>Click and drag the cursor to show the measurement of [number]. </h1>
                        <button className='submitbutton'>Submit Answer</button>
                    </div>
                </div>

                <div className="submit-feedback-container">


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