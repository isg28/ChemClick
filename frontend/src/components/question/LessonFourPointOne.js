import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonFourPointOne.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses, IncorrectResponses} from '../../components/question/LessonUtils';

function LessonFourPointOne() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId');
    const lessonId = 'lesson4.1';

    const [goal, setGoal] = useState();
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [progress, setProgress] = useState(0);
    const [masteryLevel, setMasteryLevel] = useState(0);
    const { starsEarned, stars } = renderStars(masteryLevel);
    const displayMedals = starsEarned >= 5;

    const [activeColor, setActiveColor] = useState(null);
    const [isEraserActive, setIsEraserActive] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [currentClassification, setCurrentClassification] = useState(null);
    

    const [tableData, setTableData] = useState(
        Array(7).fill(null).map(() =>
            Array(18).fill({ left: null, right: null }) 
        )
    );

    const metallicProperties = ['metal', 'nonmetal', 'semimetal'];

    const handlequestion = () => {
        navigate('/dashboard');
    };

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
                setProgress,
                setMasteryLevel,
                setGoal,
            });
        };

        initializeData();
        generateRandomQuestion();
    }, [studentId, lessonId, navigate]);

    const elements = [
        // Row 1
        { number: 1, symbol: 'H', name: 'Hydrogen', metallicProperty: 'nonmetal', groupClassification: null },
        null, null, null,null, null, null,null, null, null,null, null, null,null, null, null,null,
        { number: 2, symbol: 'He', name: 'Helium', metallicProperty: 'nonmetal', groupClassification: 'nobleGas' },
        // Row 2
        { number: 3, symbol: 'Li', name: 'Lithium', metallicProperty: 'metal', groupClassification: 'alkali' },
        { number: 4, symbol: 'Be', name: 'Beryllium', metallicProperty: 'metal', groupClassification: 'alkaline' },
        null, null, null,null, null, null,null, null, null,null, 
        { number: 5, symbol: 'B', name: 'Boron', metallicProperty: 'semimetal', groupClassification: null },
        { number: 6, symbol: 'C', name: 'Carbon', metallicProperty: 'nonmetal', groupClassification: null },
        { number: 7, symbol: 'N', name: 'Nitrogen', metallicProperty: 'nonmetal', groupClassification: null },
        { number: 8, symbol: 'O', name: 'Oxygen', metallicProperty: 'nonmetal', groupClassification: null },
        { number: 9, symbol: 'F', name: 'Fluorine', metallicProperty: 'nonmetal', groupClassification: 'halogens' },
        { number: 10, symbol: 'Ne', name: 'Neon', metallicProperty: 'nonmetal', groupClassification: 'nobleGas' },
        // Row 3
        { number: 11, symbol: 'Na', name: 'Sodium', metallicProperty: 'metal', groupClassification: 'alkali' },
        { number: 12, symbol: 'Mg', name: 'Magnesium', metallicProperty: 'metal', groupClassification: 'alkaline' },
        null, null, null,null, null, null,null, null, null,null, 
        { number: 13, symbol: 'Al', name: 'Aluminium', metallicProperty: 'metal', groupClassification: null },
        { number: 14, symbol: 'Si', name: 'Silicon', metallicProperty: 'semimetal', groupClassification: null },
        { number: 15, symbol: 'P', name: 'Phosphorus', metallicProperty: 'nonmetal', groupClassification: null },
        { number: 16, symbol: 'S', name: 'Sulfur', metallicProperty: 'nonmetal', groupClassification: null },
        { number: 17, symbol: 'Cl', name: 'Chlorine', metallicProperty: 'nonmetal', groupClassification: 'halogens' },
        { number: 18, symbol: 'Ar', name: 'Argon', metallicProperty: 'nonmetal', groupClassification: 'nobleGas' },
        // Row 4
        { number: 19, symbol: 'K', name: 'Potassium', metallicProperty: 'metal', groupClassification: 'alkali' },
        { number: 20, symbol: 'Ca', name: 'Calcium', metallicProperty: 'metal', groupClassification: 'alkaline' },
        { number: 21, symbol: 'Sc', name: 'Scandium', metallicProperty: 'metal', groupClassification: null },
        { number: 22, symbol: 'Ti', name: 'Titanium', metallicProperty: 'metal', groupClassification: null },
        { number: 23, symbol: 'V', name: 'Vanadium', metallicProperty: 'metal', groupClassification: null },
        { number: 24, symbol: 'Cr', name: 'Chromium', metallicProperty: 'metal', groupClassification: null },
        { number: 25, symbol: 'Mn', name: 'Manganese', metallicProperty: 'metal', groupClassification: null },
        { number: 26, symbol: 'Fe', name: 'Iron', metallicProperty: 'metal', groupClassification: null },
        { number: 27, symbol: 'Co', name: 'Cobalt', metallicProperty: 'metal', groupClassification: null },
        { number: 28, symbol: 'Ni', name: 'Nickel', metallicProperty: 'metal', groupClassification: null },
        { number: 29, symbol: 'Cu', name: 'Copper', metallicProperty: 'metal', groupClassification: null },
        { number: 30, symbol: 'Zn', name: 'Zinc', metallicProperty: 'metal', groupClassification: null },
        { number: 31, symbol: 'Ga', name: 'Gallium', metallicProperty: 'metal', groupClassification: null },
        { number: 32, symbol: 'Ge', name: 'Germanium', metallicProperty: 'semimetal', groupClassification: null },
        { number: 33, symbol: 'As', name: 'Arsenic', metallicProperty: 'semimetal', groupClassification: null },
        { number: 34, symbol: 'Se', name: 'Selenium', metallicProperty: 'nonmetal', groupClassification: null },
        { number: 35, symbol: 'Br', name: 'Bromine', metallicProperty: 'nonmetal', groupClassification: 'halogens' },
        { number: 36, symbol: 'Kr', name: 'Krypton', metallicProperty: 'nonmetal', groupClassification: 'nobleGas' },
        // Row 5
        { number: 37, symbol: 'Rb', name: 'Rubidium', metallicProperty: 'metal', groupClassification: 'alkali' },
        { number: 38, symbol: 'Sr', name: 'Strontium', metallicProperty: 'metal', groupClassification: 'alkaline' },
        { number: 39, symbol: 'Y', name: 'Yttrium', metallicProperty: 'metal', groupClassification: null },
        { number: 40, symbol: 'Zr', name: 'Zirconium', metallicProperty: 'metal', groupClassification: null },
        { number: 41, symbol: 'Nb', name: 'Niobium', metallicProperty: 'metal', groupClassification: null },
        { number: 42, symbol: 'Mo', name: 'Molybdenum', metallicProperty: 'metal', groupClassification: null },
        { number: 43, symbol: 'Tc', name: 'Technetium', metallicProperty: 'metal', groupClassification: null },
        { number: 44, symbol: 'Ru', name: 'Ruthenium', metallicProperty: 'metal', groupClassification: null },
        { number: 45, symbol: 'Rh', name: 'Rhodium', metallicProperty: 'metal', groupClassification: null },
        { number: 46, symbol: 'Pd', name: 'Palladium', metallicProperty: 'metal', groupClassification: null },
        { number: 47, symbol: 'Ag', name: 'Silver', metallicProperty: 'metal', groupClassification: null },
        { number: 48, symbol: 'Cd', name: 'Cadmium', metallicProperty: 'metal', groupClassification: null },
        { number: 49, symbol: 'In', name: 'Indium', metallicProperty: 'metal', groupClassification: null },
        { number: 50, symbol: 'Sn', name: 'Tin', metallicProperty: 'metal', groupClassification: null },
        { number: 51, symbol: 'Sb', name: 'Antimony', metallicProperty: 'semimetal', groupClassification: null },
        { number: 52, symbol: 'Te', name: 'Tellurium', metallicProperty: 'semimetal', groupClassification: null },
        { number: 53, symbol: 'I', name: 'Iodine', metallicProperty: 'nonmetal', groupClassification: 'halogens' },
        { number: 54, symbol: 'Xe', name: 'Xenon', metallicProperty: 'nonmetal', groupClassification: 'nobleGas' },
        // Row 6
        { number: 55, symbol: 'Cs', name: 'Cesium', metallicProperty: 'metal', groupClassification: 'alkali' },
        { number: 56, symbol: 'Ba', name: 'Barium', metallicProperty: 'metal', groupClassification: 'alkaline' },
        null, { number: 72, symbol: 'Hf', name: 'Hafnium', metallicProperty: 'metal', groupClassification: null },
        { number: 73, symbol: 'Ta', name: 'Tantalum', metallicProperty: 'metal', groupClassification: null },
        { number: 74, symbol: 'W', name: 'Tungsten', metallicProperty: 'metal', groupClassification: null },
        { number: 75, symbol: 'Re', name: 'Rhenium', metallicProperty: 'metal', groupClassification: null },
        { number: 76, symbol: 'Os', name: 'Osmium', metallicProperty: 'metal', groupClassification: null },
        { number: 77, symbol: 'Ir', name: 'Iridium', metallicProperty: 'metal', groupClassification: null },
        { number: 78, symbol: 'Pt', name: 'Platinum', metallicProperty: 'metal', groupClassification: null },
        { number: 79, symbol: 'Au', name: 'Gold', metallicProperty: 'metal', groupClassification: null },
        { number: 80, symbol: 'Hg', name: 'Mercury', metallicProperty: 'metal', groupClassification: null },
        { number: 81, symbol: 'Tl', name: 'Thallium', metallicProperty: 'metal', groupClassification: null },
        { number: 82, symbol: 'Pb', name: 'Lead', metallicProperty: 'metal', groupClassification: null },
        { number: 83, symbol: 'Bi', name: 'Bismuth', metallicProperty: 'metal', groupClassification: null },
        { number: 84, symbol: 'Po', name: 'Polonium', metallicProperty: 'metal', groupClassification: null },
        { number: 85, symbol: 'At', name: 'Astatine', metallicProperty: 'semimetal', groupClassification: 'halogens'},
        { number: 86, symbol: 'Rn', name: 'Radon', metallicProperty: 'nonmetal', groupClassification: 'nobleGas' },
        // Row 7
        { number: 87, symbol: 'Fr', name: 'Francium', metallicProperty: 'metal', groupClassification: 'alkali' },
        { number: 88, symbol: 'Ra', name: 'Radium', metallicProperty: 'metal', groupClassification: 'alkaline' },
        null, 
        { number: 104, symbol: 'Rf', name: 'Rutherfordium', metallicProperty: 'metal', groupClassification: null },
        { number: 105, symbol: 'Db', name: 'Dubnium', metallicProperty: 'metal', groupClassification: null },
        { number: 106, symbol: 'Sg', name: 'Seaborgium', metallicProperty: 'metal', groupClassification: null },
        { number: 107, symbol: 'Bh', name: 'Bohrium', metallicProperty: 'metal', groupClassification: null },
        { number: 108, symbol: 'Hs', name: 'Hassium', metallicProperty: 'metal', groupClassification: null },
        { number: 109, symbol: 'Mt', name: 'Meitnerium', metallicProperty: null, groupClassification: null },
        { number: 110, symbol: 'Ds', name: 'Darmstadtium', metallicProperty: null, groupClassification: null },
        { number: 111, symbol: 'Rg', name: 'Roentgenium', metallicProperty: null, groupClassification: null },
        { number: 112, symbol: 'Cn', name: 'Copernicium', metallicProperty: null, groupClassification: null },
        { number: 113, symbol: 'Nh', name: 'Nihonium', metallicProperty: null, groupClassification: null },
        { number: 114, symbol: 'Fl', name: 'Flerovium', metallicProperty: null, groupClassification: null },
        { number: 115, symbol: 'Mc', name: 'Moscovium', metallicProperty: null, groupClassification: null },
        { number: 116, symbol: 'Lv', name: 'Livermorium', metallicProperty: null, groupClassification: null },
        { number: 117, symbol: 'Ts', name: 'Tennessine', metallicProperty: null, groupClassification: null },
        { number: 118, symbol: 'Og', name: 'Oganesson', metallicProperty: null, groupClassification: null },
    ];

    
    const generateRandomQuestion = () => {
        const randomProperty = metallicProperties[Math.floor(Math.random() * metallicProperties.length)];
        setCurrentClassification(randomProperty);
        const formattedQuestion = `Can you color in the elements that has a <span class="underlined-property">${randomProperty}</span> property?`;
        setCurrentQuestion(formattedQuestion);
        setActiveColor(null)
    };

    const metallicColors = {
        metal: '#ff5447',
        nonmetal: '#49f55b', 
        semimetal: '#837dff', 
    };

    const handleColorClick = (key) => {
        if (key !== currentClassification) {
            return;
        }
        
        const color = metallicColors[key];
        if (!color) {
            alert('Please pick a color first.');
            setActiveColor(null)
            return;
        }
        console.log(`Selected color: ${color}`);
        setIsEraserActive(false);
        setActiveColor(color);
    };

    const handleSquareClick = (rowIndex, colIndex) => {
        const elementIndex = rowIndex * 18 + colIndex;
        const element = elements[elementIndex];
        if (!element) return;
    
        if (!activeColor) {
            alert('Please select a color first.');
            return;
        }
    
        setTableData((prevData) => {
            const newData = prevData.map((row, rowIdx) =>
                row.map((cell, colIdx) =>
                    rowIdx === rowIndex && colIdx === colIndex ? { color: activeColor } : cell
                )
            );
            return newData;
        });
    };
    
    const handleEraserToolClick = () => {
        setActiveColor(null); 
        setIsEraserActive(!isEraserActive); 
    };

    const handleEraserClickOnSquare = (rowIndex, colIndex) => {
        const elementIndex = rowIndex * 18 + colIndex;
        const element = elements[elementIndex];
        if(!element){
            return;
        }
        if (isEraserActive) {
            setTableData((prevData) => {
                const newData = [...prevData];
                newData[rowIndex][colIndex] = { left: null, right: null };
                return newData;
            });
        }
    };

    const handleClearAllClick = () => {
        setTableData((prevData) =>
            prevData.map((row) =>
                row.map(() => ({ left: null, right: null }))
            )
        );
    };

    const formatCategoryName = (key) => {
        if(!key) return "Unknown";
        return key
        .replace(/([a-z])([A-Z])/g, '$1 $2') 
        .replace(/^./, (str) => str.toUpperCase());
    };
    
    const handleSubmit = async () => {
        if (!currentClassification) return; 
    
        let correctCount = 0;
        let totalRequired = 0;
        let incorrectSelections = 0;
        let wrongColorCount = 0;
    
        tableData.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const elementIndex = rowIndex * 18 + colIndex;
                const element = elements[elementIndex];
    
                if (element && element.metallicProperty === currentClassification) {
                    totalRequired++; 
    
                    if (cell.color === metallicColors[currentClassification]) {
                        correctCount++;
                    } else if (cell.color && cell.color !== metallicColors[currentClassification]) {
                        wrongColorCount++; 
                    }
                } 
                else if (element && cell.color) {
                    incorrectSelections++; 
                }
            });
        });
    
        if (correctCount === totalRequired && incorrectSelections === 0 && wrongColorCount === 0) {
            setIsCorrect(true);
            setFeedbackMessage('🎉 Correct! You can proceed to the next question.');
            await CorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal,starsEarned, 
                        setCorrectAnswers, setProgress, setMasteryLevel,
            }); 
        } else {
            let feedbackMessage = (
                <div>
                    <h3>🔄 Keep trying!</h3>
                    <p>You got <strong>{correctCount} / {totalRequired}</strong> correct.</p>
    
                    {wrongColorCount > 0 && (
                        <p style={{ color: 'red' }}>
                        ⚠️ Remove <strong>{wrongColorCount}</strong> {wrongColorCount === 1 ? "element" : "elements"} colored incorrectly.
                        </p>
                    )}
    
                    {incorrectSelections > 0 && (
                        <p style={{ color: 'red' }}>
                            ⚠️ {incorrectSelections} {incorrectSelections === 1 ? "element was" : "elements were"} colored incorrectly. Try removing {incorrectSelections === 1 ? "it" : "them"}.
                        </p>
                    )}
                    <p>Make sure you're only coloring elements classified as <strong>{formatCategoryName(currentClassification)}</strong>.</p>
                </div>
            );
    
            setIsCorrect(false);
            setFeedbackMessage(feedbackMessage);
            await IncorrectResponses({studentId, lessonId, correctAnswers, progress, masteryLevel, goal, starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel,
            });
        }
    };
    

    const handleNextQuestion = () => {
        setTableData(Array(7).fill(null).map(() => Array(18).fill({ left: null, right: null})));
        setIsCorrect(false);
        setFeedbackMessage('');
        generateRandomQuestion();
    };

    return (
        <div className="lesson-four-point-one">
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
                        onClick={handlequestion}
                        alt="Home Lines"
                    />
                </div>
            </div>

            <div className="question-page-main">
                <div className="lesson-four-point-one-box">
                    <div className="lesson-four-point-one-box-innercont">
                        <div className="lesson-four-point-one-box-title">
                            <h1>Unit Four: Periodic Table Classification</h1>
                        </div>
                        <div className="lesson-four-point-one-content">
                            <p className="lesson-four-point-one-prompt" dangerouslySetInnerHTML={{ __html: currentQuestion }}></p>
                            <div className="lesson-four-point-one-category">
                                <span className="active-category">Metallic Properties</span>
                            </div>
                            <div className="color-key-container">
                                <div className="color-keys">
                                    {Object.keys(metallicColors).map((key) => (
                                    <div
                                        key={key}
                                        className="color-block"
                                        style={{
                                            backgroundColor: metallicColors[key],
                                            border: activeColor === metallicColors[key] ? '2px solid black' : 'none',
                                            opacity: key !== currentClassification ? 0.5 : 1, 
                                            cursor: key !== currentClassification ? 'not-allowed' : 'pointer', 
                                        }}
                                        onClick={() => handleColorClick(key)}
                                        title={key !== currentClassification ? `Please use the correct metallic property:  ${formatCategoryName(currentClassification)}` : ''}                                        >

                                        {formatCategoryName(key)} 
                                    </div>
                                    ))}
                                </div>
                                <div className="vertical-divider"></div>
                                <div className="right-side-buttons">
                                    <div
                                        className={`eraser-tool-button ${isEraserActive ? 'active' : ''}`}
                                        onClick={handleEraserToolClick}
                                        title="Eraser Tool: Click to erase individual colors"
                                        style={{
                                            border: isEraserActive ? '2px solid black' : 'none',
                                        }}
                                    >
                                        Clear One: 🧽
                                    </div>
                                    <div
                                        className="clear-all-button"
                                        onClick={handleClearAllClick}
                                        title="Clear All: Removes all colors"
                                    >
                                        Clear All:&nbsp;<span style={{ color: '#FFD700' }}>✖</span>
                                    </div>
                                </div>
                            </div>

                            <div className="periodic-table">
                                {tableData.map((row, rowIndex) => (
                                    <div key={rowIndex} className="row">
                                        {row.map((cell, colIndex) => {
                                            const elementIndex = rowIndex * 18 + colIndex;
                                            const element = elements[elementIndex];
                                            const tooltipParts = [];
                                            if (cell.left) 
                                                tooltipParts.push(`Left: ${cell.left}`);
                                            if (cell.right) 
                                                tooltipParts.push(`Right: ${cell.right}`);
                                            const tooltipContent = tooltipParts.join(', '); 
                                            return (
                                                <div
                                                    key={`${rowIndex}-${colIndex}`}
                                                    className={`element-square ${!element ? 'null-space' : ''}`}
                                                    onClick={() => {
                                                        if (isEraserActive) {
                                                        handleEraserClickOnSquare(rowIndex, colIndex);
                                                        } else {
                                                        handleSquareClick(rowIndex, colIndex);
                                                        }
                                                    }}
                                                    style={{
                                                        backgroundColor: cell.color || 'white',
                                                    }}
                                                    title={tooltipContent || ''} 
                                                    >
                                                    {element && (
                                                        <>
                                                        <div className="element-number">{element.number}</div>
                                                        <div className="element-symbol">{element.symbol}</div>
                                                        <div
                                                            className="element-name"
                                                            style={{
                                                                color: cell.color ? 'white' : 'black', 
                                                                backgroundColor: cell.color ? 'rgba(0, 0, 0, 0.5)' : 'transparent', 
                                                                padding: '2px 4px', 
                                                                borderRadius: '4px', 
                                                            }}
                                                        >
                                                            {element.name}
                                                        </div>
                                                        </>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>

                            {/* Submit Button */}
                            <div className="submit-feedback-container">
                                {!isCorrect && (
                                    <button className='lesson-four-point-one-submit' onClick={handleSubmit}>Submit Answer</button>
                                )}
                                {isCorrect && (
                                    <button className='lesson-four-point-one-next' onClick={handleNextQuestion}>Next Question</button>
                                )}
                                {feedbackMessage && ( 
                                    <span
                                    className={`lesson-four-point-one-feedback ${
                                        isCorrect ? "correct" : "incorrect"
                                    }`}
                                    >
                                    {feedbackMessage}
                                    </span>
                                )}                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="side-column">
                    <div className="side-column-box-holder">
                        <div className="side-column-box masterybox">
                            <div className="side-column-box-title masteryboxtitle">
                                <h1>Mastery</h1>
                            </div>
                            {displayMedals && (
                                <>
                                    <div
                                        className="reward-box-left"
                                        title="Congrats on achieving mastery! Feel free to keep practicing!"
                                    >
                                        🏅
                                    </div>
                                    <div
                                        className="reward-box-right"
                                        title="Congrats on achieving mastery! Feel free to keep practicing!"
                                    >
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
                        <div className="side-column-box">
                            <div className="side-column-box-title">
                                <h1>Progress</h1>
                            </div>
                            <div className="side-column-box-info">
                                <div className="progressbox">
                                    <div
                                        className="progressbar"
                                        style={{ '--progress': progress }}
                                    ></div>
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
}

export default LessonFourPointOne;