import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonNinePointOne.css';  
import '../../styles/question/LessonNinePointSix.css';   
import '../../styles/question/LessonNinePointFour.css'; 
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from './LessonUtils';

// Ion images
import PositiveIon from "../../assets/question/+1ioncomb-transparent.png";
import NegativeIon from "../../assets/question/-1ioncomb-transparent.png";
import PositiveIon2 from "../../assets/question/+2ioncomb-transparent.png";
import NegativeIon2 from "../../assets/question/-2ioncomb-transparent.png";
import PositiveIon3 from "../../assets/question/+3ioncomb-transparent.png";
import NegativeIon3 from "../../assets/question/-3ioncomb-transparent.png";

// Ion data mapping
const ionData = {
    "+1": { charge: 1, symbol: "Na", name: "sodium" },
    "+2": { charge: 2, symbol: "Mg", name: "magnesium" },
    "+3": { charge: 3, symbol: "Al", name: "aluminum" },
    "-1": { charge: 1, symbol: "Cl", name: "chloride" },
    "-2": { charge: 2, symbol: "O", name: "oxide" },
    "-3": { charge: 3, symbol: "N", name: "nitride" },
  };

const ionImages = {
  "+1": PositiveIon,
  "+2": PositiveIon2,
  "+3": PositiveIon3,
  "-1": NegativeIon,
  "-2": NegativeIon2,
  "-3": NegativeIon3,
};

const ItemType = "ION";

// Helper function to convert numbers to subscript
function toSubscript(num) {
  const subscripts = { '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉' };
  return String(num).split('').map(d => subscripts[d]).join('');
}

// Compute compound data given the dropped ions.
function computeCompoundData(droppedIons) {
    const cations = droppedIons.filter(ion => ion.ionType.startsWith("+"));
    const anions = droppedIons.filter(ion => ion.ionType.startsWith("-"));
    if (cations.length === 0 || anions.length === 0) return null;
    const cationType = cations[0].ionType;
    if (!cations.every(ion => ion.ionType === cationType)) return null;
    const anionType = anions[0].ionType;
    if (!anions.every(ion => ion.ionType === anionType)) return null;
    const cationData = ionData[cationType];
    const anionData = ionData[anionType];
    if (!cationData || !anionData) return null;
    const cationCount = cations.length;
    const anionCount = anions.length;
    if (cationCount * cationData.charge !== anionCount * anionData.charge) return null;
    const commonDivisor = gcd(cationData.charge, anionData.charge);
    const baseCationCount = anionData.charge / commonDivisor;
    const baseAnionCount = cationData.charge / commonDivisor;
    if (cationCount % baseCationCount !== 0 || anionCount % baseAnionCount !== 0) return null;
    const k1 = cationCount / baseCationCount;
    const k2 = anionCount / baseAnionCount;
    if (k1 !== k2) return null;
    const k = k1;
    const cationChargeSymbol = cationData.charge > 0 ? "+" : "-";
    const anionChargeSymbol = anionData.charge > 0 ? "-" : "+";
    const explicitFormula = `${cationData.symbol}^(${cationChargeSymbol})${toSubscript(cationCount)} ${anionData.symbol}^(${anionChargeSymbol})${toSubscript(anionCount)}`;
    const implicitFormula = `${cationData.symbol}${cationCount > 1 ? cationCount : ''}${anionData.symbol}${anionCount > 1 ? anionCount : ''}`;
    return { explicitFormula, implicitFormula,
             cationSymbol: cationData.symbol, cationCharge: cationChargeSymbol, cationCount,
             anionSymbol: anionData.symbol, anionCharge: anionChargeSymbol, anionCount };
  }
  
  function gcd(a, b) {
    return b ? gcd(b, a % b) : a;
  }
  

