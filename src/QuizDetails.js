import React, { useState } from "react";

function QuizDetails({ quizName, onSubmit }) {
  const [questionCount, setQuestionCount] = useState(1);
  const [questions, setQuestions] = useState([{ question: "", options: ["", "", "", ""] }]);

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", options: ["", "", "", ""] }]);
    setQuestionCount(questionCount + 1);
  };

  const handleSubmit = () => {
    const quizData = {
      quizName,
      questions,
    };
    console.log("Submitting quiz data:", quizData);
    onSubmit();
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Quiz Details</h2>
      <p>Quiz Name: {quizName}</p>
      <div className="space-y-4">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border p-4">
            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="p-2 border-b w-full"
            />
            <div className="mt-2 space-y-2">
              {q.options.map((opt, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  className="p-2 border-b w-full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddQuestion}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Another Question
      </button>
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
}

export default QuizDetails;
