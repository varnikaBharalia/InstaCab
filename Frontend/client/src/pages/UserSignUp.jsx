import React, { useState , useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo2 from '../assets/logo2.png'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext.jsx'


const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async(e) => {

    e.preventDefault()

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      )

      if (response.status === 201) {
        const data = response.data

        // store user in context
        setUser(data.user)

        // store token
        localStorage.setItem('token', data.token)

        // redirect
        navigate('/home')
      }

    } catch (error) {
      console.error("Signup Error:", error)
      alert("Something went wrong")
    }
    
    console.log(newUser)

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')

    // navigate('/login')
  }

  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between p-7'>

      {/* 🔝 Top Section */}
      <div>

        {/* Logo */}
        <img className='w-24 mb-10' src={logo2} alt="logo" />

        {/* Form */}
        <form onSubmit={submitHandler}>

          {/* Name */}
          <h3 className='text-lg font-medium mb-2 text-black'>
            What's your name
          </h3>

          <div className='flex gap-4 mb-6'>
            <input
              required
              className='w-1/2 rounded-lg px-4 py-3 border text-lg outline-none border-[#e56f96] focus:ring-2 focus:ring-[#e56f96]'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              required
              className='w-1/2 rounded-lg px-4 py-3 border text-lg outline-none border-[#e56f96] focus:ring-2 focus:ring-[#e56f96]'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Button */}
          <button
            className='bg-[#e56f96] text-white font-semibold mb-3 rounded-2xl px-4 py-3 w-full text-lg hover:bg-[#d95d86] transition'
          >
            Create Account
          </button>

        </form>

        {/* Login Link */}
        <p className='text-center text-sm text-black'>
          Already have an account?{" "}
          <Link to='/login' className='text-[#e56f96] font-semibold'>
            Login here
          </Link>
        </p>

      </div>

      {/* 🔽 Bottom Note */}
      <div>
        <p className='text-[11px] text-gray-500 leading-tight text-center'>
          This site is protected by reCAPTCHA and the{" "}
          <span className='underline'>Google Privacy Policy</span> and{" "}
          <span className='underline'>Terms of Service</span> apply.
        </p>
      </div>

    </div>
  )
}

export default UserSignup