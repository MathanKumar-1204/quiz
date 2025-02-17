// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import StartQuiz from './StartQuiz';
import QuizResult from './QuizResults';
import About from "./About";
import Help from "./Help";
// import Candidate from './Candidate';
// import Employer from './Employer';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for login page */}
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          {/* Route for sign-up page */}
          <Route path="/signup" element={<SignUp />} />
          
          {/* Route for starting quiz */}
          <Route path="/startquiz" element={<StartQuiz />} />
          
          {/* Route for dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Route for quiz results page */}
          <Route path="/quizresult" element={<QuizResult />} />
          
          {/* Uncomment these routes once the components are ready */}
          {/* <Route path="/candidate" element={<Candidate />} /> */}
          {/* <Route path="/employer" element={<Employer />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
