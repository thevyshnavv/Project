import React, { useState } from 'react'
import axios from 'axios'
// import { toast } from 'react-toastify'
import toast from 'react-hot-toast'


function RegisterForm() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    conformPassword: "",
    cart: [],
    orders: [],
    wishlist: [],
    isBlock: true

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
    axios.post("http://localhost:3000/users", user)
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
    <div className="min-h-screen flex items-center justify-center bg-[#10172a]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#1b2340] p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Register in InstruBay
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <span className="block text-sm text-gray-300 mb-1">Name</span>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2 rounded-md bg-[#10172a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <span className="block text-sm text-gray-300 mb-1">Email</span>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 rounded-md bg-[#10172a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <span className="block text-sm text-gray-300 mb-1">Password</span>
            <input
              type="password "
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 rounded-md bg-[#10172a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <span className="block text-sm text-gray-300 mb-1">
              Confirm Password
            </span>
            <input
              type="password    "
              name="conformPassword"
              value={user.conformPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
              className="w-full px-4 py-2 rounded-md bg-[#10172a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )

}

export default RegisterForm