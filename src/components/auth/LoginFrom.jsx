import api from '../../api';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import bgImage from "../../assets/login_picture_6.jpeg";
import toast from 'react-hot-toast';

function LoginFrom() {
  const navigate = useNavigate()

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }
  const handleLogin = async (e) => {
    e.preventDefault();

    //Check user by email

    try {
      const res = await api.get(`/users?email=${loginData.email}`)
      //If no user found
      if (res.data.length === 0) {
        toast.error("user nod found")
        return
      }
      const user = res.data[0];
      //Check password
      if (user.password !== loginData.password) {
        toast.error("Wrong password")
        return
      }
      //optional block check
      if (user.isBlock) {
        toast.error("user is blocked")
        return
      }
      //Login success
      toast.success("Login successful")
      //Save user data (basic session)
      localStorage.setItem("userName", JSON.stringify(user))



      //Redicret
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
    catch (error) {
      console.log(error)
      alert('Something went wrong')
    }
    setLoginData({
      email: '',
      password: ''
    })
  }
  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        {/* Email */}
        <div className="flex flex-col mb-4">
          <label className="text-sm text-gray-200 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col mb-6">
          <label className="text-sm text-gray-200 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Login Button */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition duration-300 shadow-lg"
        >
          Login
        </button>

        {/* Divider */}
        <div className="text-center text-gray-300 my-4">or</div>

        {/* Signup Button */}
        <button
          onClick={() => navigate("/registerform")}
          className="w-full py-2 rounded-lg bg-gray-400 text-black font-semibold hover:bg-gray-200 transition duration-300"
        >
          Create Account
        </button>
      </div>
    </div>
  );


}

export default LoginFrom