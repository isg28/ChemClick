import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointEleven.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonOnePointEleven() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson1.11'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "2.95", position: -100, type: 'close to upper' },
        { value: "2.90", position: -99, type: 'close to upper' },
        { value: "2.85", position: -97, type: 'close to upper' },
        { value: "2.80", position: -96, type: 'close to upper' },
        { value: "2.75", position: -94.5, type: 'quarter' },
        { value: "2.70", position: -93, type: 'close to upper' },
        { value: "2.65", position: -92, type: 'close to upper' },
        { value: "2.60", position: -90.3, type: 'close to upper' },
        { value: "2.55", position: -88.8, type: 'close to upper' },
        { value: "2.50", position: -87.7, type: 'half' },
        { value: "2.45", position: -86.5, type: 'close to lower' },
        { value: "2.40", position: -85, type: 'close to lower' },
        { value: "2.35", position: -83.7, type: 'close to lower' },
        { value: "2.30", position: -82, type: 'close to lower' },
        { value: "2.25", position: -80.5, type: 'quarter' },
        { value: "2.20", position: -79.5, type: 'close to lower' },
        { value: "2.15", position: -78, type: 'close to lower' },
        { value: "2.10", position: -76.6, type: 'close to lower' },
        { value: "2.05", position: -75, type: 'close to lower' },
        { value: "2.00", position: -74, type: 'on tick' },
        { value: "1.95", position: -72.5, type: 'close to upper' },
        { value: "1.90", position: -71, type: 'close to upper' },
        { value: "1.85", position: -69.5, type: 'close to upper' },
        { value: "1.80", position: -68, type: 'close to upper' },
        { value: "1.75", position: -66.8, type: 'quarter' },
        { value: "1.70", position: -65.5, type: 'close to upper' },
        { value: "1.65", position: -64, type: 'close to upper' },
        { value: "1.60", position: -62.5, type: 'close to upper' },
        { value: "1.55", position: -61, type: 'close to upper' },
        { value: "1.50", position: -60, type: 'half' },
        { value: "1.45", position: -58.5, type: 'close to lower' },
        { value: "1.40", position: -57, type: 'close to lower' },
        { value: "1.35", position: -55.5, type: 'close to lower' },
        { value: "1.30", position: -54, type: 'close to lower' },
        { value: "1.25", position: -52.7, type: 'quarter' },
        { value: "1.20", position: -51, type: 'close to lower' },
        { value: "1.15", position: -50, type: 'close to lower' },
        { value: "1.10", position: -48.5, type: 'close to lower' },
        { value: "1.05", position: -47, type: 'close to lower' },
        { value: "1.00", position: -46, type: 'on tick' },
        { value: "0.95", position: -44.5, type: 'close to upper' },
        { value: "0.90", position: -43, type: 'close to upper' },
        { value: "0.85", position: -41.2, type: 'close to upper' },
        { value: "0.80", position: -40, type: 'close to upper' },
        { value: "0.75", position: -38.7, type: 'quarter' },
        { value: "0.70", position: -37.5, type: 'close to upper' },
        { value: "0.65", position: -35.5, type: 'close to upper' },
        { value: "0.60", position: -34, type: 'close to upper' },
        { value: "0.55", position: -33, type: 'close to upper' },
        { value: "0.50", position: -32, type: 'half' },
        { value: "0.45", position: -31, type: 'close to lower' },
        { value: "0.40", position: -29.5, type: 'close to lower' },
        { value: "0.35", position: -27.5, type: 'close to lower' },
        { value: "0.30", position: -26, type: 'close to lower' },
        { value: "0.25", position: -24.5, type: 'quarter' },
        { value: "0.20", position: -23.5, type: 'close to lower' },
        { value: "0.15", position: -22, type: 'close to lower' },
        { value: "0.10", position: -20, type: 'close to lower' },
        { value: "0.05", position: -19.5, type: 'close to lower' },
        { value: "0.00", position: -18, type: 'on tick' },
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
    }, [currentQuestionIndex, studentId, lessonId, navigate]);

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

    const validateAnswer = async () => {
        const correctAnswer = parseFloat(randomizedQuestions[currentQuestionIndex].value);
        const userAnswerNum = parseFloat(userAnswer);
        const positionType = randomizedQuestions[currentQuestionIndex].positionType;
    
        const validFormat = /^\d\.\d{2}$/.test(userAnswer);
        if (!validFormat) {
            setFeedback("Be sure to use the correct amount of digits: #.##");
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
            await CorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal,starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            }); 
            return;
        }
    
        if (Math.abs(userAnswerNum - correctAnswer) <= 0.05) {
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
            const [correctTenth, correctHundredth] = correctDecimal.split('');
            const [userTenth, userHundredth] = userDecimal.split('');

            if (userTenth !== correctTenth && userHundredth === correctHundredth) {
                setFeedback("The tenths digit is incorrect. Reassess your answer carefully.");
                setFeedbackClass('incorrect');
                setTimeout(() => {
                    setFeedback('');
                    setFeedbackClass('');
                }, 2500);
                return;
            }

            if (lastDigitAttempts < 1) {
                setFeedback("The last two digits are not quite right. Double-check your answer.");
                setLastDigitAttempts(lastDigitAttempts + 1);
            } else {
                if (positionType === 'closer to lower') {
                    setFeedback('For measurements closer to the lower half, the last two digits should be between .05 and .45.');
                } else if (positionType === 'closer to upper') {
                    setFeedback('For measurements closer to the upper half, the last two digits should be between .55 and .95.');
                } else if (positionType === 'on tick') {
                    setFeedback('For on-tick measurements, the last digits should be .00.');
                } else if (positionType === 'quarter') {
                    setFeedback('For quarter measurements, the last digits should be .25.');
                } else if (positionType === 'half') {
                    setFeedback('For half measurements, the last digits should be .50.');
                }
            }
            setFeedbackClass('incorrect');
            await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            }); 
            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2500);
            return;
        }

        if (userWhole !== correctWhole) {
            setFeedback("The whole number is incorrect. Check the scale and try again.");
            setFeedbackClass('incorrect');
            await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel,
            }); 
            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 2500);
            return;
        }

        setFeedback("The answer is incorrect. Please check your answer and try again.");
        setFeedbackClass('incorrect');
        setLastDigitAttempts(0); 
        setFeedbackClass('incorrect');
        await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
            setCorrectAnswers, setProgress, setMasteryLevel,
        }); 
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
        <div className='lesson-one-point-eleven'>

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
                <div className='lesson-one-point-eleven-box'>
                    <div className='lesson-one-point-eleven-box-innercont'>
                        <div className='lesson-one-point-eleven-box-title'>
                            <h1>Unit One: Uncertainty in Measurement - Hundredths Value</h1>
                        </div>
                        <div className='lesson-one-point-eleven-content'>
                            <p className='lesson-one-point-eleven-prompt'>
                                Look at the graduted cylinder and enter the measurement you think the meniscus is at. <br />
                                Hint: Make sure to measure from the bottom of the meniscus!
                            </p>
                            <div className="lesson-one-point-eleven-cylinder-container">
                                <div className="lesson-one-point-eleven-cylinderWaterContainer">
                                    <img src={require('../../assets/question/gradCylinder2.png')} className="lesson-one-point-eleven-cylinder" alt="Graduated Cylinder" />
                                    <img src={require('../../assets/question/water.png')} className="lesson-one-point-eleven-cylinderWater" alt="Water" style={{ top: randomizedQuestions[currentQuestionIndex]?.cursorPosition }} />
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
                            <div className='lesson-one-point-eleven-question'>
                                <h1>Enter the measurement shown:</h1>
                                <input 
                                    type='text' 
                                    className='lesson-one-point-eleven-input' 
                                    placeholder='Enter the measurement here' 
                                    value={userAnswer}
                                    onChange={handleInputChange} 
                                /> 
                            </div>
                        </div>

                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-one-point-eleven-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-one-point-eleven-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            <span className={`lesson-one-point-eleven-feedback ${feedbackClass}`}>{feedback}</span>
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

export default LessonOnePointEleven;
