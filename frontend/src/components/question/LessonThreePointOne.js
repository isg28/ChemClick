import React, { useState, useEffect} from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonThreePointOne.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

const LessonThreePointOne = () => {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson3.1'; 
    const [electrons, setElectrons] = useState([]);
    const [protons, setProtons] = useState([]);
    const electronShells = [2, 8, 8, 2]; // Max electrons per shell
    const shellSizes = [120, 180, 240, 300];
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [selectedElement, setSelectedElement] = useState({});
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const displayMedals = starsEarned >= 5;
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

        }, [selectedElement, studentId, lessonId, navigate]);

        useEffect(() => {
            if (progress === 100) {
                setShowCompletionModal(true);
            }
        }, [progress]);
    
  const addElectron = () => {
    if (electrons.length < 20) {
      setElectrons([...electrons, electrons.length + 1]);
    }
  };
  
  const removeElectron = () => {
    setElectrons(electrons.slice(0, -1));
  };
  
  const addProton = () => {
    if (protons.length < 20) {
        setProtons([...protons, protons.length + 1]);
      }
  };
  
  const removeProton = () => {
    setProtons(protons.slice(0, -1));
  };

  const getShellElectrons = (shellIndex) => {
    let count = 0;
    for (let i = 0; i <= shellIndex; i++) {
      count += electronShells[i] || 0;
    }
    return electrons.length >= count ? electronShells[shellIndex] : Math.max(0, electrons.length - (count - electronShells[shellIndex]));
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
    const correctAnswer = parseInt(selectedElement.value, 10);
    const expectedElectrons = correctAnswer; 

    if (protons.length === correctAnswer && electrons.length === correctAnswer) {
        setIsAnswerCorrect(true);
        setFeedback('Correct!');
        setFeedbackClass('correct');
        await CorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
            setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        }); 
        return;
        
    } 
    else if(protons.length !== correctAnswer && electrons.length !== expectedElectrons){
        setFeedback("Incorrect amount of protons and electrons. Try again!");
        setFeedbackClass('incorrect');
        await IncorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
            setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        });
    }
    else if (protons.length !== correctAnswer) {
        setFeedback("Incorrect amount of protons. Try again!");
        setFeedbackClass('incorrect');
        await IncorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
            setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        });
    }
    else if (electrons.length !== expectedElectrons) {
        setFeedback("Incorrect amount of electrons. Try again!");
        setFeedbackClass('incorrect');
        await IncorrectResponses({studentId, lessonId, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
            setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        });
    }
    setTimeout(() => {
        setFeedback('');
        setFeedbackClass('');
    }, 2000);
};

const nextQuestion = () => {
    const randomElement = names[Math.floor(Math.random() * names.length)];
    setSelectedElement(randomElement);
    setProtons([]);
    setElectrons([]);
    setIsAnswerCorrect(false);
    setFeedback('');
    setFeedbackClass('hidden');

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
                                <div className="bohr-model-section">
                                    <div className="bohr-model-container">
                                    <div className="nucleus">
                                        {protons.map((_, index) => {
                                            const { x, y } = getProtonPosition(index, 45); 
                                            return (
                                            <motion.div
                                                key={index}
                                                className="proton"
                                                style={{
                                                transform: `translate(${x}px, ${y}px)` 
                                                }}
                                            />
                                            );
                                        })}
                                    </div>
                                    <div className="shells">
                                        {electronShells.map((maxElectrons, shellIndex) => {
                                        const shellRadius = shellSizes[shellIndex];
                                        const electronsInShell = getShellElectrons(shellIndex);

                                        return (
                                            <div
                                            key={shellIndex}
                                            className={`shell ${electronsInShell > 0 ? 'active' : 'inactive'}`}
                                            style={{ width: shellRadius * 2, height: shellRadius * 2 }}
                                            >
                                            {Array.from({ length: electronsInShell }).map((_, eIndex) => {
                                                const { x, y } = getElectronPosition(shellIndex, eIndex, shellRadius);
                                                return (
                                                <motion.div
                                                    key={eIndex}
                                                    className="electron-three-point-one"
                                                    style={{
                                                    transform: `translate(0%, 0%) translate(${x}px, ${y}px)`,
                                                    }}
                                                />
                                                );
                                            })}
                                            </div>
                                        );
                                        })}
                                    </div>
                                </div>
                                <div className="controls">
                                    <button onClick={addElectron}>Add Electron</button>
                                    <button onClick={removeElectron}>Remove Electron</button>
                                    <button onClick={addProton}>Add Proton</button>
                                    <button onClick={removeProton}>Remove Proton</button>
                                </div>
                            </div>    
                        </div>                    
                    </div>
                </div>
                <div className="submit-feedback-container">
                                {!isAnswerCorrect ? (<button className='lesson-three-point-two-submit' onClick={checkAnswer}>Check Answer</button>)
                                    : (<button className='lesson-three-point-two-submit' onClick={nextQuestion}>Next Question</button>
                                                                        )}
              <span className={`lesson-three-point-two-feedback ${feedbackClass}`}>{feedback}</span>
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
};
export default LessonThreePointOne;
