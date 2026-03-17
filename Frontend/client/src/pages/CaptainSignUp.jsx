import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo2 from '../assets/logo2.png'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  // eslint-disable-next-line no-unused-vars
  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      )

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }

    } catch (error) {
      console.error("Captain Signup Error:", error)
      alert("Signup failed")
    }

    // reset
    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')

  }

  return (
    <div className='h-screen w-full bg-white flex flex-col justify-between p-7'>

      {/* 🔝 Top Section */}
      <div>

        {/* Logo */}
        <img className='w-24 mb-8' src={logo2} alt="logo" />

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

          {/* Vehicle Info */}
          <h3 className='text-lg font-medium mb-2 text-black'>
            Vehicle Information
          </h3>

          <div className='flex gap-4 mb-6'>
            <input
              required
              className='w-1/2 rounded-lg px-4 py-3 border text-lg outline-none border-[#e56f96] focus:ring-2 focus:ring-[#e56f96]'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
            />

            <input
              required
              className='w-1/2 rounded-lg px-4 py-3 border text-lg outline-none border-[#e56f96] focus:ring-2 focus:ring-[#e56f96]'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
            />
          </div>

          <div className='flex gap-4 mb-6'>
            <input
              required
              className='w-1/2 rounded-lg px-4 py-3 border text-lg outline-none border-[#e56f96] focus:ring-2 focus:ring-[#e56f96]'
              type="number"
              placeholder='Capacity'
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
            />

            <select
              required
              className='w-1/2 rounded-lg px-4 py-3 border text-lg outline-none border-[#e56f96] focus:ring-2 focus:ring-[#e56f96]'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled>Select Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          {/* Button */}
          <button
            className='bg-[#e56f96] text-white font-semibold mb-3 rounded-2xl px-4 py-3 w-full text-lg hover:bg-[#d95d86] transition'
          >
            Create Captain Account
          </button>

        </form>

        {/* Login Link */}
        <p className='text-center text-sm text-black'>
          Already have an account?{" "}
          <Link to='/captain-login' className='text-[#e56f96] font-semibold'>
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

export default CaptainSignup