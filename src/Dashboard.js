// DashboardC.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "./Header"; // Ensure Header is correctly imported
import Sidebar from "./Sidebar"; // Ensure Sidebar is correctly imported
import bg1 from './bg1.jpg';
import bg2 from './bg2.webp';
import bg3 from './bg3.jpg';
import bg4 from './bg4.jpg';

function DashboardC() {
  const navigate = useNavigate();
  const [isCreateInputVisible, setIsCreateInputVisible] = useState(false);
  const [quizName, setQuizName] = useState("");
  const [isStartInputVisible, setIsStartInputVisible] = useState(false);
  const [startQuizName, setStartQuizName] = useState("");
  const [username, setUsername] = useState("");

  const [step, setStep] = useState(1); // Step tracking (1: Create Quiz, 2: Background, 3: Layout, 4: Questions)
  const [selectedBg, setSelectedBg] = useState("");
  const [layoutOption, setLayoutOption] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Toggle visibility for creating and starting quiz inputs
  const handleCreateQuizClick = () => {
    setIsCreateInputVisible(true);
    setIsStartInputVisible(false);
  };
 
  const handleStartQuizClick = () => {
    navigate('/startquiz', { state: { username } });
  };

  // Input change handlers
  const handleQuizNameChange = (event) => setQuizName(event.target.value);
  const handleStartQuizNameChange = (event) => setStartQuizName(event.target.value);
  const handleUsernameChange = (event) => setUsername(event.target.value);

  // Step-by-step handlers
  const handleBackgroundSelect = (bg) => setSelectedBg(bg);
  const handleLayoutSelect = (layout) => setLayoutOption(layout);
  const handleNumQuestionsChange = (e) => setNumQuestions(parseInt(e.target.value) || 0);

  // Initialize questions array when number of questions is set
  const handleNextToQuestions = () => {
    const emptyQuestions = Array.from({ length: numQuestions }, () => ({
      question: "",
      options: ["", "", "", ""],
      correctOption: -1 // -1 indicates no correct option is selected initially
    }));
    setQuestions(emptyQuestions);
    setStep(4); // Move to questions step
  };

  // Handle question and option changes
  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Handle setting the correct option
  const handleCorrectOptionSelect = (qIndex, optIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].correctOption = optIndex;
    setQuestions(updatedQuestions);
  };

  // Submitting the quiz data
  const handleQuizSubmit = async () => {
    if (quizName.trim()) {
      const quizData = {
        quizName,
        background: selectedBg,
        layout: layoutOption,
        questions
      };
  
      // Validate that each question has a correct option selected
      const isValid = quizData.questions.every(q => q.correctOption !== -1);
      if (!isValid) {
        alert("Please select a correct option for each question.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/quizzes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(quizData)
        });
  
        if (!response.ok) {
          throw new Error("Failed to create quiz");
        }
  
        console.log("Quiz Created:", quizData);
        resetForm();
      } catch (error) {
        console.error("Error creating quiz:", error);
      }
    } else {
      alert("Please enter a quiz name.");
    }
  };
  

  const resetForm = () => {
    setQuizName("");
    setIsCreateInputVisible(false);
    setStep(1);
    setSelectedBg("");
    setLayoutOption("");
    setNumQuestions(0);
    setQuestions([]);
  };

  return (
    <div 
  className="flex flex-col items-center justify-center min-h-screen p-8 space-y-6 bg-gray-50" 
  style={{ 
    backgroundImage: `url("https://images.pexels.com/photos/5428830/pexels-photo-5428830.jpeg?auto=compress&cs=tinysrgb&w=600")`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  }}
>

      <div className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-lg">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        username={username}
        handleLogout={() => console.log("Logout")} // Replace with actual logout logic
      />

      {/* Step 1: Create Quiz Button */}
      {step === 1 && (
        <div className="w-full max-w-lg text-center">
          <button
  className="w-full p-4 text-xl font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200 mb-4" // Added mb-4 for margin-bottom
  onClick={handleCreateQuizClick}
>
  Create New Quiz
</button>
<button
  className="w-full p-4 text-xl mt-4 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200"
  onClick={handleStartQuizClick}
>
  Start Quiz
</button>

          {isCreateInputVisible && (
            <div className="mt-6 space-y-4">
              <input
                type="text"
                placeholder="Enter quiz name"
                value={quizName}
                onChange={handleQuizNameChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <button
                className="w-full p-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition duration-200"
                onClick={() => setStep(2)} // Proceed to background selection
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* Step 2: Background Selection */}
      {step === 2 && (
        <div className="w-full max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Background</h2>
          <div className="grid grid-cols-2 gap-6">
            {[bg1, bg2, bg3, bg4].map((bg, index) => (
             <div
             key={index}
             className={`p-4 border rounded-lg cursor-pointer transition duration-200 ${
               selectedBg === bg 
                 ? "border-green-500 shadow-lg shadow-green-500/50" 
                 : "border-gray-300 shadow-none"
             }`}
             onClick={() => handleBackgroundSelect(bg)}
           >
             <img src={bg} alt={`Background ${index + 1}`} className="w-32 h-32 rounded-md object-cover" />
           </div>
           
            ))}
          </div>
          {selectedBg && (
            <button
              className="mt-6 w-full p-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200"
              onClick={() => setStep(3)} // Proceed to layout selection
            >
              Next
            </button>
          )}
        </div>
      )}

      {/* Step 3: Layout Selection */}
      {step === 3 && (
        <div className="w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select Quiz Layout</h2>
          <div className="flex space-x-4 justify-center">
            <button
              className={`w-1/2 p-4 rounded-lg shadow-md transition duration-200 ${layoutOption === "2x2" ? "bg-blue-600 text-white" : "bg-gray-200"} hover:bg-blue-500`}
              onClick={() => handleLayoutSelect("2x2")}
            >
              2x2 Layout
            </button>
            <button
              className={`w-1/2 p-4 rounded-lg shadow-md transition duration-200 ${layoutOption === "4x1" ? "bg-blue-600 text-white" : "bg-gray-200"} hover:bg-blue-500`}
              onClick={() => handleLayoutSelect("4x1")}
            >
              4x1 Layout
            </button>
          </div>
          {layoutOption && (
            <div className="mt-6">
              <input
                type="number"
                placeholder="Enter number of questions"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <button
                  className="mt-4 w-full p-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-200"
                  onClick={handleNextToQuestions}
                >
                  Next
                </button>
            </div>
          )}
        </div>
      )}

{step === 4 && (
  <div className="w-full max-w-2xl text-center">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enter Questions and Options</h2>
    {questions.map((q, qIndex) => (
      <div key={qIndex} className="p-4 border border-gray-300 rounded-lg mb-4">
        <input
          type="text"
          placeholder={`Question ${qIndex + 1}`}
          value={q.question}
          onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-1 gap-2">
          {q.options.map((option, optIndex) => (
            <div key={optIndex} className="flex items-center">
              <input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="radio"
                name={`correctOption-${qIndex}`}
                checked={q.correctOption === optIndex}
                onChange={() => handleCorrectOptionSelect(qIndex, optIndex)}
                className="ml-4"
              />
            </div>
          ))}
        </div>
      </div>
    ))}
    <button
      className="mt-6 w-full p-3 text-lg font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition duration-200"
      onClick={handleQuizSubmit}
    >
      Submit Quiz
    </button>
  </div>
)}

      
    </div>
  );
}

export default DashboardC;
