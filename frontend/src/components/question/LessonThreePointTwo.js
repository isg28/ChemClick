import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonThreePointTwo.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonThreePointTwo() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const lessonId = 'lesson3.2'; 
        
    const [goal, setGoal] = useState(); 
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0); 
    const [masteryLevel, setMasteryLevel] = useState(0); 
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const handlequestion = () => {
        navigate('/dashboard');
    };

    const names = [
        { value: "1",  name: 'Hydrogen', imagepath: 'Hydrogen.png'},
        { value: "2",  name: 'Helium', imagepath: 'Helium.png' },
        { value: "3",  name: 'Lithium', imagepath: 'Lithium.png'},
        { value: "4",  name: 'Beryllium', imagepath: 'Beryllium.png'},
        { value: "5",  name: 'Boron', imagepath: 'Boron.png'},
        { value: "6",  name: 'Carbon', imagepath: 'Carbon.png'},
        { value: "7",  name: 'Nitrogen', imagepath: 'Nitrogen.png'},
        { value: "8",  name: 'Oxygen', imagepath: 'Oxygen.png'},
        { value: "9",  name: 'Fluorine', imagepath: 'Fluorine.png'},
        { value: "10", name: 'Neon', imagepath: 'Neon.png'},
        { value: "11", name: 'Sodium', imagepath: 'Sodium.png'},
        { value: "12", name: 'Magnesium', imagepath: 'Magnesium.png'},
        { value: "13", name: 'Aluminum', imagepath: 'Aluminum.png'},
        { value: "14", name: 'Silicon', imagepath: 'Silicon.png'},
        { value: "15", name: 'Phosphorous', imagepath: 'Phosphorous.png'},
        { value: "16", name: 'Sulfur', imagepath: 'Sulfur.png'},
        { value: "17", name: 'Chlorine', imagepath: 'Chlorine.png'},
        { value: "18", name: 'Argon', imagepath: 'Argon.png'},
        { value: "19", name: 'Potassium', imagepath: 'Potassium.png'},
        { value: "20", name: 'Calcium', imagepath: 'Calcium.png'},
        
    ];

    const electronPositions = {
        Hydrogen: [{x:"48.7%", y:"30.3%"}],
        Helium: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"},
          ],
          Lithium: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
          ],
         Beryllium: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
          ],
          Boron: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
          ],
          Carbon: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
          ],
          Nitrogen: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
          ],
         Oxygen: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
          ],
          Fluorine: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
          ],
          Neon: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
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
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
          ],

          Magnesium: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"}
          ],
          Aluminum: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
          ],
           Silicon: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
          ],
          Phosphorous: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
          ],
          Sulfur: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
            {x:"78.4%", y: "49.6%"},
          ],
          Chlorine: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
            {x:"46.3%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
            {x:"78.4%", y: "49.6%"},
            {x:"51.1%", y: "77.8%"},
          ],
          Argon: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
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
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
            {x:"46.4%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
            {x:"78.4%", y: "49.6%"},
            {x:"51.1%", y: "77.8%"},
            {x:"46.2%", y: "77.8%"},
            {x:"46.7%", y: "8.7%"},
          ],
          Calcium: [
            {x:"48.7%", y:"30.3%"},
            {x:"48.6%", y: "64.3%"}, 
            {x:"26.26%", y: "44.29%"},
            {x:"26.2%", y: "49.4%"},
            {x:"46.1%", y: "71%"},
            {x:"51%", y: "71%"},
            {x:"71.5%", y: "49.4%"},
            {x:"71.5%", y: "44.5%"},
            {x:"46.3%", y: "23%"},
            {x:"51%", y: "23%"},
            {x:"51.1%", y: "15.8%"},
            {x:"46.4%", y: "15.8%"},
            {x:"19.3%", y: "44.4%"},
            {x:"19.3%", y: "49.4%"},
            {x:"78.4%", y: "44.5%"},
            {x:"78.4%", y: "49.6%"},
            {x:"51.1%", y: "77.8%"},
            {x:"46.2%", y: "77.8%"},
            {x:"46.7%", y: "8.7%"},
            {x:"51.4%", y: "8.8%"},
          ],
    };
    const questions = names.map(pos => ({
        value: pos.value,
        nameType: pos.name,
        imagepath: pos.imagepath
    }));

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [randomizedQuestions, setRandomizedQuestions] = useState([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [feedbackClass, setFeedbackClass] = useState('hidden');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [lastDigitAttempts, setLastDigitAttempts] = useState(0); 
    const currentElement = randomizedQuestions[currentQuestionIndex] || {};
    const predefinedPositions = electronPositions[currentElement.nameType] || [];
    const [selectedElectrons, setSelectedElectrons] = useState([]);
    const [electronCount, setElectronCount] = useState(0);

    useEffect(() => {
        if (!studentId) {
            console.error('Student ID not found');
            navigate('/login'); // Redirect to login if studentId is missing
        return;
        }
        
        const initializeData = async () => {
            await fetchLessonData(lessonId, setGoal);
            await fetchLessonProgress(studentId, lessonId, {
                setCorrectAnswers,
                setProgress,
                setMasteryLevel,
                setGoal,
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
    }, [currentQuestionIndex, studentId, lessonId, navigate]);

    

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

    const validateAnswer = async () => {
        const correctAnswer = parseInt(randomizedQuestions[currentQuestionIndex].value);
        
        if (electronCount === correctAnswer) {
            setFeedback('Correct!');
            setFeedbackClass('correct');
            setIsAnswerCorrect(true);
            setLastDigitAttempts(0); 
            await CorrectResponses({
                studentId, 
                lessonId, 
                correctAnswers, 
                progress, 
                masteryLevel, 
                goal,
                starsEarned,
                setCorrectAnswers, 
                setProgress, 
                setMasteryLevel,
            }); 
            return;
        }
        setFeedback(`Incorrect. You selected ${electronCount} electrons, but ${currentElement.nameType} needs ${correctAnswer} electrons.`);
        setFeedbackClass('incorrect');
        setLastDigitAttempts(0); 
        await IncorrectResponses({
            studentId, 
            lessonId, 
            correctAnswers, 
            progress, 
            masteryLevel, 
            goal, 
            starsEarned,
            setCorrectAnswers, 
            setProgress, 
            setMasteryLevel,
        }); 
        setTimeout(() => {
            setFeedback('');
            setFeedbackClass('');
        }, 2000);
    };

    const handleSubmitAnswer = () => {
        validateAnswer();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setUserAnswer('');
            setFeedback('');
            setFeedbackClass('hidden');
            setIsAnswerCorrect(false);
            setSelectedElectrons([]); 
            setElectronCount(0); 
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
                Look at the element <strong>{randomizedQuestions[currentQuestionIndex]?.nameType}</strong> and click the amount of electrons you think the element requires. <br />
                Hint: Click on the red dots until they are all blue!
              </p>
              <div className="lesson-three-point-two-cylinder-container">
                <div className="lesson-three-point-two-cylinderWaterContainer">
                  {randomizedQuestions[currentQuestionIndex] && (
                    <img 
                      src={require(`../../assets/question/${randomizedQuestions[currentQuestionIndex].imagepath}`)}
                      className="lesson-one-point-eight-cylinder"
                      alt={`${randomizedQuestions[currentQuestionIndex].nameType} structure`}
                    />
                  )}
                </div>
                <div className="electron-container">
                  {predefinedPositions.map((pos, index) => (
                    <div
                      key={index}
                      className={`electron ${selectedElectrons.includes(index) ? "selected" : ""}`}
                      style={{ left: pos.x, top: pos.y }}
                      onClick={() => handleElectronClick(index)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="submit-feedback-container">
              {!isAnswerCorrect ? (
                <button className='lesson-three-point-two-submit' onClick={handleSubmitAnswer}>Submit Answer</button>
              ) : (
                <button className='lesson-three-point-two-next' onClick={handleNextQuestion}>Next Question</button>
              )}
              <span className={`lesson-three-point-two-feedback ${feedbackClass}`}>{feedback}</span>
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

            <div className='side-column-box'>
              <div className='side-column-box-title'>
                <h1>Progress</h1>
              </div>
              <div className='side-column-box-info'>
                <div className="progressbox">
                  <div className="progressbar" style={{ '--progress': progress }}></div>
                  <div className="progress-text">
                    Current Topic Progress: {progress.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonThreePointTwo;
