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
import LessonTwoPointTwo from './components/question/LessonTwoPointTwo';
import LessonTwoPointThree from './components/question/LessonTwoPointThree';
import LessonTwoPointFour from './components/question/LessonTwoPointFour';
import LessonTwoPointFive from './components/question/LessonTwoPointFive';
import LessonTwoPointSix from './components/question/LessonTwoPointSix';

import LessonThreePointOne from './components/question/LessonThreePointOne';
import LessonThreePointTwo from './components/question/LessonThreePointTwo';

import LessonFourPointOne from './components/question/LessonFourPointOne';
import LessonFourPointTwo from './components/question/LessonFourPointTwo';
import LessonFourPointThree from './components/question/LessonFourPointThree';

import LessonFivePointOne from './components/question/LessonFivePointOne';
import LessonFivePointTwo from './components/question/LessonFivePointTwo';
import LessonFivePointThree from './components/question/LessonFivePointThree';
import LessonFivePointFour from './components/question/LessonFivePointFour';
import LessonFivePointFive from './components/question/LessonFivePointFive';
import LessonFivePointSix from './components/question/LessonFivePointSix';
import LessonFivePointSeven from './components/question/LessonFivePointSeven';
import LessonFivePointEight from './components/question/LessonFivePointEight';
import LessonFivePointNine from './components/question/LessonFivePointNine';
import LessonFivePointTen from './components/question/LessonFivePointTen';
import LessonFivePointEleven from './components/question/LessonFivePointEleven';
import LessonFivePointTwelve from './components/question/LessonFivePointTwelve';

import LessonSixPointOne from './components/question/LessonSixPointOne';
import LessonSixPointTwo from './components/question/LessonSixPointTwo';
import LessonSixPointThree from './components/question/LessonSixPointThree';
import LessonSixPointFour from './components/question/LessonSixPointFour';
import LessonSixPointFive from './components/question/LessonSixPointFive';
import LessonSixPointSix from './components/question/LessonSixPointSix';
import LessonSixPointSeven from './components/question/LessonSixPointSeven';
import LessonSixPointEight from './components/question/LessonSixPointEight';
import LessonSixPointNine from './components/question/LessonSixPointNine';
import LessonSixPointTen from './components/question/LessonSixPointTen';
import LessonSixPointEleven from './components/question/LessonSixPointEleven';
import LessonSixPointTwelve from './components/question/LessonSixPointTwelve';
import LessonSixPointThirteen from './components/question/LessonSixPointThirteen';
import LessonSixPointFourteen from './components/question/LessonSixPointFourteen';
import LessonSixPointFifteen from './components/question/LessonSixPointFifteen';
import LessonSixPointSixteen from './components/question/LessonSixPointSixteen';
import LessonSixPointSeventeen from './components/question/LessonSixPointSeventeen';
import LessonSixPointEighteen from './components/question/LessonSixPointEighteen';
import LessonSixPointNineteen from './components/question/LessonSixPointNineteen';
import LessonSixPointTwenty from './components/question/LessonSixPointTwenty';


import LessonSevenPointOne from './components/question/LessonSevenPointOne';
import LessonSevenPointTwo from './components/question/LessonSevenPointTwo';
import LessonSevenPointThree from './components/question/LessonSevenPointThree';
import LessonSevenPointFour from './components/question/LessonSevenPointFour';
import LessonSevenPointFive from './components/question/LessonSevenPointFive';
import LessonSevenPointSix from './components/question/LessonSevenPointSix';
import LessonSevenPointSeven from './components/question/LessonSevenPointSeven';
import LessonSevenPointEight from './components/question/LessonSevenPointEight';
import LessonSevenPointNine from './components/question/LessonSevenPointNine';
import LessonSevenPointTen from './components/question/LessonSevenPointTen';
import LessonSevenPointEleven from './components/question/LessonSevenPointEleven';
import LessonSevenPointTwelve from './components/question/LessonSevenPointTwelve';



import LessonEightPointOne from './components/question/LessonEightPointOne';
import LessonEightPointTwo from './components/question/LessonEightPointTwo';
import LessonEightPointThree from './components/question/LessonEightPointThree';
import LessonEightPointFour from './components/question/LessonEightPointFour';

