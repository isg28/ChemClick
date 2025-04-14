import React, { useState, useEffect } from 'react';
import '../../styles/question/Question.css';
import '../../styles/question/LessonFourPointThree.css';
import { useNavigate } from 'react-router-dom';
import {renderStars, renderGoalChecks, fetchLessonData, fetchLessonProgress, CorrectResponses} from '../../components/question/LessonUtils';

function LessonFourPointThree() {
    const navigate = useNavigate();
    const studentId = localStorage.getItem('studentId'); 
    const teacherId = localStorage.getItem('teacherId'); 
    
    const isTeacher = !!teacherId; 
    const userId = isTeacher ? teacherId : studentId;     
    const lessonId = 'lesson4.3';

    const [goal, setGoal] = useState();
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [totalAttempts, setTotalAttempts] = useState(0);
    const [progress, setProgress] = useState(0);
    const [masteryLevel, setMasteryLevel] = useState(0);
    const [showCompletionModal, setShowCompletionModal] = useState(false); 
    const { starsEarned, stars } = renderStars(goal, correctAnswers, totalAttempts, progress);    const displayMedals = starsEarned >= 5;

    const [activeColor, setActiveColor] = useState(null);
    const [activeCategory, setActiveCategory] = useState('metallic'); // Default: 'metallic'
    const [isEraserActive, setIsEraserActive] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const [tableData, setTableData] = useState(
        Array(7).fill(null).map(() =>
            Array(18).fill({ left: null, right: null }) 
        )
    );

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
    }, [userId, lessonId, navigate, isTeacher]);

    useEffect(() => {
        if (progress === 100) {
            setShowCompletionModal(true);
        }
    }, [progress]);

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

    const metallicColors = {
        metal: '#ff5447',
        nonmetal: '#49f55b', 
        semimetal: '#837dff', 
    };

    const groupColors = {
        alkali: 'yellow',
        alkaline: 'orange',
        halogens: '#8b0277a8',
        nobleGas: 'cyan',
    };

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setActiveColor(null); 
    };

    const handleColorClick = (color) => {
        if (!color) {
            console.error('Color is not defined!');
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
            const newData = prevData.map((row) =>
                row.map((cell) => ({ ...cell }))
            );
    
            if (activeCategory === 'metallic') {
                newData[rowIndex][colIndex].left = activeColor;
            } else if (activeCategory === 'group') {
                newData[rowIndex][colIndex].right = activeColor;
            }
            console.log(`Updated TableData for [${rowIndex}, ${colIndex}]`, newData);
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
        return key
        .replace(/([a-z])([A-Z])/g, '$1 $2') 
        .replace(/^./, (str) => str.toUpperCase());
    };
    
    const handleSubmit = async () => {
        let correctMetallic = 0;
        let correctGroup = 0;
        let totalMetallic = 0;
        let totalGroup = 0;

        const metallicMistakes = {};
        const metallicMissing = {};
        const groupMistakes = {};
        const groupMissing = {};

        tableData.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const elementIndex = rowIndex * 18 + colIndex;
                const element = elements[elementIndex];

                if (element) {
                    if (element.metallicProperty) {
                        totalMetallic++;
                        if (cell.left) {
                            if (metallicColors[element.metallicProperty] === metallicColors[cell.left]) {
                                correctMetallic++;
                            } else {
                                metallicMistakes[cell.left] = (metallicMistakes[cell.left] || 0) + 1;
                                metallicMissing[element.metallicProperty] =
                                    (metallicMissing[element.metallicProperty] || 0) + 1;
                            }
                        } else {
                            metallicMissing[element.metallicProperty] =
                                (metallicMissing[element.metallicProperty] || 0) + 1;
                        }
                    } else if (cell.left) {
                        metallicMistakes[cell.left] = (metallicMistakes[cell.left] || 0) + 1;
                    }
                } else {
                    if (cell.left) {
                        metallicMistakes[cell.left] = (metallicMistakes[cell.left] || 0) + 1;
                    }
                }
                if (element) {
                    if (element.groupClassification) {
                        totalGroup++;
                        if (cell.right) {
                            if (groupColors[element.groupClassification] === groupColors[cell.right]) {
                                correctGroup++;
                            } else {
                                groupMistakes[cell.right] = (groupMistakes[cell.right] || 0) + 1;
                                groupMissing[element.groupClassification] =
                                    (groupMissing[element.groupClassification] || 0) + 1;
                            }
                        } else {
                            groupMissing[element.groupClassification] =
                                (groupMissing[element.groupClassification] || 0) + 1;
                        }
                    } else if (cell.right) {
                        groupMistakes[cell.right] = (groupMistakes[cell.right] || 0) + 1;
                    }
                } else {
                    if (cell.right) {
                        groupMistakes[cell.right] = (groupMistakes[cell.right] || 0) + 1;
                    }
                }
            });
        });

        console.log('Type of metallicMistakes:', typeof metallicMistakes); console.log('Is metallicMistakes an instance of Object?', metallicMistakes instanceof Object); console.log('Metallic Mistakes:', metallicMistakes); console.log('Keys of Metallic Mistakes:', Object.keys(metallicMistakes)); console.log('Keys Length:', Object.keys(metallicMistakes).length);


        if (correctMetallic === totalMetallic && correctGroup === totalGroup && Object.keys(groupMistakes).length === 0 && Object.keys(metallicMistakes).length === 0) {
            setIsCorrect(true);
            setFeedbackMessage('🎉 Correct! You can proceed to the next question.');
            await CorrectResponses({userId, lessonId, isTeacher, correctAnswers, incorrectAnswers, totalAttempts, progress, masteryLevel, goal,starsEarned, 
                setCorrectAnswers, setProgress, setMasteryLevel, setTotalAttempts,
            }); 
        } else {
            const metallicFeedback = Object.keys({ ...metallicMissing, ...metallicMistakes }).map((type) => {
                const mistakes = metallicMistakes[type] || 0;
                const missing = metallicMissing[type] || 0;

                return (
                    <li key={type}>
                       ⚠️ <strong>{type}</strong>: {mistakes} incorrect, {missing} missing
                    </li>
                );
            });

            const groupFeedback = Object.keys({ ...groupMissing, ...groupMistakes }).map((type) => {
                const mistakes = groupMistakes[type] || 0;
                const missing = groupMissing[type] || 0;

                return (
                    <li key={type}>
                        ⚠️ <strong>{type}</strong>: {mistakes} incorrect, {missing} missing
                    </li>
                );
            });

            const feedback = (
                <div>
                    <h3>🔄 Keep trying! Here's your progress:</h3>
                    <div>
                        <h4><u> Metallic Properties: </u></h4>
                        <p>Correct: {correctMetallic} / {totalMetallic}</p>
                        <ul>
                            {metallicFeedback}
                        </ul>
                    </div>
                    <div>
                        <h4><u>Group Classifications:</u></h4>
                        <p>Correct: {correctGroup} / {totalGroup}</p>
                        <ul>
                            {groupFeedback}
                        </ul>
                    </div>
                </div>
            );

            setFeedbackMessage(feedback);
        
        };
    }
    const handleNextQuestion = () => {
        setTableData(
            Array(7).fill(null).map(() =>
                Array(18).fill({ left: null, right: null })
            )
        );
        setIsCorrect(false);
        setFeedbackMessage('');
    };

    return (
        <div className="lesson-four-point-three">
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
                <div className="lesson-four-point-three-box">
                    <div className="lesson-four-point-three-box-innercont">
                        <div className="lesson-four-point-three-box-title">
                            <h1>Unit Four: Periodic Table Classification</h1>
                        </div>
                        <div className="lesson-four-point-three-content">
                            <p className="lesson-four-point-three-prompt">
                                <strong>Instructions:</strong>
                                <br />
                                1. Choose a category: Metallic Properties or Group Classification by clicking the respective button.
                                <br />
                                2. Use the provided colors to classify:
                                <ul>
                                    <li>Color the <u>left half</u> of each element based on Metallic Properties (Metal, Nonmetal, Semimetal).</li>
                                    <li>Color the <u>right half</u> of each element based on Group Classification (Alkali Metals, Alkaline Earth Metals, Halogens, Noble Gases).</li>
                                </ul>
                                3. Click on an element to apply your chosen color to the appropriate side.
                            </p>

                            <div className="lesson-four-point-three-category">
                                <button
                                    onClick={() => handleCategoryChange('metallic')}
                                    className={activeCategory === 'metallic' ? 'active' : ''}
                                >
                                    Metallic Properties
                                </button>
                                <button
                                    onClick={() => handleCategoryChange('group')}
                                    className={activeCategory === 'group' ? 'active' : ''}
                                >
                                    Group Classification
                                </button>
                            </div>

                            <div className="color-key-container">
                                <div className="color-keys">
                                    {Object.keys(activeCategory === 'metallic' ? metallicColors : groupColors).map((key) => (
                                        <div
                                            key={key}
                                            className="color-block"
                                            style={{
                                                backgroundColor: activeCategory === 'metallic' ? metallicColors[key] : groupColors[key],
                                                border: activeColor === key ? '2px solid black' : 'none',
                                            }}
                                            onClick={() => handleColorClick(key)}
                                        >
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
                                                        background: element
                                                        ? `linear-gradient(to right, ${
                                                            metallicColors[cell.left] || 'white'
                                                            }, ${groupColors[cell.right] || 'white'})`
                                                        : 'rgba(255, 255, 255, 0.1)',
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
                                                                color: cell.left || cell.right ? 'white' : 'black',
                                                                backgroundColor: cell.left || cell.right ? 'rgba(0, 0, 0, 0.5)' : 'transparent', 
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
                                    <button className='lesson-four-point-three-submit' onClick={handleSubmit}>Submit Answer</button>
                                )}
                                {isCorrect && (
                                    <button className='lesson-four-point-three-next' onClick={handleNextQuestion}>Next Question</button>
                                )}
                                {feedbackMessage && ( 
                                    <span
                                    className={`lesson-four-point-three-feedback ${
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
                    </div>
                    {/* Next Lesson button positioned below the Goals box */}
                    <div className="next-lesson-button-container" style={{ marginTop: '20px' }}>
                        <button 
                            className="next-lesson-button" 
                            onClick={() => navigate('/lessonfivepointone')}
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

export default LessonFourPointThree;