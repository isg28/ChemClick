import React, { useState, useEffect} from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonThreePointOne.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

const LessonThreePointOne = () => {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson3.1'; 
    const [protons, setProtons] = useState([]);
    const electronShells = [2, 8, 8, 2];
    const shellSizes = [120, 180, 240, 300];
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [selectedElement, setSelectedElement] = useState({});
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isNucleusSelected, setIsNucleusSelected] = useState(false);
    const [selectedShellIndex, setSelectedShellIndex] = useState(null);
    const [shellElectrons, setShellElectrons] = useState(new Array(electronShells.length).fill(0));
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
    const displayMedals = starsEarned >= 5;
    const [distribution, setExpectedDistribution] = useState([0, 0, 0, 0]);
    const [submitted, setSubmitted] = useState(false);
    
    const handlequestion = () => {
        navigate('/dashboard');
    };
    const names = [
        { value: "1",  name: 'Hydrogen'},
        { value: "2",  name: 'Helium'},
        { value: "3",  name: 'Lithium'},
        { value: "4",  name: 'Beryllium'},
        { value: "5",  name: 'Boron'},
        { value: "6",  name: 'Carbon'},
        { value: "7",  name: 'Nitrogen'},
        { value: "8",  name: 'Oxygen'},
        { value: "9",  name: 'Fluorine'},
        { value: "10", name: 'Neon'},
        { value: "11", name: 'Sodium'},
        { value: "12", name: 'Magnesium'},
        { value: "13", name: 'Aluminum'},
        { value: "14", name: 'Silicon'},
        { value: "15", name: 'Phosphorous'},
        { value: "16", name: 'Sulfur'},
        { value: "17", name: 'Chlorine'},
        { value: "18", name: 'Argon'},
        { value: "19", name: 'Potassium'},
        { value: "20", name: 'Calcium'}
    ];
    useEffect(() => {
        const randomElement = names[Math.floor(Math.random() * names.length)];
        setSelectedElement(randomElement);
    }, []); 
    
    useEffect(() => {
        if (!userId) { //
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

        }, [selectedElement, userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
            if (progress === 100) {
                setShowCompletionModal(true);
            }
        }, [progress]);
    useEffect(() => {
        if (selectedElement?.value) {
              const atomicNumber = parseInt(selectedElement.value, 10);
               setExpectedDistribution(getExpectedElectronDistribution(atomicNumber));
               setShellElectrons([0, 0, 0, 0]);
               setSubmitted(false);
        }
    }, [selectedElement]);
    
  
  const addElectron = () => {
    if (selectedShellIndex !== null) {
      const currentElectronsInShell = shellElectrons[selectedShellIndex];
      const maxElectronsInShell = electronShells[selectedShellIndex];
      
      if (currentElectronsInShell < maxElectronsInShell) {
        const updatedShellElectrons = [...shellElectrons];
        updatedShellElectrons[selectedShellIndex] = currentElectronsInShell + 1;
        setShellElectrons(updatedShellElectrons);
      }
    }
  };
  
  const removeElectron = () => {
    if (selectedShellIndex !== null) {
      const currentElectronsInShell = shellElectrons[selectedShellIndex];
  
      if (currentElectronsInShell > 0) {
        const updatedShellElectrons = [...shellElectrons];
        updatedShellElectrons[selectedShellIndex] = currentElectronsInShell - 1;
        setShellElectrons(updatedShellElectrons);
      }
    }
  };
  
  const addProton = () => {
    if (protons.length < 20) {
        setProtons([...protons, protons.length + 1]);
      }
  };
  
  const removeProton = () => {
    setProtons(protons.slice(0, -1));
  };

  const handleNucleusClick = () => {
    setIsNucleusSelected(prevState => !prevState);
  
  };

  const handleShellClick = (shellIndex) => {
    setSelectedShellIndex(prevIndex => (prevIndex === shellIndex ? null : shellIndex));
  };

  const getElectronPosition = (shellIndex, electronIndex, shellRadius) => {
    const angle = (electronIndex / electronShells[shellIndex]) * 360;
    const x = shellRadius * Math.cos((angle * Math.PI) / 180);
    const y = shellRadius * Math.sin((angle * Math.PI) / 180);
    return { x, y };
  };

    const getProtonPosition = (protonIndex, radius) => {
    const angle = (protonIndex / protons.length) * 360; 
    const x = radius * Math.cos((angle * Math.PI) / 180); 
    const y = radius * Math.sin((angle * Math.PI) / 180); 
    return { x, y };
  };
  const checkAnswer = async () => {
    const atomicNumber = parseInt(selectedElement.value, 10); 
    const expectedElectrons = atomicNumber;
    const expectedDistribution = getExpectedElectronDistribution(atomicNumber);
    setSubmitted(true);

    if (protons.length !== atomicNumber) {
        setFeedback("Incorrect amount of protons. Edit the Nucleus and Try again!");
        setFeedbackClass('incorrect');
        setIsAnswerCorrect(false);
        await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        });
          return;
        
    }

    const totalElectrons = shellElectrons.reduce((sum, count) => sum + count, 0);
    if (totalElectrons !== expectedElectrons) {
        setFeedback("Incorrect total number of electrons. Look at the selected red shells and try again!");
        setFeedbackClass('incorrect');
        setIsAnswerCorrect(false);
        await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        });
        return;
    }
    setTimeout(() => {
        setFeedback('');
        setFeedbackClass('');
    }, 2000);

    for (let i = 0; i < electronShells.length; i++) {
        if (shellElectrons[i] !== expectedDistribution[i]) {
            setFeedback('Incorrect electron arrangement. look at the red shells (2:8:8:2)');
            setFeedbackClass('incorrect');
            setIsAnswerCorrect(false);
            await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            });
              return;
        }
    }

    setFeedback('Correct!');
    setFeedbackClass('correct');
    setIsAnswerCorrect(true);
    await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
    }); 
    return;
};


