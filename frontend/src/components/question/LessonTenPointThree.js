import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonTenPointThree.css';
import { useNavigate } from 'react-router-dom';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from '../../components/question/LessonUtils';

function LessonTenPointThree() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;      
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
        { name: "Sodium", symbol: "Na", charge: 1 },
        { name: "Potassium", symbol: "K", charge: 1 },
        { name: "Calcium", symbol: "Ca", charge: 2 },
        { name: "Magnesium", symbol: "Mg", charge: 2 },
        { name: "Aluminum", symbol: "Al", charge: 3 },
        { name: "Iron(II)", symbol: "Fe", charge: 2 },
        { name: "Iron(III)", symbol: "Fe", charge: 3 },
        { name: "Copper(I)", symbol: "Cu", charge: 1 },
        { name: "Copper(II)", symbol: "Cu", charge: 2 }
    ], []);

    // Polyatomic Anions 
    const polyatomicIons = useMemo(() => [
        { name: "Sulfate", symbol: "SO₄", charge: -2 },
        { name: "Nitrate", symbol: "NO₃", charge: -1 },
        { name: "Phosphate", symbol: "PO₄", charge: -3 },
        { name: "Carbonate", symbol: "CO₃", charge: -2 },
        { name: "Hydroxide", symbol: "OH", charge: -1 },
        { name: "Chlorate", symbol: "ClO₃", charge: -1 },
        { name: "Acetate", symbol: "C₂H₃O₂", charge: -1 },
        { name: "Permanganate", symbol: "MnO₄", charge: -1 }
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
    }, [userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    const getNextCompound = useCallback(() => {
        let randomCation, randomAnion, cationCount, anionCount;
        
        do {
            randomCation = metal[Math.floor(Math.random() * metal.length)];
            randomAnion = polyatomicIons[Math.floor(Math.random() * polyatomicIons.length)];

            const lcm = (a, b) => (a * b) / gcd(a, b);
            const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

            const chargeLCM = lcm(randomCation.charge, Math.abs(randomAnion.charge));
            cationCount = chargeLCM / randomCation.charge;
            anionCount = chargeLCM / Math.abs(randomAnion.charge);
        } while (!randomCation || !randomAnion);

        const formatSubscript = (num) => (num > 1 ? num.toString().split("").map(n => String.fromCharCode(0x2080 + parseInt(n))).join("") : "");

        const formattedCation = `${randomCation.symbol}${formatSubscript(cationCount)}`;
        const formattedAnion = anionCount > 1 ? `(${randomAnion.symbol})${formatSubscript(anionCount)}` : randomAnion.symbol;

        const compoundSymbol = `${formattedCation}${formattedAnion}`;
        const compoundName = `${randomCation.name} ${randomAnion.name}`;

        setCurrentCompound({ 
            cation: randomCation,  
            anion: randomAnion, 
            name: compoundName,
            symbol: compoundSymbol
        });

        setUserInput('');
        setFeedback('');
        setIsAnswerCorrect(false);
    }, [metal, polyatomicIons]);
    
    useEffect(() => {
        getNextCompound();
    }, [getNextCompound]);

    const handleSubmitAnswer = async () => {
        const romanNumeralRegex = /\((i{1,3}|iv|v|vi{0,3}|ix|x)\)/gi;
    
        let formattedInput = userInput.replace(romanNumeralRegex, (match) => match.toUpperCase());
        formattedInput = formattedInput.toLowerCase().replace(romanNumeralRegex, (match) => match.toUpperCase());
    
        if (formattedInput !== userInput) {
            setFeedback("⚠️ Please enter your answer in lowercase, but keep Roman numerals capitalized (e.g., iron(III)).");
            return;
        }
    
        if (formattedInput.trim() === currentCompound.name.toLowerCase().replace(romanNumeralRegex, (match) => match.toUpperCase())) {
            setIsAnswerCorrect(true);
            setFeedback("✅ Correct! Well done!");
            setFeedbackClass("correct-feedback");
            await CorrectResponses({ userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
        } else {
            setIsAnswerCorrect(false);
            setFeedback("❌ Incorrect. Try again!");
            setFeedbackClass("incorrect-feedback");
            await IncorrectResponses({ userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
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
                            Write the name for:  
                            <p className="lesson-ten-point-three-symbol">
                                {" "+ currentCompound.symbol || "Loading..."}
                            </p>
                        </p>

                        <div className="input-section">
                            <div className="input-container">
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Type the compound name"
                            />

                            </div>
                            <p className="lowercase-hint">
                                * Please enter your answer in lowercase except for Roman numerals (which should be uppercase).<br />
                                * Make sure there's no space between the ion name and parentheses. Example: <code>iron(III)</code>, not <code>iron (III)</code>.<br />
                            </p>
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