import React, { useState, useEffect } from "react";
import '../../styles/question/Question.css';
import {useNavigate } from 'react-router-dom';
import '../../styles/question/Question.css';
import '../../styles/question/LessonOnePointOne.css';
import '../../styles/question/LessonNinePointOne.css';
import '../../styles/question/LessonNinePointTwo.css';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from './LessonUtils';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PositiveIon from "../../assets/question/+1ioncomb-transparent.png";
import NegativeIon from "../../assets/question/-1ioncomb-transparent.png";
import PositiveIon2 from "../../assets/question/+2ioncomb-transparent.png";
import NegativeIon2 from "../../assets/question/-2ioncomb-transparent.png";
import PositiveIon3 from "../../assets/question/+3ioncomb-transparent.png";
import NegativeIon3 from "../../assets/question/-3ioncomb-transparent.png";
import {motion} from "framer-motion";

const ionImages = {
    "+1": PositiveIon,
    "-1": NegativeIon,
    "+2": PositiveIon2,
    "-2": NegativeIon2,
    "+3": PositiveIon3,
    "-3": NegativeIon3,
};

const ItemType = "ION";

// Draggable Ion Component
const DraggableIon = ({ ionType, src }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { ionType, src },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <img
            ref={drag}
            src={src}
            alt={`Ion ${ionType}`}
            className="ion-comb-image"
            style={{ width: '50px', height: '50px', opacity: isDragging ? 0.5 : 1, cursor: 'grab' }}
        />
    );
};

// Drop Zone Component
const DropZone = ({ droppedIons = [], onDrop, onRemoveIon, isFirstZone = false }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemType,
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const handleRemoveIon = (index) => {
        onRemoveIon(index); // Calls the onRemoveIon function passed as prop
    };

    const droppedIonVariants = {
        hidden: { 
            x: -50,
            opacity: 0,
            zIndex: 1000,
        },
        visible: { 
            x:150, 
            opacity: 1,
            transition: { 
                type: "spring", 
                stiffness: 300,
                damping: 20
            }
        }
    };

    const imageSize = droppedIons.length === 1 ? 100 : Math.max(30, 105 - droppedIons.length * 15);
    const baseZIndex = isFirstZone ? 100 : 1;

    return (
        <div
            ref={drop}
            className="drop-zone"
            style={{
                width: "200px",
                height: "200px",
                border: "2px dashed gray",
                backgroundColor: isOver ? "#d3f9d8" : "#f0f0f0",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                padding: "10px",
                flexDirection: "column",
                position: "relative",
                gap: "-5px",
                zIndex: baseZIndex, // Baseline z-index for the drop zone
                overflow: "visible"
            }}
        >
            {droppedIons.length === 0 ? (
                <p>Drop Ions Here</p>
            ) : (
                droppedIons.map((ion, index) => (
                    <motion.div 
                        key={index} 
                        style={{ position: 'relative',
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: "-10px", // Make them touch by fully overlapping
                                marginBottom: "-20px",
                                zIndex: isFirstZone ? 1000 : baseZIndex + 1
                        }}
                        initial="hidden"
                        animate="visible"
                        variants={isFirstZone ? droppedIonVariants : {}}
                    >
                        <img
                            src={ion.src}
                            alt={`Dropped Ion ${ion.ionType}`}
                            className="dropped-ion-image"
                            style={{ width: `${imageSize}px`, // Adjust image size dynamically
                            height: `${imageSize}px`, }}
                        />
                        <button
                            onClick={() => handleRemoveIon(index)}
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
                                zIndex: isFirstZone ? 1001 : baseZIndex + 2 
                            }}
                        >
                        X
                        </button>
                    </motion.div>
                ))
            )}
        </div>
    );
};

