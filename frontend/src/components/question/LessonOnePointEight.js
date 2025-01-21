import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointEight.css';
import { useNavigate } from 'react-router-dom';

function LessonOnePointEight() {
    const navigate = useNavigate();

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "5.9", position: -100, type: 'close to upper' },
        { value: "5.8", position: -99, type: 'close to upper' },
        { value: "5.7", position: -97, type: 'close to upper' },
        { value: "5.6", position: -96, type: 'close to upper' },
        { value: "5.5", position: -94.5, type: 'centered' },
        { value: "5.4", position: -93, type: 'close to lower' },
        { value: "5.3", position: -92, type: 'close to lower' },
        { value: "5.2", position: -90.3, type: 'close to lower' },
        { value: "5.1", position: -88.8, type: 'close to lower' },
        { value: "5.0", position: -87.7, type: 'on tick' },
        { value: "4.9", position: -86.5, type: 'close to upper' },
        { value: "4.8", position: -85, type: 'close to upper' },
        { value: "4.7", position: -83.7, type: 'close to upper' },
        { value: "4.6", position: -82, type: 'close to upper' },
        { value: "4.5", position: -80.5, type: 'centered' },
        { value: "4.4", position: -79.5, type: 'close to lower' },
        { value: "4.3", position: -78, type: 'close to lower' },
        { value: "4.2", position: -76.6, type: 'close to lower' },
        { value: "4.1", position: -75, type: 'close to lower' },
        { value: "4.0", position: -74, type: 'on tick' },
        { value: "3.9", position: -72.5, type: 'close to upper' },
        { value: "3.8", position: -71, type: 'close to upper' },
        { value: "3.7", position: -69.5, type: 'close to upper' },
        { value: "3.6", position: -68, type: 'close to upper' },
        { value: "3.5", position: -66.8, type: 'centered' },
        { value: "3.4", position: -65.5, type: 'close to lower' },
        { value: "3.3", position: -64, type: 'close to lower' },
        { value: "3.2", position: -62.5, type: 'close to lower' },
        { value: "3.1", position: -61, type: 'close to lower' },
        { value: "3.0", position: -60, type: 'on tick' },
        { value: "2.9", position: -58.5, type: 'close to upper' },
        { value: "2.8", position: -57, type: 'close to upper' },
        { value: "2.7", position: -55.5, type: 'close to upper' },
        { value: "2.6", position: -54, type: 'close to upper' },
        { value: "2.5", position: -52.7, type: 'centered' },
        { value: "2.4", position: -51, type: 'close to lower' },
        { value: "2.3", position: -50, type: 'close to lower' },
        { value: "2.2", position: -48.5, type: 'close to lower' },
        { value: "2.1", position: -47, type: 'close to lower' },
        { value: "2.0", position: -46, type: 'on tick' },
        { value: "1.9", position: -44.5, type: 'close to upper' },
        { value: "1.8", position: -43, type: 'close to upper' },
        { value: "1.7", position: -41.2, type: 'close to upper' },
        { value: "1.6", position: -40, type: 'close to upper' },
        { value: "1.5", position: -38.7, type: 'centered' },
        { value: "1.4", position: -37.5, type: 'close to lower' },
        { value: "1.3", position: -35.5, type: 'close to lower' },
        { value: "1.2", position: -34, type: 'close to lower' },
        { value: "1.1", position: -33, type: 'close to lower' },
        { value: "1.0", position: -32, type: 'on tick' },
        { value: "0.9", position: -31, type: 'close to upper' },
        { value: "0.8", position: -29.5, type: 'close to upper' },
        { value: "0.7", position: -27.5, type: 'close to upper' },
        { value: "0.6", position: -26, type: 'close to upper' },
        { value: "0.5", position: -24.5, type: 'centered' },
        { value: "0.4", position: -23.5, type: 'close to lower' },
        { value: "0.3", position: -22, type: 'close to lower' },
        { value: "0.2", position: -20, type: 'close to lower' },
        { value: "0.1", position: -19.5, type: 'close to lower' },
        { value: "0.0", position: -18, type: 'on tick' },
    ];

    const questions = positions.map(pos => ({
        value: pos.value,
        positionType: pos.type,
        cursorPosition: `${pos.position}%`
    }));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [lastDigitAttempts, setLastDigitAttempts] = useState(0); 
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

    useEffect(() => {
        const handleScroll = (event) => {
            const scrollDirection = event.deltaY; // `deltaY` determines the scroll direction
            if (scrollDirection < 0) {
                // Scrolling up
                addBubble(true);
            } else if (scrollDirection > 0) {
                // Scrolling down
                addBubble(false);
            }
        };
    
        window.addEventListener('wheel', handleScroll); // Use 'wheel' for precise scroll direction
    
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);
    

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
    };

    const validateAnswer = () => {
        const correctAnswer = parseFloat(randomizedQuestions[currentQuestionIndex].value);
        const userAnswerNum = parseFloat(userAnswer);
        const positionType = randomizedQuestions[currentQuestionIndex].positionType;
    
        const validFormat = /^\d\.\d$/.test(userAnswer);
        if (!validFormat) {
            setFeedback("Be sure to use the correct amount of digits: #.#");
            setFeedbackClass('incorrect');
            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2000);
            return;
        }
    
        const [correctWhole, correctDecimal] = randomizedQuestions[currentQuestionIndex].value.split('.');
        const [userWhole, userDecimal] = userAnswer.split('.');
    
        if (userAnswerNum === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            setLastDigitAttempts(0); 
            return;
        }
    
        if (Math.abs(userAnswerNum - correctAnswer) <= 0.15) {
            setFeedback("Your answer is valid; however, most chemists agree there is a better answer. Please try again.");
            setFeedbackClass('incorrect');
            setLastDigitAttempts(0); 
            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2500);
            return;
        }
    
        if (userWhole === correctWhole && userDecimal !== correctDecimal) {
            if (lastDigitAttempts < 1) {
                setFeedback("Last digit is not quite right.");
                setLastDigitAttempts(lastDigitAttempts + 1);
            } else {
                if (positionType === 'closer to lower') {
                    setFeedback('For measurements closer to the lower tick, the last digit should be between 1 and 4.');
                } else if (positionType === 'closer to upper') {
                    setFeedback('For measurements closer to the upper tick, the last digit should be between 6 and 9.');
                } else if (positionType === 'on tick') {
                    setFeedback('For on-tick measurements, the last digit should be 0.');
                }
            }
            setFeedbackClass('incorrect');
            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2000);
            return;
        }
        setFeedback("The answer is incorrect. Please check your answer and try again.");
        setFeedbackClass('incorrect');
        setLastDigitAttempts(0); 
        setFeedbackClass('incorrect');
        setTimeout(() => {
            setFeedback('');
            setFeedbackClass('');
        }, 2000);
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');
            setFeedback('');
            setFeedbackClass('hidden');
            setIsAnswerCorrect(false);
        }
    };

    return (
        <div className='lesson-one-point-eight'>

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
                <div className='lesson-one-point-eight-box'>
                    <div className='lesson-one-point-eight-box-innercont'>
                        <div className='lesson-one-point-eight-box-title'>
                            <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                        </div>
                        <div className='lesson-one-point-eight-content'>
                            <p className='lesson-one-point-eight-prompt'>
                                Look at the graduted cylinder and enter the measurement you think the meniscus is at. <br />
                                Hint: Make sure to measure from the bottom of the meniscus!
                            </p>
                            <div className="lesson-one-point-eight-cylinder-container">
                                <div className="lesson-one-point-eight-cylinderWaterContainer">
                                    <img src={require('../../assets/question/gradCylinder.png')} className="lesson-one-point-eight-cylinder" alt="Graduated Cylinder" />
                                    <img src={require('../../assets/question/water.png')} className="lesson-one-point-eight-cylinderWater" alt="Water" style={{ top: randomizedQuestions[currentQuestionIndex]?.cursorPosition }} />
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
                            <div className='lesson-one-point-eight-question'>
                                <h1>Enter the measurement shown:</h1>
                                <input 
                                    type='text' 
                                    className='lesson-one-point-eight-input' 
                                    placeholder='Enter the measurement here' 
                                    value={userAnswer}
                                    onChange={handleInputChange} 
                                /> 
                            </div>
                        </div>

                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-one-point-eight-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-one-point-eight-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            <span className={`lesson-one-point-eight-feedback ${feedbackClass}`}>{feedback}</span>
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

export default LessonOnePointEight;
