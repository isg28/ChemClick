import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointNine.css';
import { useNavigate } from 'react-router-dom';

function LessonOnePointNine() {
    const navigate = useNavigate();

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "5.9", position: -100 },
        { value: "5.8", position: -99 },
        { value: "5.7", position: -97 },
        { value: "5.6", position: -96 },
        { value: "5.5", position: -94.5 },
        { value: "5.4", position: -93 },
        { value: "5.3", position: -92 },
        { value: "5.2", position: -90.3 },
        { value: "5.1", position: -88.8 },
        { value: "5.0", position: -87.7 },
        { value: "4.9", position: -86.5 },
        { value: "4.8", position: -85 },
        { value: "4.7", position: -83.5 },
        { value: "4.6", position: -82 },
        { value: "4.5", position: -80.5 },
        { value: "4.4", position: -79.5 },
        { value: "4.3", position: -78 },
        { value: "4.2", position: -76.6 },
        { value: "4.1", position: -75 },
        { value: "4.0", position: -74 },
        { value: "3.9", position: -72.5 },
        { value: "3.8", position: -71 },
        { value: "3.7", position: -69.5 },
        { value: "3.6", position: -68 },
        { value: "3.5", position: -66.8 },
        { value: "3.4", position: -65.5 },
        { value: "3.3", position: -64 },
        { value: "3.2", position: -62.5 },
        { value: "3.1", position: -61 },
        { value: "3.0", position: -60 },
        { value: "2.9", position: -58.5 },
        { value: "2.8", position: -57 },
        { value: "2.7", position: -55.5 },
        { value: "2.6", position: -54 },
        { value: "2.5", position: -52.7 },
        { value: "2.4", position: -51 },
        { value: "2.3", position: -50 },
        { value: "2.2", position: -48.3 },
        { value: "2.1", position: -47 },
        { value: "2.0", position: -46 },
        { value: "1.9", position: -44.5 },
        { value: "1.8", position: -43 },
        { value: "1.7", position: -41.2 },
        { value: "1.6", position: -40 },
        { value: "1.5", position: -38.7 },
        { value: "1.4", position: -37.5 },
        { value: "1.3", position: -35.5 },
        { value: "1.2", position: -34 },
        { value: "1.1", position: -33 },
        { value: "1.0", position: -32 },
        { value: "0.9", position: -31 },
        { value: "0.8", position: -29.5 },
        { value: "0.7", position: -27.5 },
        { value: "0.6", position: -26 },
        { value: "0.5", position: -24.5 },
        { value: "0.4", position: -23.5 },
        { value: "0.3", position: -22 },
        { value: "0.2", position: -20.5 },
        { value: "0.1", position: -19.5 },
        { value: "0.0", position: -18 },
        
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
            }, 2000);
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
        <div className='lesson-one-point-nine'>

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
                <div className='lesson-one-point-nine-box'>
                    <div className='lesson-one-point-nine-box-innercont'>
                        <div className='lesson-one-point-nine-box-title'>
                            <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                        </div>
                        <div className='lesson-one-point-nine-content'>
                            <p className='lesson-one-point-nine-prompt'>
                                Look at the graduted cylinder and use the up and down arrow keys to position the meniscus at the given measurement. <br />
                                Hint: Make sure to measure from the bottom of the meniscus!
                            </p>
                            <div className="lesson-one-point-nine-cylinder-container">
                                <div className="lesson-one-point-nine-cylinderWaterContainer">
                                    <img src={require('../../assets/question/gradCylinder.png')} className="lesson-one-point-nine-cylinder" alt="Graduated Cylinder" />
                                    <img src={require('../../assets/question/water.png')} className="lesson-one-point-nine-cylinderWater" alt="Water" style={{ top: questions[currentPositionIndex]?.cursorPosition }} />
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
                            <div className='lesson-one-point-nine-question'>
                                <h1>Use the up and down arrow keys to show the measurement of {randomizedQuestions[currentQuestionIndex]?.value} mL.</h1>
                            </div>
                        </div>

                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-one-point-nine-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-one-point-nine-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            <span className={`lesson-one-point-nine-feedback ${feedbackClass}`}>{feedback}</span>
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

export default LessonOnePointNine;
