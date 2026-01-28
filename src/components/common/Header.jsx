import React from 'react'
import { useNavigate } from 'react-router-dom';
const Header = () => {

  const isLog = localStorage.getItem("username")
  const navigate = useNavigate()

  return (
    <header className="w-full px-6 py-4">
      <nav className="flex items-center justify-between bg-[#10172a]/80 backdrop-blur-xl shadow-xl rounded-2xl px-6 py-4">

        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg">
            <span className="text-white font-bold text-lg">I</span>
          </div>
          <span className="text-white font-semibold text-lg tracking-wide">
            Instrubay
          </span>
        </div>

        {/* Center: Search */}
        <div className="mx-6">
          <input
            type="text"
            placeholder="Search instruments..."
            className="w-[360px] px-5 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Right: Navigation + Auth */}
        <div className="flex items-center gap-6 text-gray-300 font-medium">
          <a href="#" className="hover:text-white transition">
            About
          </a>
          <a href="#" className="hover:text-white transition">
            Cart
          </a>
          {isLog ? <div>
            <button className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:opacity-90 transition">
              Log out
            </button>
          </div> : <div>
            <button onClick={()=>navigate("/registerform")} className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:opacity-90 transition mx-10">
              Sign Up
            </button>
            <button onClick={()=>navigate("/loginform")} className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:opacity-90 transition">
              Log In
            </button>
          </div>}
        </div>

      </nav>
    </header>
  );
};

export default Header;
