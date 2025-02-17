import { useState } from "react";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/api/signup", { // Change port to 5000

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 via-blue-500 to-green-500">
      <form onSubmit={handleSignup} className="p-8 bg-white shadow-lg rounded-lg w-80">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500 text-center mb-6">
          Create Account
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 hover:border-purple-500 transition duration-200"
          required
          aria-label="Username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400 hover:border-purple-500 transition duration-200"
          required
          aria-label="Password"
        />
        <button
          type="submit"
          className="w-full p-3 mb-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded hover:from-purple-500 hover:to-green-500 transition-all duration-300"
        >
          Sign Up
        </button>
        {message && <p className="mt-4 text-center text-red-500 font-medium">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;
