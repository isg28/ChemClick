import React, { useState, useEffect, useRef } from "react";
import '../../styles/question/Question.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/LessonOnePointThree.css';
import { renderStars, renderGoalChecks } from '../../components/question/LessonUtils';

function LessonOnePointThree() {
    const navigate = useNavigate();
    const rulerRef = useRef(null);
    const cursorRef = useRef(null);
    const pencilRef = useRef(null);
    
    const PIXELS_PER_INCH = 136;
    
    const [initialPosition, setInitialPosition] = useState(0);
    const [pencilLength, setPencilLength] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [cursorPosition, setCursorPosition] = useState(0);
    const dragState = useRef({ isDragging: false, offsetX: 0 });

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

const handleSubmit = () => {
    // Convert cursor position to inches
    const measuredInches = ((cursorPosition - initialPosition) / PIXELS_PER_INCH).toFixed(1);
    
    // Ensure floating-point rounding does not cause off-by-one errors
    const correctAnswer = pencilLength.toFixed(1);
    
    // Allow for a small tolerance of ±0.05 to compensate for small pixel misalignment
    const tolerance = 0.05;
    
    if (Math.abs(parseFloat(userInput) - parseFloat(correctAnswer)) <= tolerance) {
        setFeedbackMessage(`Correct! The measurement is approximately ${correctAnswer} inches.`);
        setFeedbackClass('correct');
        setTimeout(() => resetQuestion(), 2000);
    } else {
        setFeedbackMessage(`Incorrect. The correct measurement is around ${correctAnswer} inches.`);
        setFeedbackClass('incorrect');
        setTimeout(() => setFeedbackMessage(''), 4000);
    }
};
    const resetQuestion = () => {
        setUserInput("");
        setFeedbackMessage('');
        setFeedbackClass('');
        setCursorPosition(initialPosition);
        generateRandomPencilLength();
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
                                    placeholder="Enter your measurement"
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
                            <div className="side-column-box-title masteryboxtitle"> <h1>Mastery</h1> </div>
                            <div className="side-column-box-info masteryboxstars"></div>
                        </div>
                        <div className='side-column-box'>
                            <div className='side-column-box-title'><h1>Goal</h1></div>
                            <div className='side-column-box-info'>{renderGoalChecks()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LessonOnePointThree;
