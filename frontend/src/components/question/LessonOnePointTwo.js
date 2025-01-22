import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointTwo.css';
import { useNavigate } from 'react-router-dom';
//
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';


function LessonOnePointTwo() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson1.2'; 

    const [goal, setGoal] = useState(); //
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5; // ^
    //const [lessonName, setLessonName] = useState('');
    //const [unit, setUnit] = useState('');

    const handlequestion = () => {
        navigate('/dashboard');
    };

    useEffect(() => {
        if (!studentId) { //
          console.error('Student ID not found');
          navigate('/login');
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
        // eslint-disable-line react-hooks/exhaustive-deps
    }, [studentId, lessonId, navigate]); // ^

    // Cursor positions 
    // 0: 0%, 0.5: 8.27%
    // 1: 16.54%, 1.5: 24.895%
    // 2: 33.25%, 2.5: 41.6%
    // 3: 49.95%, 3.5: 58.36%
    // 4: 66.77%, 4.5: 75.11%
    // 5: 83.45%, 5.5: 91.675%
    // 6: 99.90% 

    const positions = [
        { value: "0", position: 0, type: 'on tick' },
        { value: "0.1", position: 1.65, type: 'closer to lower' },
        { value: "0.2", position: 3.30, type: 'closer to lower' },
        { value: "0.3", position: 4.95, type: 'closer to lower' },
        { value: "0.4", position: 6.60, type: 'closer to lower' },
        { value: "0.5", position: 8.27, type: 'centered' },
        { value: "0.6", position: 9.92, type: 'closer to upper' },
        { value: "0.7", position: 11.57, type: 'closer to upper' },
        { value: "0.8", position: 13.22, type: 'closer to upper' },
        { value: "0.9", position: 14.87, type: 'closer to upper' },
        { value: "1", position: 16.54, type: 'on tick' },
        { value: "1.1", position: 18.19, type: 'closer to lower' },
        { value: "1.2", position: 19.84, type: 'closer to lower' },
        { value: "1.3", position: 21.49, type: 'closer to lower' },
        { value: "1.4", position: 23.14, type: 'closer to lower' },
        { value: "1.5", position: 24.895, type: 'centered' },
        { value: "1.6", position: 26.54, type: 'closer to upper' },
        { value: "1.7", position: 28.19, type: 'closer to upper' },
        { value: "1.8", position: 29.84, type: 'closer to upper' },
        { value: "1.9", position: 31.49, type: 'closer to upper' },
        { value: "2", position: 33.25, type: 'on tick' },
        { value: "2.1", position: 34.90, type: 'closer to lower' },
        { value: "2.2", position: 36.55, type: 'closer to lower' },
        { value: "2.3", position: 38.20, type: 'closer to lower' },
        { value: "2.4", position: 39.85, type: 'closer to lower' },
        { value: "2.5", position: 41.6, type: 'centered' }, 
        { value: "2.6", position: 43.25, type: 'closer to upper' },
        { value: "2.7", position: 44.90, type: 'closer to upper' },
        { value: "2.8", position: 46.55, type: 'closer to upper' },
        { value: "2.9", position: 48.20, type: 'closer to upper' },
        { value: "3", position: 49.95, type: 'on tick' },
        { value: "3.1", position: 51.60, type: 'closer to lower' },
        { value: "3.2", position: 53.25, type: 'closer to lower' },
        { value: "3.3", position: 54.90, type: 'closer to lower' },
        { value: "3.4", position: 56.55, type: 'closer to lower' },
        { value: "3.5", position: 58.36, type: 'centered' },
        { value: "3.6", position: 60.01, type: 'closer to upper' },
        { value: "3.7", position: 61.66, type: 'closer to upper' },
        { value: "3.8", position: 63.31, type: 'closer to upper' },
        { value: "3.9", position: 64.96, type: 'closer to upper' },
        { value: "4", position: 66.77, type: 'on tick' },
        { value: "4.1", position: 68.42, type: 'closer to lower' },
        { value: "4.2", position: 70.07, type: 'closer to lower' },
        { value: "4.3", position: 71.72, type: 'closer to lower' },
        { value: "4.4", position: 73.37, type: 'closer to lower' },
        { value: "4.5", position: 75.11, type: 'centered' },
        { value: "4.6", position: 76.76, type: 'closer to upper' },
        { value: "4.7", position: 78.41, type: 'closer to upper' },
        { value: "4.8", position: 80.06, type: 'closer to upper' },
        { value: "4.9", position: 81.71, type: 'closer to upper' },
        { value: "5", position: 83.45, type: 'on tick' },
        { value: "5.1", position: 85.10, type: 'closer to lower' },
        { value: "5.2", position: 86.75, type: 'closer to lower' },
        { value: "5.3", position: 88.40, type: 'closer to lower' },
        { value: "5.4", position: 90.05, type: 'closer to lower' },
        { value: "5.5", position: 91.675, type: 'centered' },
        { value: "5.6", position: 93.33, type: 'closer to upper' },
        { value: "5.7", position: 94.98, type: 'closer to upper' },
        { value: "5.8", position: 96.63, type: 'closer to upper' },
        { value: "5.9", position: 98.28, type: 'closer to upper' },
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
    
        if (Math.abs(userAnswerNum - correctAnswer) <= 0.15) {
            setFeedback("Your answer is valid; however, most chemists agree there is a better answer. Please try again.");
            setFeedbackClass('incorrect');
            setLastDigitAttempts(0); 
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
            await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel,
            });
            return;
        }
        setFeedback("The answer is incorrect. Please check your answer and try again.");
        setFeedbackClass('incorrect');
        await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned,
            setCorrectAnswers, setProgress, setMasteryLevel,
        });
        setLastDigitAttempts(0); 
    };

    const handleSubmitAnswer = async () => {
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
        <div className='lesson-one-point-two'>
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
                <div className='lesson-one-point-two-box'>
                <div className='lesson-one-point-one-box-innercont'>
                    <div className='lesson-one-point-two-box-title'>
                        <h1>Unit One: Uncertainty in Measurement - Tenths Value</h1>
                        {/*    <h1>{`${lessonName}`}</h1> {/* ASK IF PREFERED OR NOT  */}

                    </div>
                    <div className='lesson-one-point-two-content'>
                        <p className='lesson-one-point-two-prompt'>
                            Look at the cursor's position on the scale and type the measurement you think it shows.
                        </p>
                        <div className="lesson-one-point-two-ruler-container">
                            <img src={require('../../assets/question/ruler.png')} className="lesson-one-point-two-ruler" alt="Ruler" />
                            <div className="lesson-one-point-two-cursor" style={{ left: randomizedQuestions[currentQuestionIndex]?.cursorPosition }}></div>
                        </div>

                        <hr className="separator" />
                        <div className='lesson-one-point-two-question'>
                            <h1>Enter the measurement shown by the cursor:</h1>
                            <input 
                                type='text' 
                                className='lesson-one-point-two-input' 
                                placeholder='Enter the measurement here' 
                                value={userAnswer}
                                onChange={handleInputChange} 
                            /> 
                        </div>
                    </div>

                    <div className="submit-feedback-container">
                        {!isAnswerCorrect && (
                            <button className='lesson-one-point-two-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                        )}
                        {isAnswerCorrect && (
                            <button className='lesson-one-point-two-next' onClick={handleNextQuestion}>Next Question</button>
                        )}
                        <span className={`lesson-one-point-two-feedback ${feedbackClass}`}>{feedback}</span>
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

export default LessonOnePointTwo;