const questions = [
    "Using the combs, create the ionic compound between aluminum (Al) and chlorine (Cl). Then write the explicit formula.",
    "Using the combs, create the ionic compound for potassium (K) and oxygen (O). Then write the explicit formula.",
    "Using the combs, create the ionic compound for sodium (Na) and sulfur (S). Then write the explicit formula.",
    "Using the combs, create the ionic compound for calcium (Ca) and fluorine (F). Then write the explicit formula.",
    "Using the combs, create the ionic compound for magnesium (Mg) and nitrogen (N). Then write the explicit formula",
    "Using the combs, create the ionic compound for lithium (Li) and phosphorous (P). Then write the explicit formula.",
    "Using the combs, create the ionic compound for barium (Ba) and bromine (Br). Then write the explicit formula.",
    "Using the combs, create the ionic compound for strontium (Sr) and sulfur (S). Then write the explicit formula.",
    "Using the combs, create the ionic compound for aluminium (Al) and oxygen (O). Then write the explicit formula.",
    "Using the combs, create the ionic compound for cesium (Cs) and selenium (Se). Then write the explicit formula.",
    "Using the combs, create the ionic compound for beryllium (Be) and chlorine (Cl). Then write the explicit formula.",
    "Using the combs, create the ionic compound for zinc (Zn) and iodine (I). Then write the explicit formula.",
    "Using the combs, create the ionic compound for gallium (Ga) and sulfur (S). Then write the explicit formula."
];

