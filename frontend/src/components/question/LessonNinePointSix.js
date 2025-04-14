import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonNinePointSix.css';
import { useNavigate } from 'react-router-dom';
import { renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses } from './LessonUtils';

function LessonNinePointSix() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('studentId'); 
  const teacherId = localStorage.getItem('teacherId'); 
  
  const isTeacher = !!teacherId; 
  const userId = isTeacher ? teacherId : studentId;   
  const lessonId = 'lesson9.6';

  // State for progress tracking
  const [goal, setGoal] = useState();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [progress, setProgress] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);
  const displayMedals = starsEarned >= 5;

  // Questions array: each question provides an implicit phrase.
  // You can add additional questions to this array as needed.
  const questions = [
    { implicit: "one sodium ion one chloride ion" },
    { implicit: "two potassium ion one bromide ion" }, 
    { implicit: "one calcium ion one oxide ion" },
    { implicit: "one magnesium ion two oxide ion" },
    { implicit: "three aluminum ion one oxide ion" },
    { implicit: "one copper ion two chloride ion" },
    { implicit: "two silver ion one nitrate ion" },
    { implicit: "one zinc ion two oxide ion" },
    { implicit: "two lead ion one iodide ion" },
    { implicit: "one cobalt ion one phosphate ion" },
    { implicit: "two nickel ion one sulfide ion" },
    { implicit: "one manganese ion two permanganate ion" },
    { implicit: "one barium ion one sulfate ion" },
    { implicit: "two lithium ion one oxide ion" },
    { implicit: "one ammonium ion one chloride ion" }// additional examples...
  ];

  // Shuffle questions similar to LessonEightPointOne
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

  // For the current question, extract the implicit phrase and compute its parts.
  const currentQuestion = randomizedQuestions[currentQuestionIndex];
  let implicitPhrase = "";
  let words = [];
  let explicitName = "";
  let correctRemovalIndices = [];
  // List of quantity words to be removed.
  const quantityWords = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

  if (currentQuestion) {
    implicitPhrase = currentQuestion.implicit;
    words = implicitPhrase.split(" ");
    explicitName = words
      .filter(word => {
        const lower = word.toLowerCase();
        return !(quantityWords.includes(lower) || lower === "ion");
      })
      .join(" ");
    correctRemovalIndices = words.reduce((acc, word, index) => {
      const lower = word.toLowerCase();
      if (quantityWords.includes(lower) || lower === "ion") {
        acc.push(index);
      }
      return acc;
    }, []);
  }

  // States for the interactive phases:
  // "removal" phase: user clicks words to remove.
  // "typing" phase: user types the explicit name.
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

  // Handler: Toggle word selection during removal phase.
  const toggleWordSelection = (index) => {
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
    if (JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)) {
      setRemovalFeedback("Correct removal!");
      setPhase("typing");
    } else {
      setRemovalFeedback("You must remove both words that describe numbers (one, two, three, etc) as well as the word 'ion'.");
      await IncorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal, starsEarned, 
                setIncorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      });
    }
  };

  // Validate the text answer in the typing phase.
  const handleTextSubmit = async () => {
    if (textAnswer.trim().toLowerCase() === explicitName.toLowerCase()) {
      setTextFeedback("Correct!");
      await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
      }); 
      // Brief delay before moving to the next question
      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    } else {
      setTextFeedback("Incorrect. Please try again.");
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
    <div className="lesson-nine-point-six">
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
        <div className="lesson-nine-point-six-box">
          <div className="lesson-nine-point-six-box-innercont">
            <div className="lesson-nine-point-six-box-title">
              <h1>Lesson 9.6: Implicit to Explicit Naming</h1>
            </div>
            <div className="lesson-nine-point-six-content">
              {currentQuestion ? (
                <>
                  {phase === "removal" && (
                    <>
                      <p className="lesson-nine-point-six-prompt">
                        Click on the words you want to remove to form the explicit name.
                      </p>
                      <div className="phrase-container">
                        {words.map((word, index) => (
                          <span
                            key={index}
                            className={`phrase-word ${selectedIndices.includes(index) ? "selected" : ""}`}
                            onClick={() => toggleWordSelection(index)}
                          >
                            {word}{index !== words.length - 1 && " "}
                          </span>
                        ))}
                      </div>
                      <button className="lesson-nine-point-six-submit" onClick={handleRemovalSubmit}>
                        Submit Selection
                      </button>
                      {removalFeedback && <div className="feedback">{removalFeedback}</div>}
                    </>
                  )}
                  {phase === "typing" && (
                    <>
                      <p className="lesson-nine-point-six-prompt">
                        Now, type in the explicit name.
                      </p>
                      {/* Display the leftover words as a reference */}
                      <p className="explicit-display">Resulting phrase: {explicitName}</p>
                      <input
                        type="text"
                        className="lesson-nine-point-six-input"
                        value={textAnswer}
                        onChange={(e) => setTextAnswer(e.target.value)}
                        placeholder="Enter the explicit name"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && textAnswer.trim() !== '') {
                            handleTextSubmit();
                          }
                        }}
                      />
                      <button className="lesson-nine-point-six-submit" onClick={handleTextSubmit}>
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

        {/* Side column for mastery and goal tracking */}
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
          {/* Next Lesson button positioned below the Goals box */}
          <div className="next-lesson-button-container" style={{ marginTop: '20px' }}>
                        <button 
                            className="next-lesson-button" 
                            onClick={() => navigate('/lessonninepointseven')}
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

export default LessonNinePointSix;