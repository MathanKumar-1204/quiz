import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const StartQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const { username } = location.state || {}; // Get username from state
  const [quizName, setQuizName] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // Track user answers
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value);
    setError(null);
  };

  const handleQuizSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/quizzes/${quizName}`);
      const quizData = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setQuizData(quizData);
      resetQuiz(); // Reset quiz states
    } catch (error) {
      console.error("Error fetching quiz:", error);
      setError("Failed to fetch quiz. Please check the quiz name and try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]); // Reset user answers
  };

  const handleOptionClick = (index) => {
    if (userAnswers[currentQuestionIndex] === undefined) {
      const updatedAnswers = [...userAnswers];
      updatedAnswers[currentQuestionIndex] = index; // Store user's answer
      setUserAnswers(updatedAnswers);

      // Update score if the answer is correct
      if (quizData && index === quizData.questions[currentQuestionIndex].correctOption) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quizData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = async () => {
    const correctPercentage = (score / (quizData?.questions.length || 1)) * 100; // Calculate correct percentage
    const totalCorrectAnswers = userAnswers.filter((answer, index) => quizData && answer === quizData.questions[index].correctOption).length;
    const totalIncorrectAnswers = userAnswers.length - totalCorrectAnswers;

    // Log the results to the console
    console.log(`Username: ${username}`);
    console.log(`Quiz Name: ${quizName}`);
    console.log(`Score: ${score}`);
    console.log(`Correct Percentage: ${correctPercentage.toFixed(2)}%`);

    // Navigate to the QuizResult page
    navigate('/quizresult', {
      state: {
        username,
        quizName,
        score,
        correctPercentage,
        totalQuestions: quizData?.questions.length || 0,
        totalCorrectAnswers,
        totalIncorrectAnswers,
      }
    });
  };

  const backgroundStyle = quizData ? { backgroundImage: `url(${quizData.background})` } : {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={backgroundStyle}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4">Start Quiz</h1>

        {!quizData ? (
          <form onSubmit={handleQuizSubmit} className="mb-4">
            <input
              type="text"
              value={quizName}
              onChange={handleQuizNameChange}
              placeholder="Enter Quiz Name"
              className="border p-2 rounded w-full mb-2"
              required
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full" disabled={loading}>
              {loading ? 'Loading...' : 'Start Quiz'}
            </button>
          </form>
        ) : (
          <div>
            {currentQuestionIndex < (quizData?.questions.length || 0) ? (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-4">{quizData.questions[currentQuestionIndex]?.question}</h2>
                <div className={`grid grid-cols-${quizData.layout === '2x2' ? '2' : '1'} gap-4`}>
                  {quizData.questions[currentQuestionIndex]?.options.map((option, index) => (
                    <button
                      key={index}
                      className={`border p-4 rounded-lg w-full transition duration-200 ${userAnswers[currentQuestionIndex] === index
                        ? (index === quizData.questions[currentQuestionIndex].correctOption ? 'bg-green-500' : 'bg-red-500')
                        : 'bg-gray-200'}`}
                      onClick={() => handleOptionClick(index)}
                      disabled={userAnswers[currentQuestionIndex] !== undefined}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {userAnswers[currentQuestionIndex] !== undefined && (
                  <div className="mt-4">
                    <p className="text-lg">{userAnswers[currentQuestionIndex] === quizData.questions[currentQuestionIndex].correctOption ? 'Correct!' : 'Wrong!'}</p>
                    <button
                      onClick={handleNextQuestion}
                      className="bg-blue-600 text-white p-2 rounded mt-2"
                    >
                      {currentQuestionIndex === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4">
                <h2 className="text-xl font-bold">Quiz Complete!</h2>
                <p>Your score: {score} out of {quizData?.questions.length || 0}</p>
                <button onClick={handleFinishQuiz} className="bg-blue-600 text-white p-2 rounded mt-2">
                  Save Score
                </button>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default StartQuiz;