import LessonNinePointOne from './components/question/LessonNinePointOne';
import LessonNinePointTwo from './components/question/LessonNinePointTwo';
import LessonNinePointThree from './components/question/LessonNinePointThree';
import LessonNinePointFour from './components/question/LessonNinePointFour';
import LessonNinePointFive from './components/question/LessonNinePointFive';
import LessonNinePointSix from './components/question/LessonNinePointSix';
import LessonNinePointSeven from './components/question/LessonNinePointSeven';
import LessonNinePointEight from './components/question/LessonNinePointEight';
import LessonNinePointNine from './components/question/LessonNinePointNine';

import LessonTenPointOne from './components/question/LessonTenPointOne';
import LessonTenPointTwo from './components/question/LessonTenPointTwo';
import LessonTenPointThree from './components/question/LessonTenPointThree';

import LessonElevenPointOne from './components/question/LessonElevenPointOne';
import LessonElevenPointThree from './components/question/LessonElevenPointThree';

import TeacherLogin from './components/teacherlogin/TeacherLogin';

import ProtectedRoute from "./ProtectedRoute";

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
        <Route
          path="/teacherdashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route path = "/ConfirmEmail" element = {<ConfirmEmail/>} />
        <Route path = "/NewPassword" element = {<NewPassword/>} />
        <Route path="/statistics/:lessonId" element={<Statistics />} />
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
        <Route path = "/LessonTwoPointTwo" element = {<LessonTwoPointTwo/>}/>
        <Route path = "/LessonTwoPointThree" element = {<LessonTwoPointThree/>}/>
        <Route path = "/LessonTwoPointFour" element = {<LessonTwoPointFour/>}/>
        <Route path = "/LessonTwoPointFive" element = {<LessonTwoPointFive/>}/>
        <Route path = "/LessonTwoPointSix" element = {<LessonTwoPointSix/>}/>

        <Route path = "/LessonThreePointOne" element = {<LessonThreePointOne/>}/>
        <Route path = "/LessonThreePointTwo" element = {<LessonThreePointTwo/>}/>

        <Route path = "/LessonFourPointOne" element = {<LessonFourPointOne/>}/>
        <Route path = "/LessonFourPointTwo" element = {<LessonFourPointTwo/>}/>
        <Route path = "/LessonFourPointThree" element = {<LessonFourPointThree/>}/>

        <Route path = "/LessonFivePointOne" element = {<LessonFivePointOne/>}/>
        <Route path = "/LessonFivePointTwo" element = {<LessonFivePointTwo/>}/>
        <Route path = "/LessonFivePointThree" element = {<LessonFivePointThree/>}/>
        <Route path = "/LessonFivePointFour" element = {<LessonFivePointFour/>}/>
        <Route path = "/LessonFivePointFive" element = {<LessonFivePointFive/>}/>
        <Route path = "/LessonFivePointSix" element = {<LessonFivePointSix/>}/>
        <Route path = "/LessonFivePointSeven" element = {<LessonFivePointSeven/>}/>
        <Route path = "/LessonFivePointEight" element = {<LessonFivePointEight/>}/>
        <Route path = "/LessonFivePointNine" element = {<LessonFivePointNine/>}/>
        <Route path = "/LessonFivePointTen" element = {<LessonFivePointTen/>}/>
        <Route path = "/LessonFivePointEleven" element = {<LessonFivePointEleven/>}/>
        <Route path = "/LessonFivePointTwelve" element = {<LessonFivePointTwelve/>}/>

        <Route path = "/LessonSixPointOne" element = {<LessonSixPointOne/>}/>
        <Route path = "/LessonSixPointTwo" element = {<LessonSixPointTwo/>}/>
        <Route path = "/LessonSixPointThree" element={<LessonSixPointThree />} />
        <Route path = "/LessonSixPointFour" element={<LessonSixPointFour />} />
        <Route path = "/LessonSixPointFive" element={<LessonSixPointFive />} />
        <Route path = "/LessonSixPointSix" element={<LessonSixPointSix />} />
        <Route path = "/LessonSixPointSeven" element={<LessonSixPointSeven />} />
        <Route path = "/LessonSixPointEight" element={<LessonSixPointEight />} />
        <Route path = "/LessonSixPointNine" element={<LessonSixPointNine />} />
        <Route path = "/LessonSixPointTen" element={<LessonSixPointTen />} />
        <Route path = "/LessonSixPointEleven" element={<LessonSixPointEleven />} />
        <Route path = "/LessonSixPointTwelve" element={<LessonSixPointTwelve />} />
        <Route path = "/LessonSixPointThirteen" element={<LessonSixPointThirteen />} />
        <Route path = "/LessonSixPointFourteen" element={<LessonSixPointFourteen />} />
        <Route path = "/LessonSixPointFifteen" element={<LessonSixPointFifteen />} />
        <Route path = "/LessonSixPointSixteen" element={<LessonSixPointSixteen />} />
        <Route path = "/LessonSixPointSeventeen" element={<LessonSixPointSeventeen />} />
        <Route path = "/LessonSixPointEighteen" element={<LessonSixPointEighteen />} />
        <Route path = "/LessonSixPointNineteen" element={<LessonSixPointNineteen />} />
        <Route path = "/LessonSixPointTwenty" element={<LessonSixPointTwenty />} />


        <Route path = "/LessonSevenPointOne" element = {<LessonSevenPointOne/>}/>
        <Route path = "/LessonSevenPointTwo" element = {<LessonSevenPointTwo/>}/>
        <Route path = "/LessonSevenPointThree" element = {<LessonSevenPointThree/>}/>
        <Route path = "/LessonSevenPointFour" element = {<LessonSevenPointFour/>}/>
        <Route path = "/LessonSevenPointFive" element = {<LessonSevenPointFive/>}/>
        <Route path = "/LessonSevenPointSix" element={<LessonSevenPointSix />} />
        <Route path = "/LessonSevenPointSeven" element={<LessonSevenPointSeven />} />
        <Route path = "/LessonSevenPointEight" element={<LessonSevenPointEight />} />
        <Route path = "/LessonSevenPointNine" element={<LessonSevenPointNine />} />
        <Route path = "/LessonSevenPointTen" element={<LessonSevenPointTen />} />
        <Route path = "/LessonSevenPointEleven" element={<LessonSevenPointEleven />} />
        <Route path = "/LessonSevenPointTwelve" element={<LessonSevenPointTwelve />} />

        <Route path = "/LessonEightPointOne" element = {<LessonEightPointOne/>}/>
        <Route path = "/LessonEightPointTwo" element = {<LessonEightPointTwo/>}/>
        <Route path = "/LessonEightPointThree" element = {<LessonEightPointThree/>}/>
        <Route path = "/LessonEightPointFour" element = {<LessonEightPointFour/>}/>

        <Route path = "/LessonNinePointOne" element = {<LessonNinePointOne/>}/>
        <Route path = "/LessonNinePointTwo" element = {<LessonNinePointTwo/>}/>
        <Route path = "/LessonNinePointThree" element = {<LessonNinePointThree/>}/>
        <Route path = "/LessonNinePointFour" element = {<LessonNinePointFour/>}/>
        <Route path = "/LessonNinePointFive" element = {<LessonNinePointFive/>}/>
        <Route path = "/LessonNinePointSix" element = {<LessonNinePointSix/>}/>
        <Route path = "/LessonNinePointSeven" element = {<LessonNinePointSeven/>}/>
        <Route path = "/LessonNinePointEight" element = {<LessonNinePointEight/>}/>
        <Route path = "/LessonNinePointNine" element = {<LessonNinePointNine/>}/>

        <Route path = "/LessonTenPointOne" element = {<LessonTenPointOne/>}/>
        <Route path = "/LessonTenPointTwo" element = {<LessonTenPointTwo/>}/>
        <Route path = "/LessonTenPointThree" element = {<LessonTenPointThree/>}/>

        <Route path = "/LessonElevenPointOne" element = {<LessonElevenPointOne/>}/>
        <Route path = "/LessonElevenPointThree" element = {<LessonElevenPointThree/>}/>
        
        <Route path = "/teacherlogin" element = {<TeacherLogin/>}/>


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