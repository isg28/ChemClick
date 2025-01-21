
import React, { useState, useEffect, useRef } from "react";
import '../../styles/question/Question.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/LessonOnePointThree.css';

function LessonOnePointThree() {
    const navigate = useNavigate();
    const startingMeasurementRef = useRef(null);

    const PIXELS_PER_INCH = 136; //The Scaling the pencil image!

    const handlequestion = () => {
        navigate('/dashboard');
    };

    // !! All these had to be scaled to the pencil image, used your starting position (0) as a inital state! 
    const positions = [
        { value: "0", position: 85.1, type: 'on tick' },
        { value: "0.1", position: 85.1 + PIXELS_PER_INCH * 0.1, type: 'closer to lower' },
        { value: "0.2", position: 85.1 + PIXELS_PER_INCH * 0.2, type: 'closer to lower' },
        { value: "0.3", position: 85.1 + PIXELS_PER_INCH * 0.3, type: 'closer to lower' },
        { value: "0.4", position: 85.1 + PIXELS_PER_INCH * 0.4, type: 'closer to lower' },
        { value: "0.5", position: 85.1 + PIXELS_PER_INCH * 0.5, type: 'centered' },
        { value: "0.6", position: 85.1 + PIXELS_PER_INCH * 0.6, type: 'closer to upper' },
        { value: "0.7", position: 85.1 + PIXELS_PER_INCH * 0.7, type: 'closer to upper' },
        { value: "0.8", position: 85.1 + PIXELS_PER_INCH * 0.8, type: 'closer to upper' },
        { value: "0.9", position: 85.1 + PIXELS_PER_INCH * 0.9, type: 'closer to upper' },
        { value: "1", position: 85.1 + PIXELS_PER_INCH * 1.0, type: 'on tick' },
        { value: "1.1", position: 85.1 + PIXELS_PER_INCH * 1.1, type: 'closer to lower' },
        { value: "1.2", position: 85.1 + PIXELS_PER_INCH * 1.2, type: 'closer to lower' },
        { value: "1.3", position: 85.1 + PIXELS_PER_INCH * 1.3, type: 'closer to lower' },
        { value: "1.4", position: 85.1 + PIXELS_PER_INCH * 1.4, type: 'closer to lower' },
        { value: "1.5", position: 85.1 + PIXELS_PER_INCH * 1.5, type: 'centered' },
        { value: "1.6", position: 85.1 + PIXELS_PER_INCH * 1.6, type: 'closer to upper' },
        { value: "1.7", position: 85.1 + PIXELS_PER_INCH * 1.7, type: 'closer to upper' },
        { value: "1.8", position: 85.1 + PIXELS_PER_INCH * 1.8, type: 'closer to upper' },
        { value: "1.9", position: 85.1 + PIXELS_PER_INCH * 1.9, type: 'closer to upper' },
        { value: "2", position: 85.1 + PIXELS_PER_INCH * 2.0, type: 'on tick' },
        { value: "2.1", position: 85.1 + PIXELS_PER_INCH * 2.1, type: 'closer to lower' },
        { value: "2.2", position: 85.1 + PIXELS_PER_INCH * 2.2, type: 'closer to lower' },
        { value: "2.3", position: 85.1 + PIXELS_PER_INCH * 2.3, type: 'closer to lower' },
        { value: "2.4", position: 85.1 + PIXELS_PER_INCH * 2.4, type: 'closer to lower' },
        { value: "2.5", position: 85.1 + PIXELS_PER_INCH * 2.5, type: 'centered' },
        { value: "2.6", position: 85.1 + PIXELS_PER_INCH * 2.6, type: 'closer to upper' },
        { value: "2.7", position: 85.1 + PIXELS_PER_INCH * 2.7, type: 'closer to upper' },
        { value: "2.8", position: 85.1 + PIXELS_PER_INCH * 2.8, type: 'closer to upper' },
        { value: "2.9", position: 85.1 + PIXELS_PER_INCH * 2.9, type: 'closer to upper' },
        { value: "3", position: 85.1 + PIXELS_PER_INCH * 3.0, type: 'on tick' },
        { value: "3.1", position: 85.1 + PIXELS_PER_INCH * 3.1, type: 'closer to lower' },
        { value: "3.2", position: 85.1 + PIXELS_PER_INCH * 3.2, type: 'closer to lower' },
        { value: "3.3", position: 85.1 + PIXELS_PER_INCH * 3.3, type: 'closer to lower' },
        { value: "3.4", position: 85.1 + PIXELS_PER_INCH * 3.4, type: 'closer to lower' },
        { value: "3.5", position: 85.1 + PIXELS_PER_INCH * 3.5, type: 'centered' },
        { value: "3.6", position: 85.1 + PIXELS_PER_INCH * 3.6, type: 'closer to upper' },
        { value: "3.7", position: 85.1 + PIXELS_PER_INCH * 3.7, type: 'closer to upper' },
        { value: "3.8", position: 85.1 + PIXELS_PER_INCH * 3.8, type: 'closer to upper' },
        { value: "3.9", position: 85.1 + PIXELS_PER_INCH * 3.9, type: 'closer to upper' },
        { value: "4", position: 85.1 + PIXELS_PER_INCH * 4.0, type: 'on tick' },
        { value: "4.1", position: 85.1 + PIXELS_PER_INCH * 4.1, type: 'closer to lower' },
        { value: "4.2", position: 85.1 + PIXELS_PER_INCH * 4.2, type: 'closer to lower' },
        { value: "4.3", position: 85.1 + PIXELS_PER_INCH * 4.3, type: 'closer to lower' },
        { value: "4.4", position: 85.1 + PIXELS_PER_INCH * 4.4, type: 'closer to lower' },
        { value: "4.5", position: 85.1 + PIXELS_PER_INCH * 4.5, type: 'centered' },
        { value: "4.6", position: 85.1 + PIXELS_PER_INCH * 4.6, type: 'closer to upper' },
        { value: "4.7", position: 85.1 + PIXELS_PER_INCH * 4.7, type: 'closer to upper' },
        { value: "4.8", position: 85.1 + PIXELS_PER_INCH * 4.8, type: 'closer to upper' },
        { value: "4.9", position: 85.1 + PIXELS_PER_INCH * 4.9, type: 'closer to upper' },
        { value: "5", position: 85.1 + PIXELS_PER_INCH * 5.0, type: 'on tick' },
        { value: "5.1", position: 85.1 + PIXELS_PER_INCH * 5.1, type: 'closer to lower' },
        { value: "5.2", position: 85.1 + PIXELS_PER_INCH * 5.2, type: 'closer to lower' },
        { value: "5.3", position: 85.1 + PIXELS_PER_INCH * 5.3, type: 'closer to lower' },
        { value: "5.4", position: 85.1 + PIXELS_PER_INCH * 5.4, type: 'closer to lower' },
        { value: "5.5", position: 85.1 + PIXELS_PER_INCH * 5.5, type: 'centered' },
        { value: "5.6", position: 85.1 + PIXELS_PER_INCH * 5.6, type: 'closer to upper' },
        { value: "5.7", position: 85.1 + PIXELS_PER_INCH * 5.7, type: 'closer to upper' },
        { value: "5.8", position: 85.1 + PIXELS_PER_INCH * 5.8, type: 'closer to upper' },
        { value: "5.9", position: 85.1 + PIXELS_PER_INCH * 5.9, type: 'closer to upper' }
    ];

    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [pencilLength, setPencilLength] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [leftPosition, setLeftPosition] = useState(85);

    const generateRandomPencilLength = () => {
        // Generate random pencil length between 1.0 and 6.0 inches
        const length = (Math.random() * 5 + 1).toFixed(1);
        setPencilLength(length);
        // console.log("Pencil Width (pixels):", length * PIXELS_PER_INCH);

    };

    useEffect(() => {
        setLeftPosition(85); // Reset cursor position
        startingMeasurementRef.current.style.left = '85px';
        generateRandomPencilLength();
    }, []);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffsetX(e.clientX - e.target.getBoundingClientRect().left);
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            const newLeft = e.clientX - offsetX;
            if (newLeft >= 85 && newLeft <= 889) {
                document.querySelector('.lesson-one-point-three-starting-measurement').style.left = `${newLeft}px`;
                setLineWidth(newLeft - 85);
            }
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // !! Did some changes here! 
    const handleSubmit = () => {
        const pencilTipPixel = leftPosition + pencilLength * PIXELS_PER_INCH;


        const closestPosition = positions.reduce((prev, curr) =>
            Math.abs(curr.position - pencilTipPixel) < Math.abs(prev.position - pencilTipPixel) ? curr : prev
        );

        console.log("Closest Position:", closestPosition);
        console.log("User Input:", userInput);

        const correctAnswer = parseFloat(closestPosition.value);
        const userAnswer = parseFloat(userInput);

        if (userAnswer === correctAnswer) {
            setFeedbackMessage("Correct! Great job!");
            setFeedbackClass('correct');
            setTimeout(() => {
                resetQuestion();
            }, 2000);
        } else {
            setFeedbackMessage("Incorrect. Check the measurement again!");
            //    setFeedbackMessage(`Incorrect. The correct measurement is ${correctAnswer.toFixed(1)} inches.`);
            setFeedbackClass('incorrect');
            setTimeout(() => {
                setFeedbackMessage('');
                setFeedbackClass('');
            }, 4000);
        }

    };

    const resetQuestion = () => {
        setUserInput("");
        setFeedbackMessage('');
        setFeedbackClass('');
        setLeftPosition(85);
        setLineWidth(0); // remove the red line when reset
        startingMeasurementRef.current.style.left = '85px';
        generateRandomPencilLength();
    };

    return (
        <div
            className='lesson-one-point-three'
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
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
                <div className='lesson-one-point-three-box'>
                    <div className='lesson-one-point-three-box-innercont'>
                        <div className='lesson-one-point-three-box-title'>
                            <h1>Unit One: Uncertainty in Measurement - Object Length</h1>
                        </div>
                        <div className='lesson-one-point-three-content'>
                            <p className='lesson-one-point-three-prompt'>
                                Measure the pencil length using the cursor and type your estimate in the box below.
                            </p>
                            <div className='lesson-one-point-three-measurement-container'>
                                <img
                                    src={require('../../assets/question/pencil.png')}
                                    className='lesson-one-point-three-pencil'
                                    alt="Pencil"
                                    style={{ width: `${pencilLength * PIXELS_PER_INCH}px` }}
                                />
                                <div className='lesson-one-point-three-line' style={{ width: `${lineWidth}px` }}></div>
                                <img
                                    src={require('../../assets/question/startingmeasurement.png')}
                                    className="lesson-one-point-three-starting-measurement"
                                    alt="Starting Measurement"
                                    onMouseDown={handleMouseDown}
                                    ref={startingMeasurementRef}
                                    style={{ cursor: 'pointer', left: `${leftPosition}px` }}
                                />
                            </div>
                            <div className="lesson-one-point-three-ruler-container">
                                <img src={require('../../assets/question/ruler.png')} className="lesson-one-point-three-ruler" alt="Ruler" />
                            </div>
                            <hr className="separator" />
                            <div className="lesson-one-point-three-question">
                                <input
                                    type="text"
                                    className = "lesson-one-point-three-input"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Enter your measurement"
                                />
                            
                                <button className='lesson-one-point-three-submit' onClick={handleSubmit}>Submit Answer</button>
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
                        <div className='side-column-box'>
                            <div className='side-column-box-title'><h1>Mastery</h1></div>
                            <div className='side-column-box-info'>Placeholder</div>
                        </div>
                        <div className='side-column-box'>
                            <div className='side-column-box-title'><h1>Goal</h1></div>
                            <div className='side-column-box-info'>Placeholder</div>
                        </div>
                        <div className='side-column-box'>
                            <div className='side-column-box-title'><h1>Progress</h1></div>
                            <div className='side-column-box-info'>Placeholder</div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}

export default LessonOnePointThree;