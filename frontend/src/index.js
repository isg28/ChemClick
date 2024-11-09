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
import Congrats from './components/congrats/Congrats';
import LessonOnePointTwo from './components/question/LessonOnePointTwo';

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
        <Route path = "/Congrats" element = {<Congrats/>} />
        <Route path = "/LessonOnePointTwo" element = {<LessonOnePointTwo/>}/>
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
