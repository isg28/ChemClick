import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonNinePointEight.css';
import { useNavigate } from 'react-router-dom';
import { 
  renderStars, 
  renderGoalChecks, 
  fetchLessonData, 
  fetchLessonProgress, 
  CorrectResponses, 
  IncorrectResponses 
} from './LessonUtils';

function LessonNinePointEight() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');
  const lessonId = 'lesson9.8';

  // Progress & Mastery state
  const [goal, setGoal] = useState();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
  const displayMedals = starsEarned >= 5;

  // Questions array with 15 questions.
  const questions = [
    { 
      implicit: "two aluminum ion three oxide ion", 
      explicit: "Al2O3", 
      implicitName: "aluminum oxide" 
    },
    { 
      implicit: "one calcium ion two fluoride ion", 
      explicit: "CaF2", 
      implicitName: "calcium fluoride" 
    },
    { 
      implicit: "one magnesium ion one oxide ion", 
      explicit: "MgO", 
      implicitName: "magnesium oxide" 
    },
    { 
      implicit: "one sodium ion one chloride ion", 
      explicit: "NaCl", 
      implicitName: "sodium chloride" 
    },
    { 
      implicit: "one potassium ion one iodide ion", 
      explicit: "KI", 
      implicitName: "potassium iodide" 
    },
    { 
      implicit: "two lithium ion one oxide ion", 
      explicit: "Li2O", 
      implicitName: "lithium oxide" 
    },
    { 
      implicit: "three magnesium ion two nitride ion", 
      explicit: "Mg3N2", 
      implicitName: "magnesium nitride" 
    },
    { 
      implicit: "three calcium ion two phosphate ion", 
      explicit: "Ca3(PO4)2", 
      implicitName: "calcium phosphate" 
    },
    { 
      implicit: "one zinc ion one oxide ion", 
      explicit: "ZnO", 
      implicitName: "zinc oxide" 
    },
    { 
      implicit: "two iron ion three oxide ion", 
      explicit: "Fe2O3", 
      implicitName: "iron oxide" 
    },
    { 
      implicit: "one copper ion one chloride ion", 
      explicit: "CuCl", 
      implicitName: "copper chloride" 
    },
    { 
      implicit: "one silver ion one nitrate ion", 
      explicit: "AgNO3", 
      implicitName: "silver nitrate" 
    },
    { 
      implicit: "one barium ion one sulfate ion", 
      explicit: "BaSO4", 
      implicitName: "barium sulfate" 
    },
    { 
      implicit: "one magnesium ion two chloride ion", 
      explicit: "MgCl2", 
      implicitName: "magnesium chloride" 
    },
    { 
      implicit: "three lithium ion one nitride ion", 
      explicit: "Li3N", 
      implicitName: "lithium nitride" 
    }
  ];

  // Shuffle questions
  const shuffleQuestions = () => {
    let arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Lesson phases: 
  // "explicit" – student enters the explicit formula,
  // "removal" – student clicks words to remove extra descriptors,
  // "implicit" – student types the final implicit formula.
  const [phase, setPhase] = useState("explicit");

  // Explicit formula phase state
  const [explicitInput, setExplicitInput] = useState("");
  const [explicitFeedback, setExplicitFeedback] = useState("");

  // Removal phase state
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [removalFeedback, setRemovalFeedback] = useState("");

  // Implicit formula phase state
  const [implicitInput, setImplicitInput] = useState("");
  const [implicitFeedback, setImplicitFeedback] = useState("");

  // Utility function to render a chemical formula so that any digit (subscript)
  // is wrapped in a little styled box.
  const renderExplicitFormula = (formula) => {
    const regex = /([A-Za-z]+)(\d*)/g;
    const parts = [];
    let match;
    while ((match = regex.exec(formula)) !== null) {
      const element = match[1];
      const subscript = match[2];
      parts.push(
        <span key={regex.lastIndex} className="formula-element">
          {element}
          {subscript && <span className="subscript">{subscript}</span>}
        </span>
      );
    }
    return parts;
  };

  // Utility function to canonicalize a formula by removing any superfluous "1"s.
  const canonicalizeFormula = (formula) => {
    const regex = /([A-Za-z]+)(\d*)/g;
    let result = "";
    let match;
    while ((match = regex.exec(formula)) !== null) {
      const element = match[1];
      const number = match[2] === "" ? "1" : match[2];
      // Do not include the number if it's "1"
      result += element + (number === "1" ? "" : number);
    }
    return result;
  };

  // Initialize lesson data and randomize questions
  useEffect(() => {
    if (!studentId) {
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
    setRandomizedQuestions(shuffleQuestions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId, lessonId, navigate]);

  // Show completion modal if progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      setShowCompletionModal(true);
    }
  }, [progress]);

  // For the current question, compute word breakdown and expected removals.
  let implicitPhrase = "";
  let words = [];
  let correctRemovalIndices = [];
  let expectedImplicitName = "";
  if (randomizedQuestions[currentQuestionIndex]) {
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    implicitPhrase = currentQuestion.implicit;
    words = implicitPhrase.split(" ");
    const quantityWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    correctRemovalIndices = words.reduce((acc, word, index) => {
      const lower = word.toLowerCase();
      if (quantityWords.includes(lower) || lower === "ion" || lower === "ions") {
        acc.push(index);
      }
      return acc;
    }, []);
    expectedImplicitName = words
      .filter(word => {
        const lower = word.toLowerCase();
        return !(quantityWords.includes(lower) || lower === "ion" || lower === "ions");
      })
      .join(" ");
  }

  // Handler: Submit explicit formula answer.
  // This uses canonicalizeFormula so that extra "1" subscripts are ignored.
  const handleExplicitSubmit = async () => {
    const currentQuestion = randomizedQuestions[currentQuestionIndex];
    if (canonicalizeFormula(explicitInput.trim()) === currentQuestion.explicit) {
      setExplicitFeedback("Correct explicit formula!");
      await CorrectResponses({
        studentId,
        lessonId,
        correctAnswers,
        incorrectAnswers,
        totalAttempts,
        progress,
        masteryLevel,
        goal,
        starsEarned,
        setCorrectAnswers,
        setProgress,
        setMasteryLevel,
        setTotalAttempts,
      });
      setPhase("removal");
    } else {
      setExplicitFeedback("Incorrect explicit formula. Make sure to use the smallest possible ratio of subscripts.");
      await IncorrectResponses({
        studentId,
        lessonId,
        correctAnswers,
        incorrectAnswers,
        totalAttempts,
        progress,
        masteryLevel,
        goal,
        starsEarned,
        setIncorrectAnswers,
        setProgress,
        setMasteryLevel,
        setTotalAttempts,
      });
    }
  };

  // Handler: Toggle word selection during removal phase.
  const toggleWordSelection = (index) => {
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  // Handler: Submit removal selection.
  const handleRemovalSubmit = async () => {
    const sortedSelected = [...selectedIndices].sort((a, b) => a - b);
    const sortedCorrect = [...correctRemovalIndices].sort((a, b) => a - b);
    if (JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)) {
      setRemovalFeedback("Correct removal!");
      setPhase("implicit");
    } else {
      setRemovalFeedback("Incorrect selection. Remove the quantity words and 'ion/ions'.");
      await IncorrectResponses({
        studentId,
        lessonId,
        correctAnswers,
        incorrectAnswers,
        totalAttempts,
        progress,
        masteryLevel,
        goal,
        starsEarned,
        setIncorrectAnswers,
        setProgress,
        setMasteryLevel,
        setTotalAttempts,
      });
    }
  };

  // Handler: Submit implicit formula answer.
  const handleImplicitSubmit = async () => {
    if (implicitInput.trim().toLowerCase() === expectedImplicitName.toLowerCase()) {
      setImplicitFeedback("Correct implicit formula!");
      await CorrectResponses({
        studentId,
        lessonId,
        correctAnswers,
        incorrectAnswers,
        totalAttempts,
        progress,
        masteryLevel,
        goal,
        starsEarned,
        setCorrectAnswers,
        setProgress,
        setMasteryLevel,
        setTotalAttempts,
      });
      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    } else {
      setImplicitFeedback("Incorrect implicit formula. Please try again.");
      await IncorrectResponses({
        studentId,
        lessonId,
        correctAnswers,
        incorrectAnswers,
        totalAttempts,
        progress,
        masteryLevel,
        goal,
        starsEarned,
        setIncorrectAnswers,
        setProgress,
        setMasteryLevel,
        setTotalAttempts,
      });
    }
  };

  // Handler: Proceed to next question and reset phase states.
  const handleNextQuestion = () => {
    setExplicitInput("");
    setExplicitFeedback("");
    setSelectedIndices([]);
    setRemovalFeedback("");
    setImplicitInput("");
    setImplicitFeedback("");
    setPhase("explicit");
    if (randomizedQuestions.length > 0 && currentQuestionIndex < randomizedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
  };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="lesson-nine-point-eight">
      <div className="questionheader">
        <div className="question-head-in">
          <img 
            src={require('../../assets/question/ChemClickLogo.png')}
            className="ChemClickLogoHeader" 
            alt="Chem Click Logo" 
          />
          <div className="insideheader">
            <h1>ChemClicks Assignments</h1>
          </div>
          <img 
            src={require('../../assets/question/Home.png')}
            className="homelines" 
            onClick={handleHomeClick} 
            alt="Home" 
          />
        </div>
      </div>

      <div className="question-page-main">
        <div className="lesson-nine-point-eight-box">
          <div className="lesson-nine-point-eight-box-innercont">
            <div className="lesson-nine-point-eight-box-title">
              <h1>Lesson 9.8: Implicit Name → Implicit Formula</h1>
            </div>
            <div className="lesson-nine-point-eight-content">
              {randomizedQuestions[currentQuestionIndex] ? (
                <>
                  {phase === "explicit" && (
                    <>
                      <p className="lesson-nine-point-eight-prompt">
                        Given the implicit name: <strong>{randomizedQuestions[currentQuestionIndex].implicit}</strong>
                        <br />Enter the explicit formula using the smallest possible ratio.
                      </p>
                      <input
                        type="text"
                        className="lesson-nine-point-eight-input"
                        value={explicitInput}
                        onChange={(e) => setExplicitInput(e.target.value)}
                        placeholder="Enter explicit formula"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && explicitInput.trim() !== "") {
                            handleExplicitSubmit();
                          }
                        }}
                      />
                      <button className="lesson-nine-point-eight-submit" onClick={handleExplicitSubmit}>
                        Submit Explicit Formula
                      </button>
                      {explicitFeedback && <div className="feedback">{explicitFeedback}</div>}
                      {explicitInput && (
                        <div className="formula-preview">
                          <span>Preview: </span>
                          {renderExplicitFormula(explicitInput)}
                        </div>
                      )}
                    </>
                  )}

                  {phase === "removal" && (
                    <>
                      <p className="lesson-nine-point-eight-prompt">
                        Now, click on the words you want to remove so that only the compound name remains.
                      </p>
                      <div className="phrase-container">
                        {words.map((word, index) => (
                          <span
                            key={index}
                            className={`phrase-word ${selectedIndices.includes(index) ? "selected" : ""}`}
                            onClick={() => toggleWordSelection(index)}
                          >
                            {word}{" "}
                          </span>
                        ))}
                      </div>
                      <button className="lesson-nine-point-eight-submit" onClick={handleRemovalSubmit}>
                        Submit Removal Selection
                      </button>
                      {removalFeedback && <div className="feedback">{removalFeedback}</div>}
                    </>
                  )}

                  {phase === "implicit" && (
                    <>
                      <p className="lesson-nine-point-eight-prompt">
                        Now, type in the implicit formula (the compound name).
                      </p>
                      <p className="explicit-display">Expected implicit formula: {expectedImplicitName}</p>
                      <input
                        type="text"
                        className="lesson-nine-point-eight-input"
                        value={implicitInput}
                        onChange={(e) => setImplicitInput(e.target.value)}
                        placeholder="Enter implicit formula"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && implicitInput.trim() !== "") {
                            handleImplicitSubmit();
                          }
                        }}
                      />
                      <button className="lesson-nine-point-eight-submit" onClick={handleImplicitSubmit}>
                        Submit Implicit Formula
                      </button>
                      {implicitFeedback && <div className="feedback">{implicitFeedback}</div>}
                    </>
                  )}
                </>
              ) : (
                <p>Loading question...</p>
              )}
            </div>
          </div>
        </div>

        {/* Side column for mastery and goal tracking */}
        <div className="side-column">
          <div className="side-column-box-holder">
            <div className="side-column-box masterybox">
              <div className="side-column-box-title masteryboxtitle">
                <h1>Mastery</h1>
              </div>
              {displayMedals && (
                <>
                  <div className="reward-box-left" title="Congrats on achieving mastery!">
                    🏅
                  </div>
                  <div className="reward-box-right" title="Congrats on achieving mastery!">
                    🏅
                  </div>
                </>
              )}
              <div className="side-column-box-info masteryboxstars">{stars}</div>
            </div>
            <div className="side-column-box">
              <div className="side-column-box-title">
                <h1>Goal</h1>
              </div>
              <div className="side-column-box-info">
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

export default LessonNinePointEight;
