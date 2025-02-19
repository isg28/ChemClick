import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonTenPointThree.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonTenPointThree() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson10.3'; 
    
    const [goal, setGoal] = useState();
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5; 

    // Cations (Metal Ions)
    const metal = useMemo(() => [
        { name: "Sodium", symbol: "Na⁺" },
        { name: "Potassium", symbol: "K⁺" },
        { name: "Calcium", symbol: "Ca²⁺" },
        { name: "Magnesium", symbol: "Mg²⁺" },
        { name: "Aluminum", symbol: "Al³⁺" },
        { name: "Iron (II)", symbol: "Fe²⁺" },
        { name: "Iron (III)", symbol: "Fe³⁺" },
        { name: "Copper (I)", symbol: "Cu⁺" },
        { name: "Copper (II)", symbol: "Cu²⁺" }
    ], []);

    // Polyatomic Anions
    const polyatomicIons = useMemo(() => [
        { name: "Sulfate", symbol: "SO₄²⁻" },
        { name: "Nitrate", symbol: "NO₃⁻" },
        { name: "Phosphate", symbol: "PO₄³⁻" },
        { name: "Carbonate", symbol: "CO₃²⁻" },
        { name: "Hydroxide", symbol: "OH⁻" },
        { name: "Chlorate", symbol: "ClO₃⁻" },
        { name: "Acetate", symbol: "C₂H₃O₂⁻" },
        { name: "Permanganate", symbol: "MnO₄⁻" }
    ], []);

    const [currentCompound, setCurrentCompound] = useState({});
    const [userInput, setUserInput] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handlequestion = () => {
        navigate('/dashboard');
    };

    useEffect(() => {
        if (!studentId) { 
            console.error('Student ID not found');
            navigate('/login');
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
    }, [studentId, lessonId, navigate]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    // Generate New Ionic Compound
    const getNextCompound = useCallback(() => {
        const randomCation = metal[Math.floor(Math.random() * metal.length)];
        const randomAnion = polyatomicIons[Math.floor(Math.random() * polyatomicIons.length)];
    
        if (randomCation && randomAnion) { 
            const compoundName = `${randomCation.name} ${randomAnion.name}`;
        
            setCurrentCompound({ 
                cation: randomCation,  
                anion: randomAnion, 
                name: compoundName 
            });
    
            setUserInput('');
            setFeedback('');
            setIsAnswerCorrect(false);
        }
    }, [metal, polyatomicIons]);

    useEffect(() => {
        getNextCompound();
    }, [getNextCompound]);
    
    const normalizeMetalName = (name) => {
        return name
            .toLowerCase()
            .replace(/\s*\(?I+\)?/g, " ($&)")
            .replace(/\s+/g, " ") 
            .trim(); // Removes leading/trailing spaces
    };
    
    const handleSubmitAnswer = async () => {
        let normalizedUserInput = normalizeMetalName(userInput.trim());
        let normalizedCorrectAnswer = normalizeMetalName(currentCompound.name);
    
        console.log("User Input:", `"${normalizedUserInput}"`);
        console.log("Correct Answer:", `"${normalizedCorrectAnswer}"`);
    
        if (normalizedUserInput === normalizedCorrectAnswer) {
            setIsAnswerCorrect(true);
            setFeedback("✅ Correct! Well done!");
            setFeedbackClass("correct-feedback");
            await CorrectResponses({
                studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned,
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
        } else {
            setIsAnswerCorrect(false);
            let hintMessage = "❌ Incorrect. Try again!";
    
            const userAnswerParts = normalizedUserInput.split(" ");
            const correctParts = normalizedCorrectAnswer.split(" ");
    
            let userCation = userAnswerParts.slice(0, -1).join(" "); 
            let userAnion = userAnswerParts[userAnswerParts.length - 1];
            let correctCation = correctParts.slice(0, -1).join(" ");
            let correctAnion = correctParts[correctParts.length - 1];
    
            let gotCationCorrect = userCation === correctCation;
            let gotAnionCorrect = userAnion === correctAnion;
    
            if (gotCationCorrect && !gotAnionCorrect) {
                hintMessage += ` Hint: You got the metal correct! Now focus on the polyatomic ion.`;
            } else if (!gotCationCorrect && gotAnionCorrect) {
                hintMessage += ` Hint: You got the polyatomic ion correct! Now check the metal name.`;
            }
    
            // Special Hint for Iron & Copper (Roman Numerals)
            if (!gotCationCorrect && (currentCompound.cation.name.includes("Iron") || currentCompound.cation.name.includes("Copper"))) {
                const romanNumeral = currentCompound.cation.name.match(/\((I+)\)/); 
                if (romanNumeral) {
                    hintMessage += ` The correct metal name includes ${romanNumeral[0]}. Remember to leave a space between the metal name and the Roman numeral in parentheses.`;
                }
            }
    
            setFeedback(hintMessage);
            setFeedbackClass("incorrect-feedback");
            await IncorrectResponses({
                studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned,
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
        }
    };
    
    const handleNextQuestion = () => {
        getNextCompound();
    };

    return (
        <div className='lesson-ten-point-three'>
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
                <div className='lesson-ten-point-three-box'>
                <div className='lesson-ten-point-three-box-innercont'>
                    <div className='lesson-ten-point-three-box-title'>
                        <h1>Unit Ten: Ionic Compounds (Polyatomic Ions)</h1>
                        {/*    <h1>{`${lessonName}`}</h1> {/* ASK IF PREFERED OR NOT  */}

                    </div>
                    <div className='lesson-ten-point-three-content'>
                        <div className="quiz-container">
                        <p className='lesson-ten-point-three-prompt'>
                            These are ionic compounds with polyatomic ions. <br />
                            Write the name for: <u>
                                {currentCompound.cation && currentCompound.anion 
                                    ? `${currentCompound.cation.symbol} ${currentCompound.anion.symbol}`
                                    : "Loading..."}
                            </u>
                        </p>
                        <div className="input-section">
                            <div className="input-container">
                                <input
                                    type="text"
                                    value={userInput}
                                    onChange={(e) => setUserInput(e.target.value)}
                                    placeholder="Type the compound name..."
                                />
                            </div>
                        </div>

                        <div className="lesson-ten-point-three-submit-feedback-container">
                            {!isAnswerCorrect && (
                                <button className='lesson-one-point-two-submit' onClick={handleSubmitAnswer}>
                                    Submit Answer
                                </button>
                            )}
                            {isAnswerCorrect && (
                                <button className='lesson-one-point-two-next' onClick={handleNextQuestion}>
                                    Next Question
                                </button>
                            )}
                            <span className={`lesson-one-point-two-feedback ${feedbackClass}`}>{feedback}</span>
                        </div>
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

export default LessonTenPointThree;