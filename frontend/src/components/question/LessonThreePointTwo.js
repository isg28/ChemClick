import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonThreePointTwo.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonThreePointTwo() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson3.2'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    const displayMedals = starsEarned >= 5;

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const names = [
        { value: "1",  name: 'Hydrogen', imagepath: 'Hydrogen.png', atomicnumber: 1},
        { value: "2",  name: 'Helium', imagepath: 'Helium.png', atomicnumber:  2},
        { value: "1",  name: 'Lithium', imagepath: 'Lithium.png', atomicnumber: 3},
        { value: "2",  name: 'Beryllium', imagepath: 'Beryllium.png', atomicnumber: 4},
        { value: "3",  name: 'Boron', imagepath: 'Boron.png', atomicnumber: 5},
        { value: "4",  name: 'Carbon', imagepath: 'Carbon.png', atomicnumber: 6},
        { value: "5",  name: 'Nitrogen', imagepath: 'Nitrogen.png', atomicnumber: 7},
        { value: "6",  name: 'Oxygen', imagepath: 'Oxygen.png', atomicnumber: 8},
        { value: "7",  name: 'Fluorine', imagepath: 'Fluorine.png', atomicnumber: 9},
        { value: "8", name: 'Neon', imagepath: 'Neon.png', atomicnumber: 10},
        { value: "1", name: 'Sodium', imagepath: 'Sodium.png', atomicnumber: 11},
        { value: "2", name: 'Magnesium', imagepath: 'Magnesium.png', atomicnumber: 12},
        { value: "3", name: 'Aluminum', imagepath: 'Aluminum.png', atomicnumber: 13},
        { value: "4", name: 'Silicon', imagepath: 'Silicon.png', atomicnumber: 14},
        { value: "5", name: 'Phosphorous', imagepath: 'Phosphorous.png', atomicnumber: 15},
        { value: "6", name: 'Sulfur', imagepath: 'Sulfur.png', atomicnumber: 16},
        { value: "7", name: 'Chlorine', imagepath: 'Chlorine.png', atomicnumber: 17},
        { value: "8", name: 'Argon', imagepath: 'Argon.png', atomicnumber: 18},
        { value: "1", name: 'Potassium', imagepath: 'Potassium.png', atomicnumber: 19},
        { value: "2", name: 'Calcium', imagepath: 'Calcium.png', atomicnumber: 20},
        
    ];
    
    const shellRadii = [42, 61, 80, 97];

    const electronPositions = {
        Hydrogen: [{x:"48.7%", y:"30.3%"}],
        Helium: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"},
          ],
          Lithium: [
            
            {x:"26.26%", y: "44.29%"},
          ],
         Beryllium: [
            
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
          ],
          Boron: [
            
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
          ],
          Carbon: [
             
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
          ],
          Nitrogen: [
             
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
          ],
         Oxygen: [
            
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
          ],
          Fluorine: [
            
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
          ],
          Neon: [
            
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
          ],

          Sodium: [
            
            {x:"51.1%", y: "15.8%"},
          ],

          Magnesium: [
            
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"}
          ],
          Aluminum: [
            
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
          ],
           Silicon: [
            
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
          ],
          Phosphorous: [
            
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
          ],
          Sulfur: [
            
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
            {x:"78.4%", y: "49.6%"},
          ],
          Chlorine: [
            
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
            {x:"78.4%", y: "49.6%"},
            {x:"51.1%", y: "77.8%"},
          ],
          Argon: [
            
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
            {x:"78.4%", y: "49.6%"},
            {x:"51.1%", y: "77.8%"},
            {x:"46.2%", y: "77.8%"},
          ],
          Potassium: [
            
            {x:"46.7%", y: "8.7%"},
          ],
          Calcium: [
            
            {x:"46.7%", y: "8.7%"},
            {x:"51.4%", y: "8.8%"},
          ],
    };
    const questions = names.map(pos => ({
        value: pos.value,
        nameType: pos.name,
        imagepath: pos.imagepath,
        atomicnumber: pos.atomicnumber
    }));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const currentElement = randomizedQuestions[currentQuestionIndex] || {};
    const predefinedPositions = electronPositions[currentElement.nameType] || [];
    const [selectedElectrons, setSelectedElectrons] = useState([]);
    const [electronCount, setElectronCount] = useState(0);
    const [highlightedShell, setHighlightedShell] = useState(null);


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
        const shuffleQuestions = () => {
            let shuffled = [...questions];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        setRandomizedQuestions(shuffleQuestions());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentQuestionIndex, userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
      if (progress === 100) {
        setShowCompletionModal(true);
      }
    }, [progress]); 

    const handleElectronClick = (index) => {
        setSelectedElectrons((prev) => {
            const isSelected = prev.includes(index);
            const newSelected = isSelected 
                ? prev.filter((i) => i !== index) 
                : [...prev, index];
            setElectronCount(newSelected.length);
            
            return newSelected;
        });
    };
    const determineShell = (name, atomicnumber) => {
      if (["Hydrogen", "Helium"].includes(name)) return 1;
      if (["Lithium", "Beryllium", "Boron", "Carbon", "Nitrogen", "Oxygen", "Fluorine", "Neon"].includes(name)) {
          return atomicnumber <= 2 ? 1 : 2;
      }
      if (["Sodium", "Magnesium", "Aluminum", "Silicon", "Phosphorous", "Sulfur", "Chlorine", "Argon"].includes(name)) {
          return atomicnumber  <= 2 ? 1 : atomicnumber  <= 10 ? 2 : 3;
      }
      return atomicnumber  <= 2 ? 1 : atomicnumber  <= 10 ? 2 : atomicnumber  <= 18 ? 3 : 4;
  };
  
  
    const validateAnswer = async () => {
        const correctAnswer = parseInt(randomizedQuestions[currentQuestionIndex].value);
        
        if (electronCount === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            
            setHighlightedShell(null);
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
            return;
        }
       let incorrectShell = determineShell(currentElement.nameType, currentElement.atomicnumber);
       if (electronCount < correctAnswer) {
        incorrectShell = determineShell(currentElement.nameType, currentElement.atomicnumber);
    } else if (electronCount > correctAnswer) {
        incorrectShell = determineShell(currentElement.nameType, currentElement.atomicnumber);
    }
        setHighlightedShell(incorrectShell)
        setFeedback("Incorrect. Valence electrons are the electrons inside the valence shell");
        setFeedbackClass('incorrect');
        
        
        await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
        });
        setTimeout(() => {
            setFeedback('');
            setFeedbackClass('');
        }, 3000);
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setFeedback('');
            setFeedbackClass('hidden');
            setIsAnswerCorrect(false);
            setSelectedElectrons([]); 
            setElectronCount(0); 
            setHighlightedShell(null);
        }
    };
    
    return (
    <div className='lesson-three-point-two'>
      <div className='questionheader'>
        <div className="question-head-in">
          <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' alt="Chem Click Logo" />
          <div className='insideheader'>
            <h1>ChemClicks Assignments</h1>
          </div>
          <img src={require('../../assets/question/Home.png')} className='homelines' onClick={() => { handlequestion() }} alt="Home Lines" />
        </div>
      </div>

      <div className="question-page-main">
        <div className='lesson-three-point-two-box'>
          <div className='lesson-three-point-two-box-innercont'>
            <div className='lesson-three-point-two-box-title'>
              <h1>Unit Three: Atomic Structure - Valence Electrons</h1>
            </div>
            <div className='lesson-three-point-two-content'>
              <p className='lesson-three-point-two-prompt'>
                Look at the Bohr Model for the element <strong>{randomizedQuestions[currentQuestionIndex]?.nameType}</strong>. Click on each valence electron, until all the valence electrons are purple 
              </p>
              <div className="lesson-three-point-two-bohr-container">
                  <div className="lesson-three-point-two-bohrmodelcontainer">       
                  {randomizedQuestions[currentQuestionIndex] && (
                    <img 
                      src={require(`../../assets/question/${randomizedQuestions[currentQuestionIndex].imagepath}`)}
                      className="lesson-three-point-two-cylinder"
                      alt={`${randomizedQuestions[currentQuestionIndex].nameType} structure`} 
                    />
                  )}
                  <svg
                    viewBox="0 0 250 258"
                    style={{ 
                      position: "absolute", 
                      top: 0, 
                      left: 0, 
                      width: "100%", 
                      height: "100%", 
                      pointerEvents: "none"
                    }}
                  >
                    {shellRadii.map((radius, index) => (
                      <circle
                        key={index}
                        cx="125"
                        cy="125"
                        r={radius}
                        fill="none"
                        stroke={highlightedShell === index + 1 ? "red" : "clear"}
                        strokeWidth={highlightedShell === index + 1 ? 2 : 2} 
                        data-testid="highlighted-shell"
                        className={highlightedShell === index + 1 ? "highlighted-shell" : ""}
                      />
                    ))}
                  </svg>
                </div>
                  
                <div className="electron-container-three-point-two ">
                  {predefinedPositions.map((pos, index) => (
                    <div
                      key={index}
                      data-testid="electron-three-point-two"
                      className={`electron-three-point-two ${selectedElectrons.includes(index) ? "selected" : ""}`}
                      style={{ left: pos.x, top: pos.y, zIndex: 200}}
                      onClick={() => handleElectronClick(index)}
                    ></div>
                  ))}
                </div>
                </div>
            
            <div data-testid="lesson-three-point-two-feedback" className={`lesson-three-point-two-feedback ${feedbackClass}`}>{feedback}</div>
            <div className="submit-feedback-container-three-point-two">
              {!isAnswerCorrect ? (
                <button className='lesson-three-point-two-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
              ) : (
                <button className='lesson-three-point-two-next' onClick={handleNextQuestion}>Next Question</button>
              )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
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

export default LessonThreePointTwo;
