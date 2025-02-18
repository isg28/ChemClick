import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonEightPointOne.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from './LessonUtils';

function LessonEightPointFour() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson8.4'; 
        
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
        { symbol: "H+", name: "Hydrogen Ion", category: "positive" },
        { symbol: "Li+", name: "Lithium Ion", category: "positive" },
        { symbol: "Na+", name: "Sodium Ion", category: "positive" },
        { symbol: "K+", name: "Potassium Ion", category: "positive" },
        { symbol: "Rb+", name: "Rubidium Ion", category: "positive" },
        { symbol: "Cs+", name: "Cesuyn Ion", category: "positive" },
        { symbol: "Ag+", name: "Silver Ion", category: "positive" },
        { symbol: "Be2+", name: "Beryllium Ion", category: "positive2" },
        { symbol: "Mg2+", name: "Magnesium Ion", category: "positive2" },
        { symbol: "Sr2+", name: "Strontium Ion", category: "positive2" },
        { symbol: "Ba2+", name: "Barium Ion", category: "positive2" },
        { symbol: "Ra2+", name: "Radium Ion", category: "positive2" },
        { symbol: "Zn2+", name: "Zinc Ion", category: "positive2" },
        { symbol: "Ca2+", name: "Calcium Ion", category: "positive2" },
        { symbol: "Al3+", name: "Aluminum Ion", category: "positive3" },
        { symbol: "H-", name: "Hyrdride", category: "negative" },
        { symbol: "F-", name: "Fluoride", category: "negative" },
        { symbol: "Cl-", name: "Chloride", category: "negative" },
        { symbol: "Br-", name: "Bromide", category: "negative" },
        { symbol: "I-", name: "Iodide", category: "negative" },
        { symbol: "O2-", name: "Oxide", category: "negative2" },
        { symbol: "S2-", name: "Sulfide", category: "negative2" },
        { symbol: "Se2-", name: "Selenide", category: "negative2" },
        { symbol: "Te2-", name: "Telluride", category: "negative2" },
        { symbol: "N3-", name: "Nitride", category: "negative3" },
        { symbol: "P3-", name: "Phosphide", category: "negative3" },
        { symbol: "As3-", name: "Arsenide", category: "negative3" },
    ];

    const questions = ions.flatMap(ion => [   
        {
            type: 'symbol', // Prompt for the symbol given the name
            prompt: `What is the symbol for a ${ion.name}?`,
            answer: ion.symbol,
            category: ion.category,
        },
        {
            type: 'name', // Prompt for the name given the symbol
            prompt: `What is the name of the ion with the symbol ${ion.symbol}?`,
            answer: ion.name,
            category: ion.category,
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
        if (questions.length > 0){ 
            setRandomizedQuestions(shuffleQuestions());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex, studentId, lessonId, navigate]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    const validateAnswer = async () => {
        const currentQuestion = randomizedQuestions[currentQuestionIndex];
        const correctAnswer = currentQuestion.answer;
    
        if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            await CorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            return;
        } else {
            if(currentQuestion.type === 'name'){
                if(currentQuestion.category === 'positive'){
                    setFeedback("Not quite right, remember cations end with an 'Ion' in the name!");
                } else {    // then it's negative
                    setFeedback("Not quite right, remember negatively charged ions end in -ide!");
                }
            } else {    // then it's a symbol question
                if(currentQuestion.category === 'positive'){
                    setFeedback("Not quite right, remember cations are positively charged!");
                } else if (currentQuestion.category === 'positive2' || currentQuestion.category === 'positive3'){
                    setFeedback("Make sure to check the positive charge!");
                } else if (currentQuestion.category === 'negative') {
                    setFeedback("Not quite right, remember monoatmomic ions ending in -ide are negatively charged!");
                } else {    // then it's a 2- or 3- anion
                    setFeedback("Make sure to check the negative charge!");
                }
            }
            setFeedbackClass('incorrect');
            await IncorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
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
                            <h1>Unit Eight: Mixed Practice (Positive & Negative)</h1>
                        </div>
                        <div className='lesson-eight-point-one-content'>
                            <p className='lesson-eight-point-one-prompt'>
                                Given the {randomizedQuestions[currentQuestionIndex]?.type === 'symbol'
                                            ? 'name of a monatomic ion, provide its symbol.'
                                            : 'symbol of a monatomic ion, provide its name.'}
                                <br /> Example input: {randomizedQuestions[currentQuestionIndex]?.type === 'symbol'
                                            ? 'Ba2+'
                                            : 'Hydrogen Ion'}
                            </p>
                            <div className="lesson-eight-point-one-container">
                                {randomizedQuestions.length > 0 && randomizedQuestions[currentQuestionIndex] ? (
                                    <p>{randomizedQuestions[currentQuestionIndex].prompt}</p>
                                ) : (
                                    <p>Loading question...</p>
                                )}
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

export default LessonEightPointFour;
