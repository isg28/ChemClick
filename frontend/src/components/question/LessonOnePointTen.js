import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointTen.css';
import { useNavigate } from 'react-router-dom';

function LessonOnePointTen() {
    const navigate = useNavigate();

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "2.95", position: -100 },
        { value: "2.90", position: -99 },
        { value: "2.85", position: -97 },
        { value: "2.80", position: -96 },
        { value: "2.75", position: -94.5 },
        { value: "2.70", position: -93 },
        { value: "2.65", position: -92 },
        { value: "2.60", position: -90.3 },
        { value: "2.55", position: -88.8 },
        { value: "2.50", position: -87.7 },
        { value: "2.45", position: -86.5 },
        { value: "2.40", position: -85 },
        { value: "2.35", position: -83.7 },
        { value: "2.30", position: -82 },
        { value: "2.25", position: -80.5 },
        { value: "2.20", position: -79.5 },
        { value: "2.15", position: -78 },
        { value: "2.10", position: -76.6 },
        { value: "2.05", position: -75 },
        { value: "2.00", position: -74 },
        { value: "1.95", position: -72.5 },
        { value: "1.90", position: -71 },
        { value: "1.85", position: -69.5 },
        { value: "1.80", position: -68 },
        { value: "1.75", position: -66.8 },
        { value: "1.70", position: -65.5 },
        { value: "1.65", position: -64 },
        { value: "1.60", position: -62.5 },
        { value: "1.55", position: -61 },
        { value: "1.50", position: -60 },
        { value: "1.45", position: -58.5 },
        { value: "1.40", position: -57 },
        { value: "1.35", position: -55.5 },
        { value: "1.30", position: -54 },
        { value: "1.25", position: -52.7 },
        { value: "1.20", position: -51 },
        { value: "1.15", position: -50 },
        { value: "1.10", position: -48.5 },
        { value: "1.05", position: -47 },
        { value: "1.00", position: -46 },
        { value: "0.95", position: -44.5 },
        { value: "0.90", position: -43 },
        { value: "0.85", position: -41.2 },
        { value: "0.80", position: -40 },
        { value: "0.75", position: -38.7 },
        { value: "0.70", position: -37.5 },
        { value: "0.65", position: -35.5 },
        { value: "0.60", position: -34 },
        { value: "0.55", position: -33 },
        { value: "0.50", position: -32 },
        { value: "0.45", position: -31 },
        { value: "0.40", position: -29.5 },
        { value: "0.35", position: -27.5 },
        { value: "0.30", position: -26 },
        { value: "0.25", position: -24.5 },
        { value: "0.20", position: -23.5 },
        { value: "0.15", position: -22 },
        { value: "0.10", position: -20 },
        { value: "0.05", position: -19.5 },
        { value: "0.00", position: -18 },
        
    ];

    const questions = positions.map(pos => ({
        value: pos.value,
        positionType: pos.type,
        cursorPosition: `${pos.position}%`
    }));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [currentPositionIndex, setCurrentPositionIndex] = useState(positions.length / 2); // start at middle position
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [bubbles, setBubbles] = useState([]); 

    const addBubble = (isMovingDown) => {
        if (Math.random() > 0.5) return; // 50% chance to create a bubble
    
        const filledWaterLeft = 42; 
        const filledWaterWidth = 10; 
    
        const bubbleColors = [
            "rgba(173, 216, 230, 0.2)", // Lighter blue with very low opacity
            "rgba(200, 230, 255, 0.2)", // ^
            "rgba(220, 240, 255, 0.1)", // Almost white with a hint of blue
            "rgba(240, 255, 255, 0.4)", // Light cyan
            "rgba(240, 248, 255, 0.8)", // Alice blue
        ];

        const newBubble = {
            id: Date.now(),
            size: Math.random() * 4 + 9, 
            left: Math.random() * filledWaterWidth + filledWaterLeft, 
            color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)], 
            duration: isMovingDown ? 1.5 : 2, 
        };
        setBubbles((prevBubbles) => [...prevBubbles, newBubble]);
    
        setTimeout(() => {
            setBubbles((prevBubbles) => prevBubbles.filter((bubble) => bubble.id !== newBubble.id));
        }, newBubble.duration * 1000); 
    };

    useEffect(() => {
        const shuffleQuestions = () => {
            let shuffled = [...questions];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        setRandomizedQuestions(shuffleQuestions());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex]);

    // event listener for arrow keys
    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.key === 'ArrowUp'){
                setCurrentPositionIndex((prevIndex) => Math.max(0, prevIndex - 1));
                addBubble(true);
                event.preventDefault();     // prevents arrow key from scrolling page
            } else if (event.key === 'ArrowDown'){
                setCurrentPositionIndex((prevIndex) => Math.min(positions.length - 1, prevIndex + 1));
                addBubble(false);
                event.preventDefault();     // prevents arrow key from scrolling page
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, );

    const validateAnswer = () => {
        const correctAnswer = parseFloat(randomizedQuestions[currentQuestionIndex].value);
        const userAnswer = parseFloat(questions[currentPositionIndex].value);
    
        if (userAnswer === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            return;
        } else {
            setFeedback("Not quite right. Check your answer and try again!");
            setFeedbackClass('incorrect');

            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2500);
            return;
        }
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setFeedback('');
            setFeedbackClass('hidden');
            setIsAnswerCorrect(false);
        }
    };

    return (
        <div className='lesson-one-point-seven'>
            <div className='questionheader'>
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={handlequestion} alt="Home Lines" />
                <div className='insideheader'><h1>ChemClicks Assignments</h1></div>
            </div>
            <div className='lesson-one-point-seven-box'>
                <div className='lesson-one-point-seven-box-title'>
                    <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                </div>
                <div className='lesson-one-point-seven-content'>
                    <p className='lesson-one-point-seven-prompt'>
                        Look at the graduted cylinder and use the up and down arrow keys to position the meniscus at the given measurement. <br />
                        Hint: Make sure to measure from the bottom of the meniscus!
                    </p>
                    <div className="lesson-one-point-seven-cylinder-container">
                        <div className="lesson-one-point-seven-currentMeasurement">
                            <p>Current Measurement: {questions[currentPositionIndex].value} mL</p>
                        </div>
                        <div className="lesson-one-point-seven-cylinderWaterContainer">
                            <img src={require('../../assets/question/gradCylinder2.png')} className="lesson-one-point-seven-cylinder" alt="Graduated Cylinder" />
                            <img src={require('../../assets/question/water.png')} className="lesson-one-point-seven-cylinderWater" alt="Water" style={{ top: questions[currentPositionIndex]?.cursorPosition }} />
                            {bubbles.map((bubble) => (
                            <div
                                key={bubble.id}
                                className="bubble"
                                style={{
                                    width: `${bubble.size}px`,
                                    height: `${bubble.size}px`,
                                    left: `${bubble.left}%`,
                                    bottom: bubble.bottom,
                                    backgroundColor: bubble.color,
                                    animationDuration: `${bubble.duration}s`,
                                }}
                            ></div>
                            ))}
                        </div>
                    </div>

                    <hr className="separator" />
                    <div className='lesson-one-point-seven-question'>
                        <h1>Use the up and down arrow keys to show the measurement of {randomizedQuestions[currentQuestionIndex]?.value} mL.</h1>
                    </div>
                </div>

                <div className="submit-feedback-container">
                    {!isAnswerCorrect && (
                        <button className='lesson-one-point-seven-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                    )}
                    {isAnswerCorrect && (
                        <button className='lesson-one-point-seven-next' onClick={handleNextQuestion}>Next Question</button>
                    )}
                    <span className={`lesson-one-point-seven-feedback ${feedbackClass}`}>{feedback}</span>
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

export default LessonOnePointTen;
