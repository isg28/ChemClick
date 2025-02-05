import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Logout from './components/logout/Logout';
import AccountCreation from './components/accountcreation/AccountCreation';
import Profile from './components/profile/Profile';
import TeacherDashboard from './components/teacherdashboard/TeacherDashboard';
import Question from './components/question/Question';
import ConfirmEmail from './components/passwordreset/ConfirmEmail';
import NewPassword from './components/passwordreset/NewPassword';
import Statistics from './components/statistics/Statistics';
import StatisticsIndividual from './components/statisticsindividual/StatisticsIndividual';
import Congrats from './components/congrats/Congrats';
import LessonOnePointOne from './components/question/LessonOnePointOne';
import LessonOnePointTwo from './components/question/LessonOnePointTwo';
import LessonOnePointThree from './components/question/LessonOnePointThree';
import LessonOnePointFour from './components/question/LessonOnePointFour';
import LessonOnePointFive from './components/question/LessonOnePointFive';
import LessonOnePointSix from './components/question/LessonOnePointSix';
import LessonOnePointSeven from './components/question/LessonOnePointSeven';
import LessonOnePointEight from './components/question/LessonOnePointEight';
import LessonOnePointNine from './components/question/LessonOnePointNine';
import LessonOnePointTen from './components/question/LessonOnePointTen';
import LessonOnePointEleven from './components/question/LessonOnePointEleven';
import LessonOnePointTwelve from './components/question/LessonOnePointTwelve';
import LessonTwoPointOne from './components/question/LessonTwoPointOne';
import LessonTwoPointFour from './components/question/LessonTwoPointFour';
import LessonTwoPointTwo from './components/question/LessonTwoPointTwo';
import LessonTwoPointThree from './components/question/LessonTwoPointThree';


import LessonFourPointOne from './components/question/LessonFourPointOne';
import LessonFourPointTwo from './components/question/LessonFourPointTwo';
import LessonFourPointThree from './components/question/LessonFourPointThree';

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(*/
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/dashboard" element = {<Dashboard/>} />
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/logout" element = {<Logout/>} />
        <Route path = "/accountcreation" element = {<AccountCreation/>} />
        <Route path = "/profile" element = {<Profile/>} />
        <Route path = "/question" element = {<Question/>} />
        <Route path = "/teacherdashboard" element = {<TeacherDashboard/>} />
        <Route path = "/ConfirmEmail" element = {<ConfirmEmail/>} />
        <Route path = "/NewPassword" element = {<NewPassword/>} />
        <Route path = "/Statistics" element = {<Statistics/>} />
        <Route path = "/StatisticsIndividual" element = {<StatisticsIndividual/>} />
        <Route path = "/Congrats" element = {<Congrats/>} />
        <Route path = "/LessonOnePointOne" element = {<LessonOnePointOne/>}/>
        <Route path = "/LessonOnePointTwo" element = {<LessonOnePointTwo/>}/>
        <Route path = "/LessonOnePointThree" element = {<LessonOnePointThree/>}/>
        <Route path = "/LessonOnePointFour" element = {<LessonOnePointFour/>}/>
        <Route path = "/LessonOnePointFive" element = {<LessonOnePointFive/>}/>
        <Route path = "/LessonOnePointSix" element = {<LessonOnePointSix/>}/>
        <Route path = "/LessonOnePointSeven" element = {<LessonOnePointSeven/>}/>
        <Route path = "/LessonOnePointEight" element = {<LessonOnePointEight/>}/>
        <Route path = "/LessonOnePointNine" element = {<LessonOnePointNine/>}/>
        <Route path = "/LessonOnePointTen" element = {<LessonOnePointTen/>}/>
        <Route path = "/LessonOnePointEleven" element = {<LessonOnePointEleven/>}/>
        <Route path = "/LessonOnePointTwelve" element = {<LessonOnePointTwelve/>}/>
        <Route path = "/LessonTwoPointOne" element = {<LessonTwoPointOne/>}/>
        <Route path = "/LessonTwoPointFour" element = {<LessonTwoPointFour/>}/>
        <Route path = "/LessonTwoPointTwo" element = {<LessonTwoPointTwo/>}/>
        <Route path = "/LessonTwoPointThree" element = {<LessonTwoPointThree/>}/>


        <Route path = "/LessonFourPointOne" element = {<LessonFourPointOne/>}/>
        <Route path = "/LessonFourPointTwo" element = {<LessonFourPointTwo/>}/>
        <Route path = "/LessonFourPointThree" element = {<LessonFourPointThree/>}/>


        {/* ... etc. */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