function LessonNinePointTwo(){
    const navigate = useNavigate();

    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('');
    const [ions, setIons] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const [droppedIons1, setDroppedIons1] = useState([]);
    const [droppedIons2, setDroppedIons2] = useState([]);
    const [canSubmit, setCanSubmit] = useState(false);
    const [questionText, setQuestionText] = useState('');  // Add state for question text

    // Track formula input states
    const [formulaInputs, setFormulaInputs] = useState({
        base1: "",
        base2: "",
        super1: "",
        super2: "",
        sub1: "",
        sub2: ""
    });

    // Track which inputs are unlocked
    const [unlockedInputs, setUnlockedInputs] = useState({
        base1: true,    // First base is initially unlocked
        base2: false,
        super1: false,
        super2: false,
        sub1: false,
        sub2: false
    });

    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson9.2'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5;

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

        setQuestionText(questions[Math.floor(Math.random() * questions.length)]);
    }, [userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

    // Handle input changes and progressive unlocking
    const handleInputChange = (field, value) => {
        // Update the input value
        setFormulaInputs(prev => ({
            ...prev,
            [field]: value
        }));

        // Logic for unlocking next fields
        if (field === 'base1' && value.trim() !== '') {
            setUnlockedInputs(prev => ({ ...prev, base2: true }));
        }
        else if (field === 'base2' && value.trim() !== '') {
            setUnlockedInputs(prev => ({ ...prev, super1: true }));
        }
        else if (field === 'super1' && value.trim() !== '') {
            setUnlockedInputs(prev => ({ ...prev, super2: true }));
        }
        else if (field === 'super2' && value.trim() !== '') {
            setUnlockedInputs(prev => ({ ...prev, sub1: true }));
        }
        else if (field === 'sub1' && value.trim() !== '') {
            setUnlockedInputs(prev => ({ ...prev, sub2: true }));
        }
    };

    const handleDropZone1 = (item) => {
        // Allow only positive ions in the first drop zone
        if (item.ionType.includes("+")) {
            setDroppedIons1((prev) => [...prev, item]);
        } else {
            setFeedbackMessage("❌ Only positive ions can go here!");
            setFeedbackClass("incorrect-feedback");
            setTimeout(() => setFeedbackMessage(""), 2000);
        }
    };
    
    const handleDropZone2 = (item) => {
        // Allow only negative ions in the second drop zone
        if (item.ionType.includes("-")) {
            setDroppedIons2((prev) => [...prev, item]);
        } else {
            setFeedbackMessage("❌ Only negative ions can go here!");
            setFeedbackClass("incorrect-feedback");
            setTimeout(() => setFeedbackMessage(""), 2000);
        }
    };

    const handleRemoveIonZone1 = (index) => {
        setDroppedIons1((prev) => prev.filter((_, i) => i !== index)); // Remove the ion at the given index
    };

    
    const handleRemoveIonZone2 = (index) => {
        setDroppedIons2((prev) => prev.filter((_, i) => i!== index)); // Remove the ion at the given index
    };


    const getIonTypeFromPath = (path) => {
        // Extract the ion type from the image path, e.g., +3 or -3
        if (path.includes("+3")) return "+3";
        if (path.includes("-3")) return "-3";
        if (path.includes("+2")) return "+2";
        if (path.includes("-2")) return "-2";
        if (path.includes("+1")) return "+1";
        if (path.includes("-1")) return "-1";
        return null;  // Return null if no match
    };

    const resetFormFields = () => {
        setFormulaInputs({
            base1: "",
            base2: "",
            super1: "",
            super2: "",
            sub1: "",
            sub2: ""
        });
        
        setUnlockedInputs({
            base1: true,    // Reset to initial state
            base2: false,
            super1: false,
            super2: false,
            sub1: false,
            sub2: false
        });
    };

    const handleSubmit = () => {
        const correctIons = {
            "Using the combs, create the ionic compound for sodium (Na) and sulfur (S). Then write the explicit formula.": {
                ions: ["+1", "+1", "-2"],
                formula: { base1: "Na", super1: "1+", sub1: "2", base2: "S", super2: "2-", sub2: "1" }
            },
            "Using the combs, create the ionic compound for potassium (K) and oxygen (O). Then write the explicit formula.": {
                ions: ["+1", "+1", "-2"],
                formula: { base1: "K", super1: "1+", sub1: "2", base2: "O", super2: "2-", sub2: "1" }
            },
            "Using the combs, create the ionic compound for calcium (Ca) and fluorine (F). Then write the explicit formula.": {
                ions: ["+2", "-1", "-1"],
                formula: { base1: "Ca", super1: "2+", sub1: "1", base2: "F", super2: "1-", sub2: "2" }
            },
            "Using the combs, create the ionic compound between aluminum (Al) and chlorine (Cl). Then write the explicit formula.": {
                ions: ["+3", "-1", "-1", "-1"],
                formula: { base1: "Al", super1: "3+", sub1: "1", base2: "Cl", super2: "1-", sub2: "3" }
            },
            "Using the combs, create the ionic compound for magnesium (Mg) and nitrogen (N). Then write the explicit formula":{
                "ions": ["+2", "+2", "+2", "-3", "-3"],
                "formula": { base1: "Mg", super1: "2+", sub1: "3", base2:"N", super2:"3-", sub2: "2"}
            },
            "Using the combs, create the ionic compound for lithium (Li) and phosphorous (P). Then write the explicit formula.":{
                "ions": ["+1", "+1", "+1", "-3"],
                "formula": {base1: "Li", super1: "1+", sub1: "3", base2: "P", super2: "3-", sub2: "1"}
            },
            "Using the combs, create the ionic compound for barium (Ba) and bromine (Br). Then write the explicit formula.":{
                "ions":["+2", "-1", "-1"],
                "formula": {base1: "Ba", super1: "2+", sub1: "1", base2: "Br", super2: "1-", sub2: "2"}
            },
            "Using the combs, create the ionic compound for strontium (Sr) and sulfur (S). Then write the explicit formula.":{
                "ions": ["+2", "-2"],
                "formula": {base1: "Sr", super1: "2+", sub1: "1", base2: "S", super2: "2-", sub2: "1"}
            },
            "Using the combs, create the ionic compound for aluminium (Al) and oxygen (O). Then write the explicit formula.":{
                "ions": ["+3", "+3", "-2", "-2", "-2"],
                "formula": {base1: "Al", super1: "3+", sub1: "2", base2: "O", super2: "2-", sub2: "3"}
            },
            "Using the combs, create the ionic compound for cesium (Cs) and selenium (Se). Then write the explicit formula.":{
                "ions": ["+1", "+1" , "-2"],
                "formula": {base1: "Cs", super1: "1+", sub1: "2", base2: "Se", super2: "2-", sub2: "1"}
            },
            "Using the combs, create the ionic compound for beryllium (Be) and chlorine (Cl). Then write the explicit formula.":{
                "ions": ["+2", "-1", "-1"],
                "formula": {base1: "Be", super1: "2+", sub1: "1", base2: "Cl", super2: "1-", sub2: "2"}
            },
            "Using the combs, create the ionic compound for zinc (Zn) and iodine (I). Then write the explicit formula.":{
                "ions": ["+2", "-1", "-1"],
                "formula": {base1: "Zn", super1: "2+", sub1: "1", base2: "I", super2: "1-", sub2: "2"}
            },
            "Using the combs, create the ionic compound for gallium (Ga) and sulfur (S). Then write the explicit formula.":{
                "ions": ["+3", "+3", "-2", "-2", "-2"],
                "formula": {base1: "Ga", super1: "3+", sub1: "2", base2: "S", super2: "2-", sub2: "3"}
            }
        };
    
        const currentQuestion = correctIons[questionText];
        if (!currentQuestion) return;
    
        const userIons = [...droppedIons1, ...droppedIons2].map(ion => ion.ionType).sort();
        const correctIonsSorted = [...currentQuestion.ions].sort();
        const isIonCorrect = JSON.stringify(userIons) === JSON.stringify(correctIonsSorted);
    
        const isFormulaCorrect = 
            formulaInputs.base1 === currentQuestion.formula.base1 &&
            formulaInputs.super1 === currentQuestion.formula.super1 &&
            formulaInputs.sub1 === currentQuestion.formula.sub1 &&
            formulaInputs.base2 === currentQuestion.formula.base2 &&
            formulaInputs.super2 === currentQuestion.formula.super2 &&
            formulaInputs.sub2 === currentQuestion.formula.sub2;
    
        if (isIonCorrect && isFormulaCorrect) {
            setFeedbackMessage("✅ Correct! Great job!");
            setFeedbackClass("correct-feedback");
            setCorrectAnswers(correctAnswers + 1);
            // Generate new question
            setTimeout(() => {
                setQuestionText(questions[Math.floor(Math.random() * questions.length)]);
                setDroppedIons1([]);
                setDroppedIons2([]);
                resetFormFields();
                setFeedbackMessage("");
            }, 1500); // Delay before switching to next question
        } else {
            setFeedbackMessage("❌ Incorrect. Try again!");
            setFeedbackClass("incorrect-feedback");
            setIncorrectAnswers(incorrectAnswers + 1);
        }
        setTotalAttempts(totalAttempts + 1);
    };
    
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='lesson-one-point-one'>
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
                <div className='lesson-one-point-one-box'>
                    <div className='lesson-one-point-one-box-innercont'>
                        <div className='lesson-one-point-one-box-title'>
                            <h1>Unit Nine: Ionic Compounds</h1>
                        </div>
                        <div className='lesson-one-point-one-content'>
                            <p className='lesson-one-point-one-prompt'>
                                Click and drag the provided combs to make an ionic compound, creating a neutral charge. Drag the appropriate combs into the dropzone with your mouse to create a rectangle, simulating an ionic compound.
                            </p>
                            <div className="lesson-one-point-one-measurement-container">
                                <div className="ions-container-top">
                                <DropZone
                                            onDrop={handleDropZone1}
                                            droppedIons={droppedIons1}
                                            onRemoveIon={handleRemoveIonZone1}
                                            isFirstZone = {true}
                                        />
                                <DropZone
                                            onDrop={handleDropZone2}
                                            droppedIons={droppedIons2}
                                            onRemoveIon={handleRemoveIonZone2}
                                            isFirstZone = {false}
                                        />
                                        
                                </div>
                            {/* Separator */}
                            <div className="separator-line"></div>

                        <div className="ions-container-bottom">
                            {/* Ion combs images */}
                            {Object.keys(ionImages).map((ionType) => (
                                <DraggableIon key={ionType} ionType={ionType} src={ionImages[ionType]} />
                            ))}
                        </div>
                </div>


                            <hr className="separator" />
                            <div className='lesson-one-point-one-question'>
                                <h1> {questionText} </h1>
                                <div className="formula-input-container">
  <div className="formula-row">
    {/* First element group */}
    <div className="element-group">
      {/* Base 1 */}
      <input 
        type="text" 
        className="formula-input base-input" 
        placeholder="Base" 
        value={formulaInputs.base1}
        onChange={(e) => handleInputChange('base1', e.target.value)}
        disabled={!unlockedInputs.base1}
        style={{
          backgroundColor: unlockedInputs.base1 ? 'white' : '#f0f0f0',
          cursor: unlockedInputs.base1 ? 'text' : 'not-allowed',
          borderColor: unlockedInputs.base1 ? '#007bff' : '#ccc'
        }}
      />
      
      {/* Charge and Ion 1 in a column */}
      <div className="exponent-column">
        <input 
          type="text" 
          className="formula-input super-input" 
          placeholder="Charge" 
          value={formulaInputs.super1}
          onChange={(e) => handleInputChange('super1', e.target.value)}
          disabled={!unlockedInputs.super1}
          style={{
            backgroundColor: unlockedInputs.super1 ? 'white' : '#f0f0f0',
            cursor: unlockedInputs.super1 ? 'text' : 'not-allowed',
            borderColor: unlockedInputs.super1 ? '#007bff' : '#ccc'
          }}
        />
        
        <input 
          type="text" 
          className="formula-input sub-input" 
          placeholder="Ion" 
          value={formulaInputs.sub1}
          onChange={(e) => handleInputChange('sub1', e.target.value)}
          disabled={!unlockedInputs.sub1}
          style={{
            backgroundColor: unlockedInputs.sub1 ? 'white' : '#f0f0f0',
            cursor: unlockedInputs.sub1 ? 'text' : 'not-allowed',
            borderColor: unlockedInputs.sub1 ? '#007bff' : '#ccc'
          }}
        />
      </div>
    </div>
    
    {/* Second element group */}
    <div className="element-group">
      {/* Base 2 */}
      <input 
        type="text" 
        className="formula-input base-input" 
        placeholder="Base" 
        value={formulaInputs.base2}
        onChange={(e) => handleInputChange('base2', e.target.value)}
        disabled={!unlockedInputs.base2}
        style={{
          backgroundColor: unlockedInputs.base2 ? 'white' : '#f0f0f0',
          cursor: unlockedInputs.base2 ? 'text' : 'not-allowed',
          borderColor: unlockedInputs.base2 ? '#007bff' : '#ccc'
        }}
      />
      
      {/* Charge and Ion 2 in a column */}
      <div className="exponent-column">
        <input 
          type="text" 
          className="formula-input super-input" 
          placeholder="Charge" 
          value={formulaInputs.super2}
          onChange={(e) => handleInputChange('super2', e.target.value)}
          disabled={!unlockedInputs.super2}
          style={{
            backgroundColor: unlockedInputs.super2 ? 'white' : '#f0f0f0',
            cursor: unlockedInputs.super2 ? 'text' : 'not-allowed',
            borderColor: unlockedInputs.super2 ? '#007bff' : '#ccc'
          }}
        />
        
        <input 
          type="text" 
          className="formula-input sub-input" 
          placeholder="Ion" 
          value={formulaInputs.sub2}
          onChange={(e) => handleInputChange('sub2', e.target.value)}
          disabled={!unlockedInputs.sub2}
          style={{
            backgroundColor: unlockedInputs.sub2 ? 'white' : '#f0f0f0',
            cursor: unlockedInputs.sub2 ? 'text' : 'not-allowed',
            borderColor: unlockedInputs.sub2 ? '#007bff' : '#ccc'
          }}
        />
      </div>
    </div>
  </div>
</div>
                        </div>
                    </div>
                        <div className="submit-feedback-container">
                            <button className='lesson-one-point-one-submit' onClick={handleSubmit}>Submit Answer</button>
                            <div className={`lesson-one-point-one-feedback ${feedbackClass}`}>
                            <p>{feedbackMessage}</p>
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
    </DndProvider>
        
    );
}

export default LessonNinePointTwo;