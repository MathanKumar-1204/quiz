import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar, username, handleLogout }) {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-900 bg-opacity-95 text-white transition-transform transform shadow-2xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "250px" }}
    >
      <button className="p-4 text-2xl focus:outline-none neon-text" onClick={toggleSidebar}>
        &#x2716; {/* Close icon */}
      </button>
      <div className="p-6">
        <div className="flex items-center mb-8">
          <span className="text-4xl neon-text mr-3">👤</span>
          <span className="text-xl font-bold neon-text">{username}</span>
        </div>
        <nav className="space-y-4">
          <p
            className="hover:bg-gray-700 hover:text-blue-400 p-2 rounded cursor-pointer transition duration-300"
            onClick={() => navigate('/about')}
          >
            About
          </p>
          <p
            className="hover:bg-gray-700 hover:text-blue-400 p-2 rounded cursor-pointer transition duration-300"
            onClick={() => navigate('/help')}
          >
            Help
          </p>
          <p
            className="hover:bg-gray-700 hover:text-red-400 p-2 rounded cursor-pointer transition duration-300"
            onClick={() => navigate('/')}
          >
            Logout
          </p>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
