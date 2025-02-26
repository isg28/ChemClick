import React, { useState, useEffect, useMemo} from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonTenPointOne.css';
import { useNavigate } from 'react-router-dom';
//
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonTenPointOne(){
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;      
    const lessonId = 'lesson10.1'; 
    
    const [goal, setGoal] = useState(); //
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5; // ^

    const elementsData = [
        { element: 'Fluorine', monatomic: 'Fluoride ion', polyatomic: 'Fluorate ion', symbol: 'F' },
        { element: 'Chlorine', monatomic: 'Chloride ion', polyatomic: 'Chlorate ion', symbol: 'Cl' },
        { element: 'Bromine', monatomic: 'Bromide ion', polyatomic: 'Bromate ion', symbol: 'Br' },
        { element: 'Iodine', monatomic: 'Iodide ion', polyatomic: 'Iodate ion', symbol: 'I' }
    ];

    const allSymbols = useMemo(() => ["F", "Cl", "Br", "I", "F⁻", "Cl⁻", "Br⁻", "I⁻", "FO₃⁻", "ClO₃⁻", "BrO₃⁻", "IO₃⁻"], []);
    
    const symbolMapping = {
        "Fluoride ion": "F⁻",
        "Chloride ion": "Cl⁻",
        "Bromide ion": "Br⁻",
        "Iodide ion": "I⁻",
        "Fluorate ion": "FO₃⁻",
        "Chlorate ion": "ClO₃⁻",
        "Bromate ion": "BrO₃⁻",
        "Iodate ion": "IO₃⁻"
    };

    const [answers, setAnswers] = useState({}); 
    const [feedback, setFeedback] = useState("");
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [feedbackClass, setFeedbackClass] = useState('');
    const [symbols, setSymbols] = useState([]);

    const handlequestion = () => {
        navigate('/dashboard');
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
        setSymbols([...allSymbols].sort(() => Math.random() - 0.5));

        // eslint-disable-line react-hooks/exhaustive-deps
    }, [studentId, lessonId, navigate, allSymbols, isTeacher]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    const handleDragStart = (e, symbol) => {
        e.dataTransfer.setData("symbol", symbol);
    };

    const handleDrop = (e, category, index) => {
        e.preventDefault();
        const droppedSymbol = e.dataTransfer.getData("symbol");
    
        setAnswers(prev => ({
            ...prev,
            [`${category}-${index}`]: droppedSymbol
        }));
    
        e.target.classList.add("filled");
    };
    
    const handleRemoveSymbol = (category, index) => {
        setAnswers(prev => {
            const updatedAnswers = { ...prev };
            delete updatedAnswers[`${category}-${index}`]; 
            return updatedAnswers;
        });
    };

    const handleSubmitAnswer = async() => {
        let allFilled = true;
        let incorrectCategories = new Set();
    
        elementsData.forEach((item, index) => {
            const elementAnswer = answers[`element-${index}`];      
            const monatomicAnswer = answers[`monatomic-${index}`]; 
            const polyatomicAnswer = answers[`polyatomic-${index}`]; 
    
            // Check if all fields are filled
            if (!elementAnswer || !monatomicAnswer || !polyatomicAnswer) {
                allFilled = false;
            }
    
            const correctMonatomicSymbol = symbolMapping[item.monatomic];
            const correctPolyatomicSymbol = symbolMapping[item.polyatomic];
    
            let isElementCorrect = elementAnswer === item.symbol;
            let isMonatomicCorrect = monatomicAnswer === correctMonatomicSymbol;
            let isPolyatomicCorrect = polyatomicAnswer === correctPolyatomicSymbol;
    
            if (!isElementCorrect) {
                incorrectCategories.add("elements");
            }
            if (!isMonatomicCorrect) {
                incorrectCategories.add("monatomic ions");
            }
            if (!isPolyatomicCorrect) {
                incorrectCategories.add("polyatomic ions");
            }
        });
    
        if (!allFilled) {
            setFeedback("⚠️ Please fill out all the symbols before submitting.");
            setFeedbackClass("warning-feedback");
            setTimeout(() => {
                setFeedback("");
                setFeedbackClass("");
            }, 3000);
            return;
        }
    
        if (incorrectCategories.size === 0) {
            setIsAnswerCorrect(true);
            setFeedback("✅ Correct! Well done!");
            setFeedbackClass("correct-feedback");
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
        } else {
            setIsAnswerCorrect(false);
            let errorMessage = `❌ Incorrect: ${[...incorrectCategories].join(" and ")} are incorrect.`;
    
            if (incorrectCategories.size === 3) {
                errorMessage = "❌ Incorrect, try again.";
            }
    
            setFeedback(errorMessage);
            setFeedbackClass("incorrect-feedback");
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
        }
    
        setTimeout(() => {
            setFeedback("");
            setFeedbackClass("");
        }, 3000);
    };
    
    const handleNextQuestion = () => {
        setFeedback('');
        setFeedbackClass('');
        setIsAnswerCorrect(false);
        setAnswers({});
        setSymbols([...allSymbols].sort(() => Math.random() - 0.5));
    };


    return (
        <div className='lesson-ten-point-one'>
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
                <div className='lesson-ten-point-one-box'>
                    <div className='lesson-ten-point-one-box-innercont'>
                        <div className='lesson-ten-point-one-box-title'>
                            <h1>Unit Ten: Ionic Compounds (Polyatomic Ions)</h1>
                            {/*    <h1>{`${lessonName}`}</h1> {/* ASK IF PREFERED OR NOT  */}

                        </div>
                        <div className='lesson-ten-point-one-content'>
                            <p className='lesson-ten-point-one-prompt'>
                                Drag & drop the correct symbols. If you make a mistake, click on a symbol to remove it
                            </p>
                            <div className="ion-table-container">
                                <table className="ion-table">
                                    <thead>
                                        <tr>
                                            <th colSpan="2">Element</th>
                                            <th colSpan="2">Monatomic Ion</th>
                                            <th colSpan="2">Polyatomic Ion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {elementsData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.element}</td>
                                                <td
                                                    className={`drop-zone ${answers[`element-${index}`] ? 'filled' : ''}`}
                                                    onDrop={(e) => handleDrop(e, "element", index)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onClick={() => handleRemoveSymbol("element", index)} 
                                                >
                                                    {answers[`element-${index}`] || "⬜"}
                                                </td>
                                                <td>{item.monatomic}</td>
                                                <td
                                                    className={`drop-zone ${answers[`monatomic-${index}`] ? 'filled' : ''}`}
                                                    onDrop={(e) => handleDrop(e, "monatomic", index)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onClick={() => handleRemoveSymbol("monatomic", index)}
                                                >
                                                    {answers[`monatomic-${index}`] || "⬜"}
                                                </td>
                                                <td>{item.polyatomic}</td>
                                                <td
                                                    className={`drop-zone ${answers[`polyatomic-${index}`] ? 'filled' : ''}`}
                                                    onDrop={(e) => handleDrop(e, "polyatomic", index)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onClick={() => handleRemoveSymbol("polyatomic", index)}
                                                >
                                                    {answers[`polyatomic-${index}`] || "⬜"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Drag Items */}
                                <div className="symbols-container">
                                    <h3>Drag these symbols:</h3>
                                    {symbols.map((symbol, i) => (
                                        <div key={i} className="draggable-symbol" draggable onDragStart={(e) => handleDragStart(e, symbol)}>
                                            {symbol}
                                        </div>
                                    ))}
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
                        <p><strong>Note:</strong> The suffix <code>-ate</code> does NOT always mean <code>O₃</code>. However, these four polyatomic ions follow a pattern and are easier to memorize!</p>
                        <button onClick={() => setShowCompletionModal(false)}>Continue</button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default LessonTenPointOne;