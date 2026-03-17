import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo2 from '../assets/logo2.png'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()

    const userData = {
      email,
      password
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      )

      if (response.status === 200) {
        const data = response.data

        // store user globally
        setUser(data.user)

        // store token
        localStorage.setItem('token', data.token)

        // redirect
        navigate('/home')
      }

    } catch (error) {
      console.error("Login Error:", error)
      alert("Invalid email or password")
    }

    // reset fields
    setEmail('')
    setPassword('')
  }

  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between p-7'>

      {/* 🔝 Top Section */}
      <div>

        {/* Logo */}
        <img className='w-24 mb-10' src={logo2} alt="logo" />

        {/* Form */}
        <form onSubmit={submitHandler}>

          <h3 className='text-lg font-medium mb-2 text-black'>
            What's your email
          </h3>

          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='mb-6 rounded-lg px-4 py-3 border w-full text-lg outline-none border-[#e56f96] focus:ring-2 focus:ring-[#e56f96]'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2 text-black'>
            Enter Password
          </h3>

          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='mb-6 rounded-lg px-4 py-3 border w-full text-lg outline-none border-[#e56f96] focus:ring-2 focus:ring-[#e56f96]'
            type="password"
            placeholder='password'
          />

          {/* Login Button */}
          <button
            className='bg-[#e56f96] text-white font-semibold mb-3 rounded-2xl px-4 py-3 w-full text-lg hover:bg-[#d95d86] transition'
          >
            Login
          </button>

        </form>

        {/* Signup */}
        <p className='text-center text-sm text-black'>
          New here?{" "}
          <Link to='/signup' className='text-[#e56f96] font-semibold'>
            Create new Account
          </Link>
        </p>

      </div>

      {/* 🔽 Bottom Button */}
      <div>
        <Link
          to='/captain-login'
          className='bg-white flex items-center justify-center text-[#e56f96] font-semibold border-2 border-[#e56f96] mb-5 rounded-2xl px-4 py-3 w-full text-lg hover:bg-[#e56f96] hover:text-white transition'
        >
          Sign in as Captain
        </Link>
      </div>

    </div>
  )
}

export default UserLogin