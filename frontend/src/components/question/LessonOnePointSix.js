import React, { useState, useEffect, useRef } from "react";
import '../../styles/question/Question.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/LessonOnePointSix.css';

function LessonOnePointSix() {
    const navigate = useNavigate();

    const PIXELS_PER_INCH = 121;
    const INITIAL_POSITION = 130;

    // Generate positions dynamically
    const generatePositions = (start, end, step) => {
        const positions = [];
        for (let i = start; i <= end; i += step) {
            positions.push({
                value: i.toFixed(2), // Use two decimal places for value
                position: INITIAL_POSITION + PIXELS_PER_INCH * i,
                type: i % 1 === 0 ? 'on tick' : (i % 0.5 === 0 ? 'centered' : 'closer to upper or lower'),
            });
        }
        return positions;
    };
    
    // Generate positions from 0.00 to 6.00 in steps of 0.01
    const positions = generatePositions(0, 6, 0.01);

    // State variables
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [pencilLength, setPencilLength] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [leftPosition, setLeftPosition] = useState(INITIAL_POSITION);

    const dragState = useRef({
        isDragging: false,
        offsetX: 0
    });

    // Generate random pencil length between 1.0 and 6.0 inches
    const generateRandomPencilLength = () => {
        const length = (Math.random() * 5 + 1).toFixed(2); // Random number between 1.00 and 6.00
        setPencilLength(parseFloat(length)); // Ensure it's a float
    };    

    useEffect(() => {
        setLeftPosition(INITIAL_POSITION); // Reset dragger to the initial position
        generateRandomPencilLength(); // Generate a new random pencil length
    }, []);

    // Handle mouse down event for drag
    const handleMouseDown = (e) => {
        dragState.current.isDragging = true;
        dragState.current.offsetX = e.clientX - e.target.getBoundingClientRect().left;
    };

    // Handle mouse move event for drag
    const handleMouseMove = (e) => {
        if (dragState.current.isDragging) {
            const newLeft = e.clientX - dragState.current.offsetX;
            if (newLeft >= INITIAL_POSITION && newLeft <= 889) { // Stay within bounds
                setLeftPosition(newLeft);
            }
        }
    };

    // Handle mouse up event for drag
    const handleMouseUp = () => {
        dragState.current.isDragging = false;
    };

    // Handle submission and feedback logic
  const handleSubmit = () => {
    if (!userInput || isNaN(userInput)) {
        setFeedbackMessage("Please enter a valid number.");
        setFeedbackClass('incorrect');
        return;
    }

    // Calculate the pixel position for the pencil tip
    const pencilTipPixel = INITIAL_POSITION + pencilLength * PIXELS_PER_INCH;

    // Find the closest position to the pencil tip in positions array
    const closestPosition = positions.reduce((prev, curr) =>
        Math.abs(curr.position - pencilTipPixel) < Math.abs(prev.position - pencilTipPixel) ? curr : prev
    );

    // Correct answer in the hundredths place
    const correctAnswer = parseFloat(closestPosition.value).toFixed(2);

    // User's answer rounded to two decimal places
    const userAnswer = parseFloat(userInput).toFixed(2);

    // Compare user's answer with the correct answer
    if (userAnswer === correctAnswer) {
        setFeedbackMessage("Correct! Great job!");
        setFeedbackClass('correct');
        setTimeout(() => resetQuestion(), 2000);
    } else {
        setFeedbackMessage(`Incorrect. The correct answer was wrong, try again`);
        setFeedbackClass('incorrect');
        setTimeout(() => {
            setFeedbackMessage('');
            setFeedbackClass('');
        }, 4000);
    }
};

    // Reset state for the next question
    const resetQuestion = () => {
        setUserInput("");
        setFeedbackMessage('');
        setFeedbackClass('');
        setLeftPosition(INITIAL_POSITION);
        generateRandomPencilLength();
    };

    return (
        <div
            className='lesson-one-point-six'
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className='questionheader'>
                <img
                    src={require('../../assets/question/ChemClickLogo.png')}
                    className='ChemClickLogoHeader'
                    alt="Chem Click Logo"
                />
                <img
                    src={require('../../assets/question/Home.png')}
                    className='homelines'
                    onClick={() => navigate('/dashboard')}
                    alt="Home Lines"
                />
                <div className='insideheader'><h1>ChemClicks Assignments</h1></div>
            </div>

            <div className='lesson-one-point-six-box'>
                <div className='lesson-one-point-six-box-title'>
                    <h1>Unit One: Uncertainty in Measurement - Advanced Measurement</h1>
                </div>
                <div className='lesson-one-point-six-content'>
                    <p className='lesson-one-point-six-prompt'>
                        Measure the pencil length using the cursor and type your estimate in the box below (to the nearest hundredth).
                    </p>
                    <img
                        src={require('../../assets/question/pencil.png')}
                        className='lesson-one-point-six-pencil'
                        alt="Pencil"
                        style={{
                            width: `${pencilLength * PIXELS_PER_INCH}px`, // Adjusts dynamically
                            height: '70px', // Ensures height scales proportionally
                            position: 'absolute',
                            left: '130px',
                            top: '320px', // Keeps pencil aligned
                        }}
                    />
                    <div
                        className="lesson-one-point-six-dragger"
                        style={{
                            left: `${leftPosition}px`,
                        }}
                        onMouseDown={handleMouseDown}
                    ></div>
                    <div
                        className='lesson-one-point-six-line'
                        style={{ width: `${leftPosition - INITIAL_POSITION}px` }}
                    ></div>
                    <div className="lesson-one-point-six-ruler-container">
                        <img
                            src={require('../../assets/question/RulerH.png')}
                            className="lesson-one-point-six-ruler"
                            alt="Ruler"
                        />
                    </div>
                    <hr className="separator" />
                    <div className="lesson-one-point-six-question">
                        <input
                            type="text"
                            className = "lesson-one-point-six-input"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Enter your measurement (e.g., 3.4)"
                            aria-label="User Measurement Input"
                        />
                        <button
                            className='lesson-one-point-six-submit'
                            onClick={handleSubmit}
                        >
                            Submit Answer
                        </button>
                    </div>
                    <div className={`lesson-one-point-six-feedback ${feedbackClass}`}>
                        <p>{feedbackMessage}</p>
                    </div>
                </div>
            </div>

            {/* Consistent section for progress */}
            <div className='masterybox'>
                <div className='masteryboxtitle'><h1>Mastery</h1></div>
                <div className='masteryboxstars'>
                    <img
                        src={require('../../assets/question/Stars.png')}
                        className='masterystars'
                        alt="Mastery Stars"
                    />
                </div>
            </div>
            <div className='goalbox'>
                <div className='goalboxtitle'><h1>Goal</h1></div>
                <div className='goalboxchecks'>
                    <img
                        src={require('../../assets/question/Checkmarks.png')}
                        className='goalchecks'
                        alt="Goal Checks"
                    />
                </div>
            </div>
            <div className='progressbox'>
                <div className='progressboxtitle'><h1>Progress</h1></div>
                <div className='progressboxbar'>
                    <img
                        src={require('../../assets/question/ProgressBar.jpg')}
                        className='progressbar'
                        alt="Progress Bar"
                    />
                </div>
            </div>
        </div>
    );
}

export default LessonOnePointSix;
