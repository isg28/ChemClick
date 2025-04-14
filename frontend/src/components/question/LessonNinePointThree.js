import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonNinePointThree.css';
import { useNavigate } from 'react-router-dom';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from './LessonUtils';

function LessonNinePointThree() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId'); 
  const teacherId = localStorage.getItem('teacherId'); 
  
  const isTeacher = !!teacherId; 
  const userId = isTeacher ? teacherId : studentId;   
  const lessonId = 'lesson9.3';

  const [goal, setGoal] = useState();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(0);
  const [streak, setStreak] = useState(0); // Track correct answers in a row
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
  const displayMedals = starsEarned >= 5;

  // Constants for removal logic
  const removeSubscript = ["1", "2", "3", "4", "5", "6"]; // Subscripts to remove
  const removeSymbols = ["+", "-"]; // Symbols to remove

  // Questions array: each question provides an explicit formula.
  const explicitforms = [
    { value: "1", explicit: "H1-" }, // Hydride ion
    { value: "2", explicit: "Li1+" }, // Lithium ion
    { value: "3", explicit: "Na1+" }, // Sodium ion
    { value: "4", explicit: "K1+" }, // Potassium ion
    { value: "5", explicit: "Be2+" }, // Beryllium ion
    { value: "6", explicit: "Mg2+" }, // Magnesium ion
    { value: "7", explicit: "Ca2+" }, // Calcium ion
    { value: "8", explicit: "B3+" }, // Boron ion
    { value: "9", explicit: "Al3+" }, // Aluminum ion
    { value: "10", explicit: "Ga3+" }, // Gallium ion
    { value: "11", explicit: "C4-" }, // Carbonide ion
    { value: "12", explicit: "N3-" }, // Nitride ion
    { value: "13", explicit: "P3-" }, // Phosphide ion
    { value: "14", explicit: "O2-" }, // Oxide ion
    { value: "15", explicit: "S2-" }, // Sulfide ion
    { value: "16", explicit: "F1-" }, // Fluoride ion
    { value: "17", explicit: "Cl1-" }, // Chloride ion
    { value: "18", explicit: "Br1-" } // Bromide ion
  ];

  const implicitforms = [
    { value: "1", implicit: "H", name: "Hydride ion" }, // Hydride ion
    { value: "2", implicit: "Li", name: "Lithium ion" }, // Lithium ion
    { value: "3", implicit: "Na", name: "Sodium ion" }, // Sodium ion
    { value: "4", implicit: "K", name: "Potassium ion" }, // Potassium ion
    { value: "5", implicit: "Be", name: "Beryllium ion" }, // Beryllium ion
    { value: "6", implicit: "Mg", name: "Magnesium ion" }, // Magnesium ion
    { value: "7", implicit: "Ca", name: "Calcium ion" }, // Calcium ion
    { value: "8", implicit: "B", name: "Boron ion" }, // Boron ion
    { value: "9", implicit: "Al", name: "Aluminum ion" }, // Aluminum ion
    { value: "10", implicit: "Ga", name: "Gallium ion" }, // Gallium ion
    { value: "11", implicit: "C", name: "Carbonide ion" }, // Carbonide ion
    { value: "12", implicit: "N", name: "Nitride ion" }, // Nitride ion
    { value: "13", implicit: "P", name: "Phosphide ion" }, // Phosphide ion
    { value: "14", implicit: "O", name: "Oxide ion" }, // Oxide ion
    { value: "15", implicit: "S", name: "Sulfide ion" }, // Sulfide ion
    { value: "16", implicit: "F", name: "Fluoride ion" }, // Fluoride ion
    { value: "17", implicit: "Cl", name: "Chloride ion" }, // Chloride ion
    { value: "18", implicit: "Br", name: "Bromide ion" } // Bromide ion
  ];

  // Shuffle questions
  const shuffleQuestions = () => {
    let arr = [...explicitforms];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // For the current question, extract the explicit formula and compute its parts.
  const currentQuestion = randomizedQuestions[currentQuestionIndex];
  let explicitFormula = "";
  let correctRemovalIndices = [];
  let ionName = "";

  if (currentQuestion) {
    explicitFormula = currentQuestion.explicit;
    // Determine which characters to remove based on removeSubscript and removeSymbols
    correctRemovalIndices = explicitFormula.split("").reduce((acc, char, index) => {
      if (removeSubscript.includes(char) || removeSymbols.includes(char)) {
        acc.push(index);
      }
      return acc;
    }, []);

    // Fetch the ion name from implicitforms
    ionName = implicitforms.find(imp => imp.value === currentQuestion.value)?.name || "";
  }

  // States for the interactive phases:
  // "removal" phase: user clicks characters to remove.
  // "typing" phase: user types the implicit formula.
  const [phase, setPhase] = useState("removal");
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [removalFeedback, setRemovalFeedback] = useState("");
  const [textAnswer, setTextAnswer] = useState("");
  const [textFeedback, setTextFeedback] = useState("");

  // Initialization: check for studentId, fetch lesson data/progress, and randomize questions.
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
    setRandomizedQuestions(shuffleQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, lessonId, navigate, isTeacher]);

  // Show completion modal if progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      setShowCompletionModal(true);
    }
  }, [progress]);

  // Handler: Toggle character selection during removal phase.
  const toggleCharacterSelection = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  // Validate removal selection when user submits.
  const handleRemovalSubmit = async () => {
    const sortedSelected = [...selectedIndices].sort((a, b) => a - b);
    const sortedCorrect = [...correctRemovalIndices].sort((a, b) => a - b);

    // Check if the arrays are identical
    if (sortedSelected.length === sortedCorrect.length && sortedSelected.every((value, index) => value === sortedCorrect[index])) {
      setRemovalFeedback("Correct removal!");
      setPhase("typing");
    } else {
      setRemovalFeedback("You must remove both charges (superscripts) and any subscripts that are 1.");
      setStreak(0); // Reset streak on incorrect answer
      await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
    }
  };

  // Validate the text answer in the typing phase.
  const handleTextSubmit = async () => {
    // Fetch the implicit formula from implicitforms during the typing phase
    const implicitFormula = implicitforms.find(imp => imp.value === currentQuestion.value)?.implicit || "";

    if (textAnswer.trim().toLowerCase() === implicitFormula.toLowerCase()) {
      setTextFeedback("Correct!");
      const newStreak = streak + 1; // Increment streak
      setStreak(newStreak);

      if (newStreak >= goal) {
        setProgress(100); // Set progress to 100% if streak reaches goal
        setMasteryLevel(5); // Light up all 5 stars
      } else {
        setProgress((newStreak / goal) * 100); // Update progress based on streak
      }

      await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      }); 

      // Brief delay before moving to the next question
      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    } else {
      setTextFeedback("Incorrect. Please try again.");
      setStreak(0); // Reset streak on incorrect answer
      await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
    }
  };

  // Proceed to the next question and reset phase-specific states.
  const handleNextQuestion = () => {
    setSelectedIndices([]);
    setRemovalFeedback("");
    setTextAnswer("");
    setTextFeedback("");
    setPhase("removal");
    if (randomizedQuestions.length > 0 && currentQuestionIndex < randomizedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0); // Loop back to first question
    }
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="lesson-nine-point-three">
      <div className="questionheader">
        <div className="question-head-in">
          <img src={require('../../assets/question/ChemClickLogo.png')} className="ChemClickLogoHeader" alt="Chem Click Logo" />
          <div className="insideheader">
            <h1>ChemClicks Assignments</h1>
          </div>
          <img src={require('../../assets/question/Home.png')} className="homelines" onClick={handleHomeClick} alt="Home" />
        </div>
      </div>

      <div className="question-page-main">
        <div className="lesson-nine-point-three-box">
          <div className="lesson-nine-point-three-box-innercont">
            <div className="lesson-nine-point-three-box-title">
              <h1>Lesson 9.3: Explicit to Implicit Naming</h1>
            </div>
            <div className="lesson-nine-point-three-content">
              {currentQuestion ? (
                <>
                  {phase === "removal" && (
                    <>
                      <p className="lesson-nine-point-three-prompt">
                        Click on the charges (e.g., 1+, 2-) and subscripts of 1 to remove them. <strong>{ionName}</strong>
                      </p>
                      <div className="phrase-container">
                        {explicitFormula.split("").map((char, index) => (
                          <span
                            key={index}
                            className={`phrase-char ${selectedIndices.includes(index) ? "selected" : ""}`}
                            onClick={() => toggleCharacterSelection(index)}
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                      <button className="lesson-nine-point-three-submit" onClick={handleRemovalSubmit}>
                        Submit Selection
                      </button>
                      {removalFeedback && <div className="feedback">{removalFeedback}</div>}
                    </>
                  )}
                  {phase === "typing" && (
                    <>
                      <p className="lesson-nine-point-three-prompt">
                        Now, type in the implicit formula. <strong>{ionName}</strong>
                      </p>
                      <input
                        type="text"
                        className="lesson-nine-point-three-input"
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        placeholder="Enter the implicit formula"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && textAnswer.trim() !== '') {
                            handleTextSubmit();
                          }
                        }}
                      />
                      <button className="lesson-nine-point-three-submit" onClick={handleTextSubmit}>
                        Submit Answer
                      </button>
                      {textFeedback && <div className="feedback">{textFeedback}</div>}
                    </>
                  )}
                </>
              ) : (
                <p>Loading question...</p>
              )}
            </div>
          </div>
        </div>
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
                            onClick={() => navigate('/lessonninepointfour')}
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

export default LessonNinePointThree;