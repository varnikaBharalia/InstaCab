
import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const Start = () => {
    return (
        <div>
            <div className='h-screen w-full bg-[#e56f96] flex flex-col justify-between p-6'>

                {/* 🔝 Empty top space */}
                <div></div>

                {/* 🎯 Center Logo */}
                <div className='flex justify-center items-center'>
                    <img
                        src={logo}
                        alt="InstaCab Logo"
                        className="w-72 object-contain"
                    />
                </div>

                {/* 🔽 Bottom Button */}
                <div className='w-full'>
                    <Link to='/login' className='w-full flex items-center justify-center gap-2 bg-white text-[#e56f96] font-semibold py-4 shadow-2xl rounded-xl text-lg border border-white hover:bg-gray-100 transition'>
                        Get Started
                        <span className="text-xl">→</span>
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default Start