// DraggableIon Component
const DraggableIon = ({ ionType, src }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { ionType, src },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));
  return (
    <img
      ref={drag}
      src={src}
      className="ion-comb-image"
      style={{ width: '50px', height: '50px', opacity: isDragging ? 0.5 : 1, cursor: 'grab', margin: '5px' }}
    />
  );
};

// DropZone Component
const DropZone = ({ droppedIons, onDrop, onRemoveIon }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(item),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));
  return (
    <div
      ref={drop}
      className="drop-zone"
      style={{ 
        width: "220px", 
        height: "220px", 
        border: "2px dashed gray", 
        backgroundColor: isOver ? "#d3f9d8" : "#f0f0f0",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        flexDirection: "column",
        position: "relative"
     }}
    >
     {droppedIons.length === 0 ? (
        <p>Drop Ions Here</p>
      ) : (
        droppedIons.map((ion, index) => (
          <div key={index} style={{ position: 'relative', margin: '3px' }}>
            <img
              src={ion.src}
              alt={`Dropped Ion ${ion.ionType}`}
              className="dropped-ion-image"
              style={{ width: "70px", height: "70px" }}
            />
            <button
              onClick={() => onRemoveIon(index)}
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </div>
        ))
      )}
    </div>
  );
};

// Main Lesson Component
function LessonNinePointFour() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId'); 
  const teacherId = localStorage.getItem('teacherId'); 

  const isTeacher = !!teacherId; 
  const userId = isTeacher ? teacherId : studentId; 
  const lessonId = 'lesson9.4';

  const [goal, setGoal] = useState();
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);


    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0);
    const [masteryLevel, setMasteryLevel] = useState(0);
    const [showCompletionModal, setShowCompletionModal] = useState(false);
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5;

    const [currentStep, setCurrentStep] = useState(0);

  const [droppedIons, setDroppedIons] = useState([]);
  const [compoundResult, setCompoundResult] = useState(null);
  const [compoundFeedback, setCompoundFeedback] = useState("");
  const [implicitFormulaInput, setImplicitFormulaInput] = useState("");
  const [textFeedback, setTextFeedback] = useState("");

  const [cationSymbolInput, setCationSymbolInput] = useState("");
    const [cationChargeInput, setCationChargeInput] = useState("");
    const [cationCountInput, setCationCountInput] = useState("");
    const [anionSymbolInput, setAnionSymbolInput] = useState("");
    const [anionChargeInput, setAnionChargeInput] = useState("");
    const [anionCountInput, setAnionCountInput] = useState("");

    const handleHomeClick = () => {
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

    const handleDrop = (item) => {
            setDroppedIons(prev => [...prev, item]);
          };

  const handleRemoveIon = (index) => {
    setDroppedIons(prev => prev.filter((_, i) => i !== index));
  };

 const handleSubmitCompound = async () => {
     const data = computeCompoundData(droppedIons);
     if (data) {
       setCompoundResult(data);
       setCompoundFeedback("Compound assembled correctly!");
       setCurrentStep(1);
     } else {
       setCompoundFeedback("Invalid compound. Use one type of cation and one type of anion in the correct ratio for neutrality.");
       await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                 setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
       });
     }
   };

  const handleSubmitExplicitFormula = async () => {
      if (!compoundResult) return;
      if (
        cationSymbolInput.trim() === compoundResult.cationSymbol &&
        cationChargeInput.trim() === compoundResult.cationCharge &&
        parseInt(cationCountInput.trim(), 10) === compoundResult.cationCount &&
        anionSymbolInput.trim() === compoundResult.anionSymbol &&
        anionChargeInput.trim() === compoundResult.anionCharge &&
        parseInt(anionCountInput.trim(), 10) === compoundResult.anionCount
      ) {
        setTextFeedback("Correct explicit formula!");
        await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                  setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        }); 
        setCurrentStep(2);
      } else {
        setTextFeedback("Incorrect explicit formula. Check each component carefully.");
        await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                  setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        });
      }
    };

    const handleSubmitImplicitFormula = async () => {
        if (!compoundResult) return;
        if (implicitFormulaInput.trim().toLowerCase() === compoundResult.implicitFormula.toLowerCase()) {
            setTextFeedback("Correct implicit formula!");
            await CorrectResponses({
                userId,
                lessonId,
                isTeacher,
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
    
            // Show the "Next Question" button
            setShowNextQuestion(true);
        } else {
            setTextFeedback("Incorrect implicit formula. Remember: omit charges and any '1's.");
            await IncorrectResponses({
                userId,
                lessonId,
                isTeacher,
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

    const generateNewQuestion = () => {
        // Example: Selecting a new ion pair randomly
        const ionKeys = Object.keys(ionData);
        const randomCation = ionKeys.filter(key => key.startsWith("+"))[Math.floor(Math.random() * ionKeys.filter(k => k.startsWith("+")).length)];
        const randomAnion = ionKeys.filter(key => key.startsWith("-"))[Math.floor(Math.random() * ionKeys.filter(k => k.startsWith("-")).length)];
    
        setDroppedIons([]);
        setCompoundResult(null);
        setTextFeedback("");
        setCompoundFeedback("");
    
        // Set new question
        setCurrentQuestion({ cation: ionData[randomCation], anion: ionData[randomAnion] });
    
        console.log(`New Question: ${ionData[randomCation].symbol} + ${ionData[randomAnion].symbol}`);
    };
    

    const loadNextQuestion = () => {
        setDroppedIons([]);
        setCompoundResult(null);
        setCompoundFeedback("");
        setImplicitFormulaInput("");
        setTextFeedback("");
        setCationSymbolInput("");
        setCationChargeInput("");
        setCationCountInput("");
        setAnionSymbolInput("");
        setAnionChargeInput("");
        setAnionCountInput("");
    
        // Reset progress
        setCurrentStep(0);
        setShowNextQuestion(false); // Hide the button again
    
        // Generate a new question
        generateNewQuestion();
    };
    
    

  return (
    <DndProvider backend={HTML5Backend}>
       <div className="lesson-nine-point-four">
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
          <div className="lesson-nine-point-four-box">
            <div className="lesson-nine-point-four-box-innercont">
              {/* New white background container */}
              <div className="lesson-nine-point-four-content">
                {/* Step 1: Compound Assembly */}
                <div className="step-section">
                  <h2>Step 1: Build the Ionic Compound</h2>
                  {currentStep === 0 && (
                    <>
                      <p className="lesson-nine-point-four-prompt">
                        Drag ion combs into the drop zone so that your compound is neutral.
                      </p>
                      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
                        <DropZone droppedIons={droppedIons} onDrop={handleDrop} onRemoveIon={handleRemoveIon} />
                      </div>
                      <div className="ions-container-bottom" style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
                        {Object.keys(ionImages).map((ionType) => (
                          <DraggableIon key={ionType} ionType={ionType} src={ionImages[ionType]} />
                        ))}
                      </div>
                      <button className="lesson-nine-point-four-submit" onClick={handleSubmitCompound}>
                        Submit Compound
                      </button>
                      {compoundFeedback && <div className="feedback">{compoundFeedback}</div>}
                    </>
                  )}
                  {currentStep > 0 && compoundResult && (
                    <div className="completed-answer">
                      <p><strong>Compound built:</strong> {compoundResult.explicitFormula}</p>
                      <p><em>{compoundResult.implicitFormula}</em></p>
                    </div>
                  )}
                </div>

                <hr className="separator" />

                {/* Step 2: Explicit Formula Input */}
                <div className="step-section">
                  <h2>Step 2: Enter the Explicit Formula</h2>
                  {currentStep === 1 && (
                    <div className="explicit-formula-input-group">
                      <div className="ion-input-group">
                        <label>Cation:</label>
                        <input
                          type="text"
                          value={cationSymbolInput}
                          onChange={(e) => setCationSymbolInput(e.target.value)}
                          placeholder="Symbol"
                        />
                        <input
                          type="text"
                          value={cationChargeInput}
                          onChange={(e) => setCationChargeInput(e.target.value)}
                          placeholder="Charge"
                          className="superscript-input"
                        />
                        <input
                          type="text"
                          value={cationCountInput}
                          onChange={(e) => setCationCountInput(e.target.value)}
                          placeholder="Count"
                          className="subscript-input"
                        />
                      </div>
                      <div className="ion-input-group">
                        <label>Anion:</label>
                        <input
                          type="text"
                          value={anionSymbolInput}
                          onChange={(e) => setAnionSymbolInput(e.target.value)}
                          placeholder="Symbol"
                        />
                        <input
                          type="text"
                          value={anionChargeInput}
                          onChange={(e) => setAnionChargeInput(e.target.value)}
                          placeholder="Charge"
                          className="superscript-input"
                        />
                        <input
                          type="text"
                          value={anionCountInput}
                          onChange={(e) => setAnionCountInput(e.target.value)}
                          placeholder="Count"
                          className="subscript-input"
                        />
                      </div>
                      <button className="lesson-nine-point-four-submit" onClick={handleSubmitExplicitFormula}>
                        Submit Explicit Formula
                      </button>
                      {textFeedback && <div className="feedback">{textFeedback}</div>}
                    </div>
                  )}
                  {currentStep > 1 && (
                    <div className="completed-answer">
                      <p><strong>Explicit Formula:</strong> {compoundResult.explicitFormula}</p>
                    </div>
                  )}
                </div>

                <hr className="separator" />

                {/* Step 3: Implicit Formula Input */}
                <div className="step-section">
                  <h2>Step 3: Enter the Implicit Formula</h2>
                  {currentStep === 2 && (
                    <>
                      <input
                        type="text"
                        className="lesson-nine-point-four-input"
                        value={implicitFormulaInput}
                        onChange={(e) => setImplicitFormulaInput(e.target.value)}
                        placeholder="e.g., NaCl"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && implicitFormulaInput.trim() !== '') {
                            handleSubmitImplicitFormula();
                          }
                        }}
                      />
                      <button className="lesson-nine-point-four-submit" onClick={handleSubmitImplicitFormula}>
                        Submit Implicit Formula
                      </button>
                      {textFeedback && <div className="feedback">{textFeedback}</div>}
                    </>
                  )}
                  {currentStep > 2 && (
                    <div className="completed-answer">
                      <p><strong>Implicit Formula:</strong> {compoundResult.implicitFormula}</p>
                    </div>
                  )}
                </div>

        {textFeedback && <p>{textFeedback}</p>}

        {showNextQuestion && (
    <button 
        className="lesson-nine-point-four-submit" 
        onClick={loadNextQuestion}
        style={{ marginTop: "20px" }}
    >
        Next Question
    </button>
)}

        {currentStep === 5 && (
                          <div className="completion-message">
                            <h2>🎉 Congratulations! 🎉</h2>
                            <p>You have successfully completed Lesson 9.4!</p>
                            <button onClick={handleHomeClick}>Return Home</button>
                          </div>
                        )}
                      </div>
                      {/* End of white background container */}
                    </div>
                  </div>
        
                  <div className="side-column">
                    <div className="side-column-box-holder">
                      <div className="side-column-box masterybox">
                        <div className="side-column-box-title masteryboxtitle">
                          <h1>Mastery</h1>
                        </div>
                        {displayMedals && (
                          <>
                            <div className="reward-box-left" title="Congrats on achieving mastery! Feel free to keep practicing!">
                              🏅
                            </div>
                            <div className="reward-box-right" title="Congrats on achieving mastery! Feel free to keep practicing!">
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
    </DndProvider>
  );
}

export default LessonNinePointFour;
