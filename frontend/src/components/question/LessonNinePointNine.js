import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonNinePointNine.css';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from './LessonUtils';

const questions = [
    {
      implicitFormula: "NaCl",
      explicitFormulaParts: {
        metalSymbol: "Na",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "Cl",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "one sodium ion one chloride ion",
      implicitName: "sodium chloride"
    },
    {
      implicitFormula: "MgO",
      explicitFormulaParts: {
        metalSymbol: "Mg",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "O",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "one magnesium ion one oxide ion",
      implicitName: "magnesium oxide"
    },
    {
      implicitFormula: "CaF2",
      explicitFormulaParts: {
        metalSymbol: "Ca",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "F",
        nonmetalQuantity: 2,
        nonmetalCharge: "-"
      },
      explicitName: "one calcium ion two fluoride ion",
      implicitName: "calcium fluoride"
    },
    {
      implicitFormula: "Al2O3",
      explicitFormulaParts: {
        metalSymbol: "Al",
        metalQuantity: 2,
        metalCharge: "+",
        nonmetalSymbol: "O",
        nonmetalQuantity: 3,
        nonmetalCharge: "-"
      },
      explicitName: "two aluminum ion three oxide ion",
      implicitName: "aluminum oxide"
    },
    {
      implicitFormula: "KBr",
      explicitFormulaParts: {
        metalSymbol: "K",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "Br",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "one potassium ion one bromide ion",
      implicitName: "potassium bromide"
    },
    {
      implicitFormula: "Li2O",
      explicitFormulaParts: {
        metalSymbol: "Li",
        metalQuantity: 2,
        metalCharge: "+",
        nonmetalSymbol: "O",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "two lithium ion one oxide ion",
      implicitName: "lithium oxide"
    },
    {
      implicitFormula: "CaO",
      explicitFormulaParts: {
        metalSymbol: "Ca",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "O",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "one calcium ion one oxide ion",
      implicitName: "calcium oxide"
    },
    {
      implicitFormula: "Na2O",
      explicitFormulaParts: {
        metalSymbol: "Na",
        metalQuantity: 2,
        metalCharge: "+",
        nonmetalSymbol: "O",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "two sodium ion one oxide ion",
      implicitName: "sodium oxide"
    },
    {
      implicitFormula: "ZnS",
      explicitFormulaParts: {
        metalSymbol: "Zn",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "S",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "one zinc ion one sulfide ion",
      implicitName: "zinc sulfide"
    },
    {
      implicitFormula: "AgCl",
      explicitFormulaParts: {
        metalSymbol: "Ag",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "Cl",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "one silver ion one chloride ion",
      implicitName: "silver chloride"
    },
    {
      implicitFormula: "Fe2O3",
      explicitFormulaParts: {
        metalSymbol: "Fe",
        metalQuantity: 2,
        metalCharge: "+",
        nonmetalSymbol: "O",
        nonmetalQuantity: 3,
        nonmetalCharge: "-"
      },
      explicitName: "two iron ion three oxide ion",
      implicitName: "iron oxide"
    },
    {
      implicitFormula: "CuO",
      explicitFormulaParts: {
        metalSymbol: "Cu",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "O",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "one copper ion one oxide ion",
      implicitName: "copper oxide"
    },
    {
      implicitFormula: "BaSO4",
      explicitFormulaParts: {
        metalSymbol: "Ba",
        metalQuantity: 1,
        metalCharge: "+",
        nonmetalSymbol: "SO4",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "one barium ion one sulfate ion",
      implicitName: "barium sulfate"
    },
    {
      implicitFormula: "Na2CO3",
      explicitFormulaParts: {
        metalSymbol: "Na",
        metalQuantity: 2,
        metalCharge: "+",
        nonmetalSymbol: "CO3",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "two sodium ion one carbonate ion",
      implicitName: "sodium carbonate"
    },
    {
      implicitFormula: "K2O",
      explicitFormulaParts: {
        metalSymbol: "K",
        metalQuantity: 2,
        metalCharge: "+",
        nonmetalSymbol: "O",
        nonmetalQuantity: 1,
        nonmetalCharge: "-"
      },
      explicitName: "two potassium ion one oxide ion",
      implicitName: "potassium oxide"
    }
  ];

const quantityWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

function LessonNinePointNine() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId');
  const lessonId = 'lesson9.9';

  
  const [goal, setGoal] = useState();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
  const displayMedals = starsEarned >= 5;

  // Randomize questions and track current question.
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

 
  // 0: Implicit formula display (start)
  // 1: Explicit formula input (separate fields)
  // 2: Explicit name input
  // 3: Removal selection (cross out extra words)
  // 4: Implicit name input
  // 5: Completed
  const [currentStep, setCurrentStep] = useState(0);

  // Step 1: Inputs for explicit formula parts.
  const [metalSymbolInput, setMetalSymbolInput] = useState("");
  const [nonmetalSymbolInput, setNonmetalSymbolInput] = useState("");
  const [metalQuantityInput, setMetalQuantityInput] = useState("");
  const [nonmetalQuantityInput, setNonmetalQuantityInput] = useState("");
  const [metalChargeInput, setMetalChargeInput] = useState("");
  const [nonmetalChargeInput, setNonmetalChargeInput] = useState("");
  const [formulaFeedback, setFormulaFeedback] = useState("");

  // Step 2: Explicit name input.
  const [explicitNameInput, setExplicitNameInput] = useState("");
  const [explicitNameFeedback, setExplicitNameFeedback] = useState("");

  // Step 3: Removal selection.
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [removalFeedback, setRemovalFeedback] = useState("");

  // Step 4: Implicit name input.
  const [implicitNameInput, setImplicitNameInput] = useState("");
  const [implicitNameFeedback, setImplicitNameFeedback] = useState("");

  // Get the current question.
  const currentQuestion = randomizedQuestions[currentQuestionIndex];

  // For the removal phase: split explicit name into words.
  let explicitNameWords = [];
  let expectedRemovalIndices = [];
  if (currentQuestion) {
    // Remove commas and split by spaces.
    explicitNameWords = currentQuestion.explicitName.replace(/[,]/g, "").split(" ");
    expectedRemovalIndices = explicitNameWords.reduce((acc, word, index) => {
      const lower = word.toLowerCase();
      if (quantityWords.includes(lower) || lower === "ion" || lower === "ions") {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  
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

  useEffect(() => {
    if (progress === 100) {
      setShowCompletionModal(true);
    }
  }, [progress]);

  // Advances to the next step.
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

 

  // Step 0: Display the given implicit formula.
  const renderStep0 = () => (
    <div className="step-section">
      <h2>Step 1: Implicit Formula</h2>
      <p className="lesson-nine-point-nine-prompt">
        The implicit formula is: <strong>{currentQuestion ? currentQuestion.implicitFormula : "Loading..."}</strong>
      </p>
      {currentStep === 0 && (
        <button className="lesson-nine-point-nine-submit" onClick={handleNextStep}>
          Start Explicit Formula Entry
        </button>
      )}
    </div>
  );

  // Step 1: Explicit Formula Input.
  const renderStep1 = () => {
    if (currentStep > 1) {
      // Completed answer remains for reference.
      const parts = currentQuestion ? currentQuestion.explicitFormulaParts : {};
      return (
        <div className="completed-answer">
          <h3>Explicit Formula:</h3>
          <p>
            {parts.metalSymbol}^( {parts.metalCharge} ){parts.metalQuantity} {" "}
            {parts.nonmetalSymbol}^( {parts.nonmetalCharge} ){parts.nonmetalQuantity}
          </p>
        </div>
      );
    }
    if (currentStep === 1) {
      return (
        <div className="step-section">
          <h2>Step 2: Enter the Explicit Formula</h2>
          <div className="explicit-formula-input-group">
            <div className="ion-input-group">
              <label>Metal Symbol:</label>
              <input
                type="text"
                value={metalSymbolInput}
                onChange={(e) => setMetalSymbolInput(e.target.value)}
                placeholder="e.g., Na"
              />
            </div>
            <div className="ion-input-group">
              <label>Nonmetal Symbol:</label>
              <input
                type="text"
                value={nonmetalSymbolInput}
                onChange={(e) => setNonmetalSymbolInput(e.target.value)}
                placeholder="e.g., Cl"
              />
            </div>
            <div className="ion-input-group">
              <label>Metal Quantity (Superscript):</label>
              <input
                type="text"
                value={metalQuantityInput}
                onChange={(e) => setMetalQuantityInput(e.target.value)}
                placeholder="e.g., 1"
                className="superscript-input"
              />
            </div>
            <div className="ion-input-group">
              <label>Nonmetal Quantity (Superscript):</label>
              <input
                type="text"
                value={nonmetalQuantityInput}
                onChange={(e) => setNonmetalQuantityInput(e.target.value)}
                placeholder="e.g., 1"
                className="superscript-input"
              />
            </div>
            <div className="ion-input-group">
              <label>Metal Charge (Subscript):</label>
              <input
                type="text"
                value={metalChargeInput}
                onChange={(e) => setMetalChargeInput(e.target.value)}
                placeholder="e.g., +"
                className="subscript-input"
              />
            </div>
            <div className="ion-input-group">
              <label>Nonmetal Charge (Subscript):</label>
              <input
                type="text"
                value={nonmetalChargeInput}
                onChange={(e) => setNonmetalChargeInput(e.target.value)}
                placeholder="e.g., -"
                className="subscript-input"
              />
            </div>
          </div>
          <button className="lesson-nine-point-nine-submit" onClick={handleSubmitExplicitFormula}>
            Submit Explicit Formula
          </button>
          {formulaFeedback && <div className="feedback">{formulaFeedback}</div>}
        </div>
      );
    }
    return null;
  };

  const handleSubmitExplicitFormula = async () => {
    if (!currentQuestion) return;
    const expected = currentQuestion.explicitFormulaParts;
    let errorMessages = [];
  
    // Check each category individually.
    if (metalSymbolInput.trim() !== expected.metalSymbol) {
      errorMessages.push(`Incorrect metal symbol).`);
    }
    if (nonmetalSymbolInput.trim() !== expected.nonmetalSymbol) {
      errorMessages.push(`Incorrect nonmetal symbol ).`);
    }
    if (parseInt(metalQuantityInput.trim(), 10) !== expected.metalQuantity) {
      errorMessages.push(`Incorrect metal quantity.`);
    }
    if (parseInt(nonmetalQuantityInput.trim(), 10) !== expected.nonmetalQuantity) {
      errorMessages.push(`Incorrect nonmetal quantity.`);
    }
    if (metalChargeInput.trim() !== expected.metalCharge) {
      errorMessages.push(`Incorrect metal charge.`);
    }
    if (nonmetalChargeInput.trim() !== expected.nonmetalCharge) {
      errorMessages.push(`Incorrect nonmetal charge.`);
    }
  
    if (errorMessages.length > 0) {
      setFormulaFeedback(errorMessages.join(" "));
      await IncorrectResponses({
        studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress,
        masteryLevel, goal, starsEarned,
        setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
      return;
    }
  
    setFormulaFeedback("Correct explicit formula!");
    await CorrectResponses({
      studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress,
      masteryLevel, goal, starsEarned,
      setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
    });
    handleNextStep();
  };
  

  // Step 2: Explicit Name Input.
  const renderStep2 = () => {
    if (currentStep > 2) {
      return (
        <div className="completed-answer">
          <h3>Explicit Name:</h3>
          <p>{currentQuestion ? currentQuestion.explicitName : ""}</p>
        </div>
      );
    }
    if (currentStep === 2) {
      return (
        <div className="step-section">
          <h2>Step 3: Enter the Explicit Name</h2>
          <input
            type="text"
            className="lesson-nine-point-nine-input"
            value={explicitNameInput}
            onChange={(e) => setExplicitNameInput(e.target.value)}
            placeholder="e.g., one sodium ion, one chloride ion"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && explicitNameInput.trim() !== '') {
                handleSubmitExplicitName();
              }
            }}
          />
          <button className="lesson-nine-point-nine-submit" onClick={handleSubmitExplicitName}>
            Submit Explicit Name
          </button>
          {explicitNameFeedback && <div className="feedback">{explicitNameFeedback}</div>}
        </div>
      );
    }
    return null;
  };

  const handleSubmitExplicitName = async () => {
    if (!currentQuestion) return;
    if (explicitNameInput.trim().toLowerCase() === currentQuestion.explicitName.toLowerCase()) {
      setExplicitNameFeedback("Correct explicit name!");
      await CorrectResponses({
        studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress,
        masteryLevel, goal, starsEarned,
        setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
      handleNextStep();
    } else {
      setExplicitNameFeedback("Incorrect explicit name. Please check your wording.");
      await IncorrectResponses({
        studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress,
        masteryLevel, goal, starsEarned,
        setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
    }
  };

  // Step 3: Removal Selection.
  const renderStep3 = () => {
    if (currentStep > 3) {
      // Once completed, show the resulting phrase (which should match the implicit name)
      return (
        <div className="completed-answer">
          <h3>After Removal:</h3>
          <p>{currentQuestion ? currentQuestion.implicitName : ""}</p>
        </div>
      );
    }
    if (currentStep === 3) {
      return (
        <div className="step-section">
          <h2>Step 4: Select Words to Remove</h2>
          <p className="lesson-nine-point-nine-prompt">
            The explicit name is: <em>{currentQuestion ? currentQuestion.explicitName : ""}</em>
          </p>
          <div className="phrase-container">
            {explicitNameWords.map((word, index) => (
              <span
                key={index}
                className={`phrase-word ${selectedIndices.includes(index) ? "selected" : ""}`}
                onClick={() => {
                  if (selectedIndices.includes(index)) {
                    setSelectedIndices(selectedIndices.filter(i => i !== index));
                  } else {
                    setSelectedIndices([...selectedIndices, index]);
                  }
                }}
              >
                {word}{" "}
              </span>
            ))}
          </div>
          <button className="lesson-nine-point-nine-submit" onClick={handleSubmitRemoval}>
            Submit Removal Selection
          </button>
          {removalFeedback && <div className="feedback">{removalFeedback}</div>}
        </div>
      );
    }
    return null;
  };

  const handleSubmitRemoval = async () => {
    const sortedSelected = [...selectedIndices].sort((a, b) => a - b);
    const sortedExpected = [...expectedRemovalIndices].sort((a, b) => a - b);
    if (JSON.stringify(sortedSelected) === JSON.stringify(sortedExpected)) {
      setRemovalFeedback("Correct removal!");
      handleNextStep();
    } else {
      setRemovalFeedback("Incorrect selection. Remove the number words and 'ion/ions' to yield the compound name.");
      await IncorrectResponses({
        studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress,
        masteryLevel, goal, starsEarned,
        setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
    }
  };

  // Step 4: Implicit Name Input.
  const renderStep4 = () => {
    if (currentStep > 4) {
      return (
        <div className="completed-answer">
          <h3>Implicit Name:</h3>
          <p>{currentQuestion ? currentQuestion.implicitName : ""}</p>
        </div>
      );
    }
    if (currentStep === 4) {
      return (
        <div className="step-section">
          <h2>Step 5: Enter the Implicit Name</h2>
          <input
            type="text"
            className="lesson-nine-point-nine-input"
            value={implicitNameInput}
            onChange={(e) => setImplicitNameInput(e.target.value)}
            placeholder="e.g., sodium chloride"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && implicitNameInput.trim() !== '') {
                handleSubmitImplicitName();
              }
            }}
          />
          <button className="lesson-nine-point-nine-submit" onClick={handleSubmitImplicitName}>
            Submit Implicit Name
          </button>
          {implicitNameFeedback && <div className="feedback">{implicitNameFeedback}</div>}
        </div>
      );
    }
    return null;
  };

  const handleSubmitImplicitName = async () => {
    if (!currentQuestion) return;
    if (implicitNameInput.trim().toLowerCase() === currentQuestion.implicitName.toLowerCase()) {
      setImplicitNameFeedback("Correct implicit name!");
      await CorrectResponses({
        studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress,
        masteryLevel, goal, starsEarned,
        setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
      handleNextStep();
    } else {
      setImplicitNameFeedback("Incorrect implicit name. Please try again.");
      await IncorrectResponses({
        studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress,
        masteryLevel, goal, starsEarned,
        setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
    }
  };

  // Step 5: Completion message.
  const renderCompletion = () => (
    <div className="completion-message">
      <h2>🎉 Congratulations! 🎉</h2>
      <p>You have successfully completed Lesson 9.9.</p>
      <button className="lesson-nine-point-nine-submit" onClick={handleNextQuestion}>
        Next Question
      </button>
    </div>
  );

  // Reset all step states and move to the next question.
  const handleNextQuestion = () => {
    setMetalSymbolInput("");
    setNonmetalSymbolInput("");
    setMetalQuantityInput("");
    setNonmetalQuantityInput("");
    setMetalChargeInput("");
    setNonmetalChargeInput("");
    setFormulaFeedback("");
    setExplicitNameInput("");
    setExplicitNameFeedback("");
    setSelectedIndices([]);
    setRemovalFeedback("");
    setImplicitNameInput("");
    setImplicitNameFeedback("");
    setCurrentStep(0);
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
    <div className="lesson-nine-point-nine">
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
        <div className="lesson-nine-point-nine-box">
          <div className="lesson-nine-point-nine-box-innercont">
            <div className="lesson-nine-point-nine-box-title">
              <h1>Lesson 9.9: Implicit Formula → Implicit Name</h1>
            </div>
            <div className="lesson-nine-point-nine-content">
              {currentQuestion ? (
                <>
                  {renderStep0()}
                  {renderStep1()}
                  {renderStep2()}
                  {renderStep3()}
                  {renderStep4()}
                  {currentStep === 5 && renderCompletion()}
                </>
              ) : (
                <p>Loading question...</p>
              )}
            </div>
          </div>
        </div>

        {/* Side Column for Progress Tracking */}
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

export default LessonNinePointNine;
