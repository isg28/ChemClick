import React, { useState, useEffect, useRef } from "react";
import '../../styles/question/Question.css';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/LessonOnePointSix.css';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonOnePointSix() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson1.6'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const PIXELS_PER_INCH = 121;
    const INITIAL_POSITION = 130;

    const handlequestion = () => {
        navigate('/dashboard');
    };

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
        setLeftPosition(INITIAL_POSITION); // Reset dragger to the initial position
        generateRandomPencilLength(); // Generate a new random pencil length
    }, [studentId, lessonId, navigate]);

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
    const handleSubmit = async () => {
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
        await CorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal,starsEarned,
            setCorrectAnswers, setProgress, setMasteryLevel,
        }); 
        setTimeout(() => resetQuestion(), 2000);
    } else {
        setFeedbackMessage(`Incorrect. The correct answer was wrong, try again`);
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
                <div className="question-head-in">
                    <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                    <div className='insideheader'>
                        <h1>ChemClicks Assignments</h1>
                    </div>
                    <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
                </div>
            </div>

            <div className="question-page-main">
                <div className='lesson-one-point-six-box'>
                    <div className='lesson-one-point-six-box-innercont'>
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

export default LessonOnePointSix;
