import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointTwelve.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonOnePointTwelve() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson1.12'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    const displayMedals = starsEarned >= 5;

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const positions = [
        { value: "2.95", position: 1 },
        { value: "2.90", position: 2 },
        { value: "2.85", position: 3.5 },
        { value: "2.80", position: 5 },
        { value: "2.75", position: 6.5 },
        { value: "2.70", position: 8 },
        { value: "2.65", position: 9 },
        { value: "2.60", position: 10.5 },
        { value: "2.55", position: 12 },
        { value: "2.50", position: 13 },
        { value: "2.45", position: 15 },
        { value: "2.40", position: 16 },
        { value: "2.35", position: 17.5 },
        { value: "2.30", position: 19 },
        { value: "2.25", position: 20.5 },
        { value: "2.20", position: 22 },
        { value: "2.15", position: 23 },
        { value: "2.10", position: 24.5 },
        { value: "2.05", position: 25.7 },
        { value: "2.00", position: 27 },
        { value: "1.95", position: 28.5 },
        { value: "1.90", position: 29.5 },
        { value: "1.85", position: 31.5 },
        { value: "1.80", position: 33 },
        { value: "1.75", position: 34 },
        { value: "1.70", position: 35.5 },
        { value: "1.65", position: 37 },
        { value: "1.60", position: 38.5 },
        { value: "1.55", position: 39.5 },
        { value: "1.50", position: 41 },
        { value: "1.45", position: 42.5 },
        { value: "1.40", position: 44 },
        { value: "1.35", position: 45.5 },
        { value: "1.30", position: 46.5 },
        { value: "1.25", position: 48 },
        { value: "1.20", position: 49.5 },
        { value: "1.15", position: 50.5 },
        { value: "1.10", position: 52 },
        { value: "1.05", position: 53.5 },
        { value: "1.00", position: 54.5 },
        { value: "0.95", position: 56 },
        { value: "0.90", position: 57.5 },
        { value: "0.85", position: 59.5 },
        { value: "0.80", position: 60.5 },
        { value: "0.75", position: 62 },
        { value: "0.70", position: 63.5 },
        { value: "0.65", position: 64.5 },
        { value: "0.60", position: 66 },
        { value: "0.55", position: 67.5 },
        { value: "0.50", position: 68.7 },
        { value: "0.45", position: 70.1 },
        { value: "0.40", position: 71.5 },
        { value: "0.35", position: 73 },
        { value: "0.30", position: 74.5 },
        { value: "0.25", position: 76 },
        { value: "0.20", position: 77.5 },
        { value: "0.15", position: 79 },
        { value: "0.10", position: 80 },
        { value: "0.05", position: 81.5 },
        { value: "0.00", position: 82.5 },
        
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
        if (!studentId) {
            console.error('Student ID not found');
            navigate('/login'); // Redirect to login if studentId is missing
            return;
        }
        
        const initializeData = async () => {
            await fetchLessonData(lessonId, setGoal);
            await fetchLessonProgress(studentId, lessonId, {
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
    }, [currentQuestionIndex, studentId, lessonId, navigate]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

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

    const validateAnswer = async () => {
        const correctAnswer = parseFloat(randomizedQuestions[currentQuestionIndex].value);
        const userAnswer = parseFloat(questions[currentPositionIndex].value);
    
        if (userAnswer === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            await CorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            return;
        } else {
            setFeedback("Not quite right. Check your answer and try again!");
            setFeedbackClass('incorrect');
            await IncorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });

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
        <div className='lesson-one-point-twelve'>

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
                <div className='lesson-one-point-twelve-box'>
                    <div className='lesson-one-point-twelve-box-innercont'>
                        <div className='lesson-one-point-twelve-box-title'>
                            <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                        </div>
                        <div className='lesson-one-point-twelve-content'>
                            <p className='lesson-one-point-twelve-prompt'>
                                Look at the graduted cylinder and use the up and down arrow keys to position the meniscus at the given measurement. <br />
                                Hint: Make sure to measure from the bottom of the meniscus!
                            </p>
                            <div className="lesson-one-point-twelve-cylinder-container">
                                <div className="lesson-one-point-twelve-cylinderWaterContainer">
                                    <img src={require('../../assets/question/gradCylinder2.png')} className="lesson-one-point-twelve-cylinder" alt="Graduated Cylinder" />
                                    <img src={require('../../assets/question/water.png')} className="lesson-one-point-twelve-cylinderWater" alt="Water" style={{ top: questions[currentPositionIndex]?.cursorPosition }} />
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
                                <div className='lesson-one-point-twelve-question'>
                                    <h1>Use the up and down arrow keys to show the measurement of {randomizedQuestions[currentQuestionIndex]?.value} mL.</h1>
                                </div>
                            </div>

                        <div className="submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-one-point-twelve-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-one-point-twelve-next' onClick={handleNextQuestion}>Next Question</button>
                            )}
                            <span className={`lesson-one-point-twelve-feedback ${feedbackClass}`}>{feedback}</span>
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

export default LessonOnePointTwelve;
