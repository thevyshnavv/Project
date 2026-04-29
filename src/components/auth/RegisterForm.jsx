import React, { useState } from 'react'
import api from '../../api';
import toast from 'react-hot-toast'
import bgImage from "../../assets/register_picture.jpg";



function RegisterForm() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
    role: "user",
    cart: [],
    orders: [],
    wishlist: [],
    isBlock: false

  })
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (user.password !== user.conformPassword) {
      toast.error("Password does not match", {
        duration: 2000,
      })
      return;
    }
    api.post("/users", user)
      .then((res) => {
        
        toast.success("Registration succesful")
        window.location.href = "/loginform";
        setUser({ name: '', email: '', password: '', conformPassword: "" })
      })

      .catch((e) => {
        toast.error("something went wrong", {
          duration: 2000,
        })
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
    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl"
    >
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Create Account
      </h2>

      <div className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm text-gray-200 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="conformPassword"
            value={user.conformPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="mt-4 w-full py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-pink-600 transition duration-300 shadow-lg"
        >
          Register
        </button>
      </div>
    </form>
  </div>
);


}

export default RegisterForm