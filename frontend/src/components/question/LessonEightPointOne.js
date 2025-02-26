import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonEightPointOne.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from './LessonUtils';

function LessonEightPointOne() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson8.1'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    
    const displayMedals = starsEarned >= 5;

    const [userInput, setUserInput] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const ions = [
        { symbol: "H¹⁺", name: "hydrogen ion", input: "H1+" },
        { symbol: "Li¹⁺", name: "lithium ion", input: "Li1+" },
        { symbol: "Na¹⁺", name: "sodium ion", input: "Na1+" },
        { symbol: "K¹⁺", name: "potassium ion", input: "K1+" },
        { symbol: "Rb¹⁺", name: "rubidium ion", input: "Rb1+" },
        { symbol: "Cs¹⁺", name: "cesium ion", input: "Cs1+" },
        { symbol: "Ag¹⁺", name: "silver ion", input: "Ag1+" },
    ];

    const questions = ions.flatMap(ion => [   
        {
            type: 'symbol', // Prompt for the symbol given the name
            text: 'What is the symbol for:',
            prompt: ion.name,
            answer: ion.input,
        },
        {
            type: 'name', // Prompt for the name given the symbol
            text: 'What is the name for:',
            prompt: ion.symbol,
            answer: ion.name,
        }
    ]);

    const shuffleQuestions = () => {
        let shuffled = [...questions];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
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
        if (questions.length > 0){ 
            setRandomizedQuestions(shuffleQuestions());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex, userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    const validateAnswer = async () => {
        const currentQuestion = randomizedQuestions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;
    
        if (userInput.trim() === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            return;
        } else {
            if(currentQuestion.type === 'name'){
                if(userInput.trim().toLowerCase() === correctAnswer){
                    setFeedback("Use lowercase!");
                } else {
                    setFeedback("Not quite right, remember cations end with an 'ion' in the name!");
                }
            } else {    // then it's a symbol question
                setFeedback("Not quite right, remember cations are positively charged!");
            }
            setFeedbackClass('incorrect');
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });

            setTimeout(() => {
                setFeedback('');
                setFeedbackClass('');
            }, 3000);
            return;
        }
    };


    const handleSubmitAnswer = () => {
        if(isAnswerCorrect){    // prevents user from pressing enter multiple times
            return;
        }
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (randomizedQuestions.length > 0 && currentQuestionIndex < randomizedQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentQuestionIndex(0); // Reset to the first question
        }
        setFeedback('');
        setUserInput('');
        setFeedbackClass('hidden');
        setIsAnswerCorrect(false);
    };

    return (
        <div className='lesson-eight-point-one'>

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
                <div className='lesson-eight-point-one-box'>
                    <div className='lesson-eight-point-one-box-innercont'>
                        <div className='lesson-eight-point-one-box-title'>
                            <h1>Unit Eight: Positive Monatomic Ions</h1>
                        </div>
                        <div className='lesson-eight-point-one-content'>
                            <p className='lesson-eight-point-one-prompt'>
                                Given the {randomizedQuestions[currentQuestionIndex]?.type === 'symbol'
                                            ? 'name of a monatomic ion, provide its symbol.'
                                            : 'symbol of a monatomic ion, provide its name.'}
                                <br /> Example input: {randomizedQuestions[currentQuestionIndex]?.type === 'symbol'
                                            ? 'Ba²⁺'
                                            : 'hydrogen ion'}
                            </p>
                            <div className="lesson-eight-point-one-container">
                                {randomizedQuestions.length > 0 && randomizedQuestions[currentQuestionIndex] ? (
                                    <p>{randomizedQuestions[currentQuestionIndex].text}</p>
                                ) : (
                                    <p>Loading question...</p>
                                )}
                                <div className="lesson-eight-point-one-question-box">
                                {randomizedQuestions.length > 0 && randomizedQuestions[currentQuestionIndex] ? (
                                    <p>{randomizedQuestions[currentQuestionIndex].prompt}</p>
                                ) : (
                                    <p>...</p>
                                )}
                                </div>
                            </div>

                            <hr className="separator" />
                            <div className='lesson-eight-point-one-question'>
                                <input
                                    type="text"
                                    className = "lesson-eight-point-one-input"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            if(userInput.trim() !== ''){    // prevents user from entering an empty input
                                                handleSubmitAnswer();
                                            }
                                        }
                                    }}
                                    placeholder={
                                        randomizedQuestions[currentQuestionIndex]?.type === 'symbol'
                                            ? 'Enter the symbol'
                                            : 'Enter the name'
                                    }
                                />
                            
                                {!isAnswerCorrect && (
                                    <button className='lesson-eight-point-one-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
                                )}
                                {isAnswerCorrect && (
                                    <button className='lesson-eight-point-one-next' onClick={handleNextQuestion}>Next Question</button>
                                )}
                                
                            </div>
                            <div className="submit-feedback-container">
                                <span className={`lesson-eight-point-one-feedback ${feedbackClass}`}>{feedback}</span>
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

export default LessonEightPointOne;
