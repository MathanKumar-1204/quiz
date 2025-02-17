import React from 'react';
import { useLocation } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const { username, quizName, score, correctPercentage, totalQuestions, totalCorrectAnswers, totalIncorrectAnswers } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-gradient-x">
      <div className="bg-black text-white p-8 rounded-lg shadow-xl w-full max-w-lg transform hover:scale-105 transition duration-300 ease-in-out neon-border">
        <h1 className="text-3xl font-bold mb-6 text-center neon-text animate-pulse">Quiz Result</h1>
        {/* <p className="text-lg mb-4"><span className="font-semibold">Username:</span> {username}</p> */}
        <p className="text-lg mb-4"><span className="font-semibold">Quiz Name:</span> {quizName}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Your score:</span> {score} out of {totalQuestions}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Total Correct Answers:</span> {totalCorrectAnswers}</p>
        <p className="text-lg mb-4"><span className="font-semibold">Total Incorrect Answers:</span> {totalIncorrectAnswers}</p>
        <p className="text-lg font-semibold mt-6 text-blue-300 animate-pulse">Correct Percentage: {correctPercentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default QuizResult;
