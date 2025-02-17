import { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:5000/api/login", { // Change port to 5000

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Logged in successfully");
        // Redirect to Dashboard (this can be done using React Router)
        window.location.href = "/dashboard"; // Change to your routing solution
      }
       else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 text-center mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition duration-200"
            required
            aria-label="Username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-500 transition duration-200"
            required
            aria-label="Password"
          />
          <button
            type="submit"
            className="w-full p-3 mb-4 font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
          >
            Log In
          </button>
          {message && <p className="mt-4 text-center text-red-500 font-medium">{message}</p>}
        </form>
        <p className="text-center mt-6">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-blue-500 hover:text-purple-500 transition duration-200"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
