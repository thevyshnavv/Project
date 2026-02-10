import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from "react-router-dom" 

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
            const res = await axios.get(`http://localhost:3000/users?email=${loginData.email}`)
            //If no user found
            if (res.data.length === 0) {
                alert("User not found")
                return
            }
            const user = res.data[0];
            //Check password
            if (user.password !== loginData.password) {
                alert("Wrong password")
                return
            }
            //optional block check
            if (user.isBlock) {
                alert("User is blocked")
                return
            }
            //Login success
            alert("Login successful")
            //Save user data (basic session)
      localStorage.setItem("userName", JSON.stringify(user))

 

            //Redicret
            if(user.role==="admin"){
                  navigate("/admin");
            }else{
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
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#10172a]">
            <p className="mb-6 text-xl text-gray-200 font-medium">
                Log in to continue
            </p>

            <div className="flex flex-col gap-4 w-full max-w-md p-8 rounded-xl bg-[#1b2340] shadow-lg">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        onChange={handleChange}
                        value={loginData.email}
                        name='email'
                        placeholder="Enter your email"
                        className="px-4 py-2 rounded-md bg-[#10172a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        onChange={handleChange}
                        value={loginData.password}
                        name='password'
                        placeholder="Enter your password"
                        className="px-4 py-2 rounded-md bg-[#10172a] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button type='button'
                    onClick={handleLogin}
                    className="mt-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
                >
                    Submmit Login
                </button>
                <button
                    onClick={()=>navigate("/registerform")}
                    className="mt-4 py-2 rounded-md bg-green-400 text-white font-medium hover:bg-indigo-500 transition"
                >
                    Sign Up
                </button>
            </div>
        </div>
    )

}

export default LoginFrom