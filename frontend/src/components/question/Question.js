import React from 'react';
import '../../styles/question/Question.css';
import {useNavigate} from  'react-router-dom';


function Question() {
    const navigate = useNavigate();

const handlequestion = () => {
    navigate('/dashboard');
};

    return (
        <div className='Question'>
            <div className='questionheader'>
                <img src={require('../../assets/question/ChemClickLogo.png')} className='ChemClickLogoHeader' />
                <img src={require('../../assets/question/Home.png')} className='homelines'onClick={handlequestion} />

                <div className='insideheader'><h1>
                    ChemClicks Assignments
                </h1>
                </div>
            </div>
            <div className='questionbox'>
                <img src={require('../../assets/question/Hydrogen.jpg')} className='element' />

                <div className='questionboxtitle'><h1>
                    Unit Three: Nomenclature: <br />
                    Name that Element
                </h1>
                </div>
                <div className='questionboxquestion'><h1>
                    What is the name of this element?
                </h1>
                    <input type='text' className='elemententered' placeholder='Enter element name here' />
                </div>
                <div className='questionboxanswer'><h1>
                    What is the name of this element?
                </h1>

                </div>
                <button className='submitbutton'>Submit Answer</button>
            </div>
            <div className='masterybox'>
                <div className='masteryboxtitle'><h1>
                    Mastery
                </h1>
                </div>

                <div className='masteryboxstars'>
                    <img src={require('../../assets/question/Stars.png')} className='masterystars' />

                </div>
            </div>

            <div className='goalbox'>
                <div className='goalboxtitle'><h1>
                    Goal
                </h1>
                </div>
                <div className='goalboxchecks'>
                    <img src={require('../../assets/question/Checkmarks.png')} className='goalchecks' />

                </div>
            </div>
            <div className='progressbox'>
                <div className='progressboxtitle'><h1>
                    Progress
                </h1>
                    <h2>
                        Current Topic Progress: 33%
                    </h2>
                </div>
                <div className='progressboxbar'>
                    <img src={require('../../assets/question/ProgressBar.jpg')} className='progressbar' />
                </div>
            </div>
        </div>

    );
}

export default Question;
