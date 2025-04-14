import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointEight.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonOnePointEight() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson1.8'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    
    const displayMedals = starsEarned >= 5;
    

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "5.9", position: 1, type: 'close to upper' },
        { value: "5.8", position: 2, type: 'close to upper' },
        { value: "5.7", position: 3.5, type: 'close to upper' },
        { value: "5.6", position: 5, type: 'close to upper' },
        { value: "5.5", position: 6.5, type: 'centered' },
        { value: "5.4", position: 8, type: 'close to lower' },
        { value: "5.3", position: 9, type: 'close to lower' },
        { value: "5.2", position: 10.5, type: 'close to lower' },
        { value: "5.1", position: 12, type: 'close to lower' },
        { value: "5.0", position: 13, type: 'on tick' },
        { value: "4.9", position: 15, type: 'close to upper' },
        { value: "4.8", position: 16, type: 'close to upper' },
        { value: "4.7", position: 17.5, type: 'close to upper' },
        { value: "4.6", position: 19, type: 'close to upper' },
        { value: "4.5", position: 20.5, type: 'centered' },
        { value: "4.4", position: 22, type: 'close to lower' },
        { value: "4.3", position: 23, type: 'close to lower' },
        { value: "4.2", position: 24.5, type: 'close to lower' },
        { value: "4.1", position: 25.7, type: 'close to lower' },
        { value: "4.0", position: 27, type: 'on tick' },
        { value: "3.9", position: 28.5, type: 'close to upper' },
        { value: "3.8", position: 29.5, type: 'close to upper' },
        { value: "3.7", position: 31.5, type: 'close to upper' },
        { value: "3.6", position: 33, type: 'close to upper' },
        { value: "3.5", position: 34, type: 'centered' },
        { value: "3.4", position: 35.5, type: 'close to lower' },
        { value: "3.3", position: 37, type: 'close to lower' },
        { value: "3.2", position: 38.5, type: 'close to lower' },
        { value: "3.1", position: 39.5, type: 'close to lower' },
        { value: "3.0", position: 41, type: 'on tick' },
        { value: "2.9", position: 42.5, type: 'close to upper' },
        { value: "2.8", position: 44, type: 'close to upper' },
        { value: "2.7", position: 45.5, type: 'close to upper' },
        { value: "2.6", position: 46.5, type: 'close to upper' },
        { value: "2.5", position: 48, type: 'centered' },
        { value: "2.4", position: 49.5, type: 'close to lower' },
        { value: "2.3", position: 50.5, type: 'close to lower' },
        { value: "2.2", position: 52, type: 'close to lower' },
        { value: "2.1", position: 53.5, type: 'close to lower' },
        { value: "2.0", position: 54.5, type: 'on tick' },
        { value: "1.9", position: 56, type: 'close to upper' },
        { value: "1.8", position: 57.5, type: 'close to upper' },
        { value: "1.7", position: 59.5, type: 'close to upper' },
        { value: "1.6", position: 60.5, type: 'close to upper' },
        { value: "1.5", position: 62, type: 'centered' },
        { value: "1.4", position: 63.5, type: 'close to lower' },
        { value: "1.3", position: 64.5, type: 'close to lower' },
        { value: "1.2", position: 66, type: 'close to lower' },
        { value: "1.1", position: 67.5, type: 'close to lower' },
        { value: "1.0", position: 68.7, type: 'on tick' },
        { value: "0.9", position: 70.1, type: 'close to upper' },
        { value: "0.8", position: 71.5, type: 'close to upper' },
        { value: "0.7", position: 73, type: 'close to upper' },
        { value: "0.6", position: 74.5, type: 'close to upper' },
        { value: "0.5", position: 76, type: 'centered' },
        { value: "0.4", position: 77.5, type: 'close to lower' },
        { value: "0.3", position: 79, type: 'close to lower' },
        { value: "0.2", position: 80, type: 'close to lower' },
        { value: "0.1", position: 81.5, type: 'close to lower' },
        { value: "0.0", position: 82.5, type: 'on tick' },
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
    
        const filledWaterLeft = 30; 
        const filledWaterWidth = 42; 
    
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
        if (!userId) { 
            console.error('ID not found');
            navigate('/login');
            return;
        }
        
        const initializeData = async () => {
            await fetchLessonData(lessonId, setGoal);
            await fetchLessonProgress(userId, lessonId, isTeacher, {
                setCorrectAnswers,
                setIncorrectAnswers,
                setProgress,
                setMasteryLevel,
                setGoal,
                setTotalAttempts,
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
    }, [currentQuestionIndex, userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]); 

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
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
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
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
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
        await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
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
                                    placeholder='ex. 4.8' 
                                    value={userAnswer}
                                    onChange={handleInputChange} 
                                /> 
                                <span className={`lesson-one-point-eight-feedback ${feedbackClass}`}>{feedback}</span>
                            </div>
                        </div>

                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-one-point-eight-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-one-point-eight-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            
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
                    </div>
                    {/* Next Lesson button positioned below the Goals box */}
                    <div className="next-lesson-button-container" style={{ marginTop: '20px' }}>
                        <button 
                            className="next-lesson-button" 
                            onClick={() => navigate('/lessononepointnine')}
                            style={{ 
                                padding: '20px 40px', 
                                fontSize: '20px', 
                                border: '5px solid #006400', 
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        >
                            Next Lesson
                        </button>
                    </div>
                </div>
            </div>
            {showCompletionModal && (
                <div className="completion-modal">
                    <div className="completion-modal-content">
                        <h2>🎉 Congratulations! 🎉</h2>
                        <p>You've finished the assignment! Keep practicing to strengthen your skills.</p>
                        <button onClick={() => setShowCompletionModal(false)}>Continue</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LessonOnePointEight;
