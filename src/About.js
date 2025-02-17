import React from "react";

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white p-6">
      <h1 className="text-4xl font-bold mb-6 neon-text">About Us</h1>
      <p className="text-lg max-w-md text-center leading-relaxed">
        This app was created to help users enhance their knowledge through interactive quizzes. 
        Enjoy your learning journey with a modern, user-friendly design!
      </p>
    </div>
  );
}

export default About;