const getExpectedElectronDistribution = (atomicNumber) => { 
    let remainingElectrons = atomicNumber;
    
    for (let i = 0; i < electronShells.length; i++) {
        if (remainingElectrons > electronShells[i]) {
            distribution[i] = electronShells[i]; 
            remainingElectrons -= electronShells[i];
        } else {
            distribution[i] = remainingElectrons; 
            break;
        }
    }
    return distribution;
    
};

const handleCheckAnswer = () => { 
    checkAnswer();
}

const nextQuestion = () => {
    const randomElement = names[Math.floor(Math.random() * names.length)];
    setSelectedElement(randomElement);
    setProtons([]);
    setShellElectrons([]);
    setIsAnswerCorrect(false);
    setFeedback('');
    setFeedbackClass('hidden');
    setShellElectrons(new Array(electronShells.length).fill(0));
    setIsNucleusSelected(false);
    setSelectedShellIndex(null);
    setSubmitted(false);
  };

  return (
      
    <div className='lesson-three-point-one'>
        <div className='questionheader'>
            <div className="question-head-in">
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
                    <div className='insideheader'>
                        <h1>ChemClicks Assignments</h1>
                    </div>
                <img src={require('../../assets/question/Home.png')} className='homelines' onClick={() => {handlequestion()}} alt="Home Lines" />
            </div>
        </div>

        <div className="question-page-main">
            <div className='lesson-three-point-one-box'>
                <div className='lesson-three-point-one-box-innercont'>
                    <div className='lesson-three-point-one-box-title'>
                        <h1>Unit Three: Atomic Structure - 2:8:8:2 Pattern</h1>
                    </div>
                    <div className='lesson-three-point-one-content'>
                        <p className='lesson-three-point-one-prompt'>
                            Look at the element <strong>{selectedElement.name}</strong> and add the amount of electrons and protons you think the element requires. 
                        </p>
                        <div className="lesson-three-point-one-cylinder-container">
                            <div className="lesson-three-point-one-cylinderWaterContainer">
                                <div className="bohr-model-section-three-point-one">
                                    <div className="bohr-model-container-three-point-one">
                                    <div data-testid="nucleus-three-point-one" className={`nucleus-three-point-one ${isNucleusSelected ? "selected" : ""}`}onClick={handleNucleusClick} style={{zIndex: 400, transition: 'all 0.2s ease',}}>
                                        <span className="proton-counter-three-point-one" style={{
                                            position: 'absolute', 
                                            color: 'white', 
                                            fontSize: '1.2rem', 
                                            fontWeight: 'bold', 
                                            textAlign: 'center'
                                        }}>
                                            {protons.length}
                                        </span>
                                        {protons.map((_, index) => {
                                            const { x, y } = getProtonPosition(index, 45); 
                                            return (
                                            <motion.div
                                                key={index}
                                                className="proton-three-point-one"
                                                style={{
                                                transform: `translate(${x}px, ${y}px)` 
                                                }}
                                            />
                                            );
                                        })}
                                    </div>
                                    <div className="shells-container-three-point-one" style={{ position: 'relative', width: '100%', height: '100%' }}>
                                        {electronShells.map((_, shellIndex) => {
                                        const shellRadius = shellSizes[shellIndex];
                                        let borderColor = 'rgba(0, 0, 0, 0.3)'; 
    
                                        
                                        if (selectedShellIndex === shellIndex) {
                                            borderColor = 'rgba(0, 0, 255, 0.5)'; 
                                        }
                                        
                                        
                                        if (submitted) {
                                            
                                            if (shellElectrons[shellIndex] === distribution[shellIndex]) {
                                                borderColor = 'rgba(0, 255, 0, 0.7)';
                                            } else {
                                                borderColor = 'rgba(255, 0, 0, 0.7)'; 
                                            }
    }
                                        return (
                                            <div
                                                key={`shell-ring-${shellIndex}`}
                                                data-testid="shell-visual-ring-three-point-one"
                                                className={`shell-visual-ring-three-point-one ${selectedShellIndex === shellIndex ? "selected" : ""}`}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    width: shellRadius * 2,
                                                    height: shellRadius * 2,
                                                    borderRadius: '50%',
                                                    border: `3px solid ${borderColor}`,
                                                    boxShadow: selectedShellIndex === shellIndex ? '0 0 8px rgba(0, 0, 0, 0.5)' : 'none',
                                                    transform: 'translate(-50%, -50%)',
                                                    transition: 'all 0.2s ease',
                                                }}
                                            />
                                        );
                                    })}
                                        
                                        
                                        {electronShells.map((_, shellIndex) => {
                                            const outerRadius = shellSizes[shellIndex];
                                            const innerRadius = shellIndex > 0 ? shellSizes[shellIndex - 1] : 0;
                                            
                                            return (
                                            <div
                                                key={`click-zone-${shellIndex}`}
                                                
                                                onClick={(e) => {
                                                e.stopPropagation();
                                                handleShellClick(shellIndex);
                                                }}
                                                className="shell-click-zone"
                                                data-testid={`shell-click-zone-${shellIndex}`}
                                                style={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                width: outerRadius * 2, 
                                                height: outerRadius * 2,
                                                borderRadius: '50%',
                                                transform: 'translate(-50%, -50%)',
                                                cursor: 'pointer',
                                                clipPath: `circle(${outerRadius}px) not(circle(${innerRadius}px))`,
                                                zIndex: 300 - shellIndex, 
                                                }}
                                            />
                                            );
                                        })}
                                        
                                        
                                        {electronShells.map((maxElectrons, shellIndex) => {
                                            const shellRadius = shellSizes[shellIndex];
                                            const electronsInShell = shellElectrons[shellIndex];
                                            
                                            return electronsInShell > 0 && (
                                            <React.Fragment key={`electrons-shell-${shellIndex}`}>
                                                {Array.from({ length: electronsInShell }).map((_, eIndex) => {
                                                const { x, y } = getElectronPosition(shellIndex, eIndex, shellRadius);
                                                return (
                                                    <motion.div
                                                    key={`electron-three-point-one${shellIndex}-${eIndex}`}
                                                    className="electron-three-point-one"
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                                                        pointerEvents: 'none',
                                                        zIndex: 200,
                                                    }}
                                                    />
                                                );
                                                })}
                                            </React.Fragment>
                                            );
                                        })}
                                        </div>
                                                                            
                                </div>
                                <div className="controls">
                                    <button disabled={selectedShellIndex === null} onClick={addElectron}>Add Electron ({shellElectrons})</button>
                                    <button disabled={selectedShellIndex === null} onClick={removeElectron}>Remove Electron</button>
                                    <button disabled={!isNucleusSelected} onClick={addProton}>Add Proton</button>
                                    <button disabled={!isNucleusSelected} onClick={removeProton}>Remove Proton</button>
                                </div>
                            </div>    
                        </div>                    
                    </div>
                </div>
                <div className="submit-feedback-container-three-point-one">
                                {!isAnswerCorrect ? (<button className='lesson-three-point-one-submit' onClick={handleCheckAnswer}>Submit Answer</button>)
                                    : (<button className='lesson-three-point-one-submit' onClick={nextQuestion}>Next Question</button>
                                                                        )}
              <span className={`lesson-three-point-one-feedback ${feedbackClass}`}>{feedback}</span>
            </div>
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
                        <div className='side-column-box-title'>
                            <h1>Goal</h1>
                        </div>
                        <div className='side-column-box-info'>
                            {renderGoalChecks(goal, correctAnswers)}
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
                        </div>
                    </div>
                </div>
            
    
    
    );
};
export default LessonThreePointOne;
