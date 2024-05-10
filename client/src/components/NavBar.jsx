import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink

const Navbar = ({ isLoggedIn, onLogout }) => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-indigo-500 text-white px-4 py-2 flex justify-between items-center">
      <h1 className="text-xl font-bold text-white">Your Shop Name</h1>
      <ul className="flex space-x-4">
        {isLoggedIn ? (
          <li>
            <button className="text-gray-300 hover:text-white" onClick={onLogout}>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/login" className="text-gray-300 hover:text-white">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="text-gray-300 hover:text-white">
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
