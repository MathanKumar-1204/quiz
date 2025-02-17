// Header.js
import React from "react";

function Header({ toggleSidebar }) {
  return (
    <header className="p-4 bg-gray-800 text-white flex items-center justify-between shadow-md">
      <button className="text-2xl focus:outline-none" onClick={toggleSidebar}>
        &#9776; {/* Menu icon */}
      </button>
      <h1 className="text-2xl font-bold tracking-wide">Quiz Dashboard</h1>
    </header>
  );
}

export default Header;
