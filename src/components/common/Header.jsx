import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Header = ({search,setSearch}) => {

  const navigate = useNavigate()
  const [isLog, setIsLog] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("userName");

    setIsLog(user);
  }, []);

  

  const handleLogout = () => {
    localStorage.removeItem("userName"); // session end
    setIsLog(false);
    navigate("/loginform");
  };

  return (
    <header className="w-full px-6 py-4">
      <nav className="flex items-center justify-between bg-[#10172a] shadow-md hover:shadow-lg backdrop-blur-xl shadow-xl rounded-full px-6 py-4">

        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-full  bg-gradient-to-br to-cyan-400 shadow-lg">
            <img src="https://i.pinimg.com/736x/d1/b8/f4/d1b8f44b6d4e8486bb233dd680900ee3.jpg" alt="logo" className="text-white font-bold text-lg rounded-full" />
          </div>
          <Link to="/">
          <span className="text-white font-semibold text-lg tracking-wide">
            Instrubay
          </span>
          </Link>
        </div>

        {/* Center: Search */}
        <div className="mx-6">
          <input
            type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            name='search'
            placeholder="Search instruments..."

            // onKeyDownCapture={key==="Enter"}
            className="w-[360px] px-5 py-2 rounded-full bg-white/10 text-white placeholder-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {/* Right: Navigation + Auth */}
        <div className="flex items-center gap-6 text-gray-300 font-medium">
          <a href="/wishlist" className="hover:text-white transition">
            <i className="fa-solid fa-hand-holding-heart fa-beat text-2xl"></i>
          </a>
          <a href="/cart" className="hover:text-white transition">
            <i className="fa-brands fa-opencart fa-bounce text-2xl"></i>
          </a>
          <a href="/orders" className="hover:text-white transition">
            Orders
          </a>

          {isLog ? (<div>
            <button onClick={handleLogout} className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:opacity-90 transition">
              Log out
            </button>
          </div>) : (<div>
            <button onClick={() => navigate("/registerform")} className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:opacity-90 transition mx-10">
              Sign Up
            </button>
            <button onClick={() => navigate("/loginform")} className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md hover:opacity-90 transition">
              Log In
            </button>
          </div>)}
        </div>

      </nav>
    </header>
  );
};

export default Header;