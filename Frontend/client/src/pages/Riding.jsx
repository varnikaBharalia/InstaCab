// // import React from 'react'
// // import { Link, useLocation } from 'react-router-dom' // Added useLocation
// // import { useEffect, useContext } from 'react'
// // import { SocketContext } from '../context/SocketContext'
// // import { useNavigate } from 'react-router-dom'
// // import LiveTracking from '../components/LiveTracking'


// // const Riding = () => {
// //     const location = useLocation()
// //     const { ride } = location.state || {} // Retrieve ride data
// //     const { socket } = useContext(SocketContext)
// //     const navigate = useNavigate()

// //     socket.on("ride-ended", () => {
// //         navigate('/home')
// //     })

// //     return (
// //         <div className='h-screen'>
// //             <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
// //                 <i className="text-lg font-medium ri-home-5-line"></i>
// //             </Link>
// //             <div className='h-1/2'>
// //                 <LiveTracking />
// //             </div>
// //             <div className='h-1/2 p-4'>
// //                 <div className='flex items-center justify-between'>
// //                     <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
// //                     <div className='text-right'>
// //                         <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
// //                         <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>

// //                         <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>

// //                     </div>
// //                 </div>

// //                 <div className='flex gap-2 justify-between flex-col items-center'>
// //                     <div className='w-full mt-5'>

// //                         <div className='flex items-center gap-5 p-3 border-b-2'>
// //                             <i className="text-lg ri-map-pin-2-fill"></i>
// //                             <div>
// //                                 <h3 className='text-lg font-medium'>562/11-A</h3>
// //                                 <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
// //                             </div>
// //                         </div>
// //                         <div className='flex items-center gap-5 p-3'>
// //                             <i className="ri-currency-line"></i>
// //                             <div>
// //                                 <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
// //                                 <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //                 <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
// //             </div>
// //         </div>
// //     )
// // }

// // export default Riding


// import React, { useEffect, useContext } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { SocketContext } from '../context/SocketContext'
// import LiveTracking from '../components/LiveTracking'

// const Riding = () => {

//     const location = useLocation()
//     const { ride } = location.state || {}

//     const { socket } = useContext(SocketContext)
//     const navigate = useNavigate()

//     // ✅ FIXED SOCKET
//     useEffect(() => {
//         socket.on("ride-ended", () => {
//             navigate('/home')
//         })

//         return () => {
//             socket.off("ride-ended")
//         }
//     }, [])

//     return (
//         <div className='h-screen relative overflow-hidden'>

//             {/* 🗺️ FULL MAP */}
//             <div className='h-screen w-screen absolute top-0 z-[-1]'>
//                 <LiveTracking />
//             </div>

//             {/* 🏠 HOME BUTTON (FLOATING ICON) */}
//             <div className="absolute top-5 left-5 z-50">
//                 <button
//                     onClick={() => navigate('/home')}
//                     className="bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
//                 >
//                     <i className="ri-home-5-line text-lg text-[#e56f96]"></i>
//                 </button>
//             </div>

//             {/* 🚗 DRIVER INFO CARD */}
//             <div className='absolute bottom-0 w-full bg-white px-5 py-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]'>

//                 {/* DRIVER */}
//                 <div className='flex items-center justify-between mb-4'>
//                     <img
//                         className='h-12 rounded-full object-cover'
//                         src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
//                         alt=""
//                     />

//                     <div className='text-right'>
//                         <h2 className='text-lg font-semibold capitalize'>
//                             {ride?.captain?.fullname?.firstname}
//                         </h2>

//                         <h4 className='text-xl font-bold'>
//                             {ride?.captain?.vehicle?.plate}
//                         </h4>

//                         <p className='text-sm text-gray-500'>
//                             {ride?.captain?.vehicle?.vehicleType}
//                         </p>
//                     </div>
//                 </div>

//                 {/* DETAILS */}
//                 <div className='mt-4'>

//                     {/* DESTINATION */}
//                     <div className='flex items-start gap-4 py-4 border-b border-gray-200'>
//                         <i className="text-[#e56f96] text-lg ri-map-pin-2-fill"></i>
//                         <div>
//                             <h3 className='text-sm font-semibold text-gray-900'>
//                                 Destination
//                             </h3>
//                             <p className='text-sm text-gray-600'>
//                                 {ride?.destination}
//                             </p>
//                         </div>
//                     </div>

//                     {/* FARE */}
//                     <div className='flex items-start gap-4 py-4'>
//                         <i className="text-[#e56f96] text-lg ri-currency-line"></i>
//                         <div>
//                             <h3 className='text-sm font-semibold text-gray-900'>
//                                 Fare
//                             </h3>
//                             <p className='text-lg font-bold text-gray-900'>
//                                 ₹{ride?.fare}
//                             </p>
//                             <p className='text-xs text-gray-500'>
//                                 Cash payment
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* PAYMENT BUTTON */}
//                 <button className='w-full mt-4 bg-[#e56f96] hover:bg-[#d95d86] text-white font-medium py-3 rounded-lg transition shadow-md'>
//                     Make Payment
//                 </button>

//             </div>
//         </div>
//     )
// }

// export default Riding


import React, { useEffect, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {

    const location = useLocation()
    const { ride } = location.state || {}

    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()
    const [rideEnded, setRideEnded] = useState(false)  // ✅ NEW

    useEffect(() => {
        if (!socket) return;

        socket.on("ride-ended", () => {
            console.log("🏁 Ride ended by captain")
            setRideEnded(true)  // ✅ show payment UI instead of navigating away
        })

        return () => {
            socket.off("ride-ended")
        }
    }, [socket])

    return (
        <div className='h-screen relative overflow-hidden'>

            {/* 🗺️ FULL MAP */}
            <div className='h-screen w-screen absolute top-0 z-[-1]'>
                <LiveTracking />
            </div>

            {/* 🏠 HOME BUTTON */}
            <div className="absolute top-5 left-5 z-50">
                <button
                    onClick={() => navigate('/home')}
                    className="bg-white p-2 rounded-full shadow-md hover:scale-105 transition"
                >
                    <i className="ri-home-5-line text-lg text-[#e56f96]"></i>
                </button>
            </div>

            {/* ✅ PAYMENT CONFIRMATION OVERLAY — shown when captain ends ride */}
            {rideEnded && (
                <div className='absolute inset-0 z-50 bg-black/50 flex items-end'>
                    <div className='w-full bg-white px-5 py-8 rounded-t-3xl shadow-2xl'>

                        <div className='flex justify-center mb-4'>
                            <div className='bg-green-100 rounded-full p-4'>
                                <i className="ri-checkbox-circle-fill text-4xl text-green-500"></i>
                            </div>
                        </div>

                        <h2 className='text-2xl font-bold text-center text-gray-900 mb-1'>
                            You've arrived!
                        </h2>
                        <p className='text-center text-gray-500 text-sm mb-6'>
                            Please pay the driver
                        </p>

                        {/* FARE */}
                        <div className='bg-[#fff4f7] border border-[#e56f96] rounded-xl p-4 flex items-center justify-between mb-6'>
                            <div>
                                <p className='text-sm text-gray-500'>Total Fare</p>
                                <p className='text-3xl font-bold text-gray-900'>₹{ride?.fare}</p>
                            </div>
                            <div className='text-right'>
                                <p className='text-sm text-gray-500'>Payment</p>
                                <p className='text-base font-semibold text-[#e56f96]'>
                                    <i className="ri-money-rupee-circle-line mr-1"></i>
                                    Cash
                                </p>
                            </div>
                        </div>

                        {/* DRIVER */}
                        <div className='flex items-center gap-3 mb-6'>
                            <img
                                className='h-12 w-12 rounded-full object-cover'
                                src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                                alt=""
                            />
                            <div>
                                <h3 className='font-semibold capitalize'>
                                    {ride?.captain?.fullname?.firstname}
                                </h3>
                                <p className='text-sm text-gray-500'>
                                    {ride?.captain?.vehicle?.plate}
                                </p>
                            </div>
                        </div>

                        {/* ✅ CONFIRM PAYMENT BUTTON */}
                        <button
                            onClick={() => navigate('/home')}
                            className='w-full bg-[#e56f96] hover:bg-[#d95d86] text-white font-semibold py-4 rounded-xl transition shadow-md text-lg active:scale-95'
                        >
                            Done — Paid Cash ✓
                        </button>

                    </div>
                </div>
            )}

            {/* 🚗 DRIVER INFO CARD (shown during ride) */}
            <div className='absolute bottom-0 w-full bg-white px-5 py-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]'>

                <div className='flex items-center justify-between mb-4'>
                    <img
                        className='h-12 rounded-full object-cover'
                        src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                        alt=""
                    />
                    <div className='text-right'>
                        <h2 className='text-lg font-semibold capitalize'>
                            {ride?.captain?.fullname?.firstname}
                        </h2>
                        <h4 className='text-xl font-bold'>
                            {ride?.captain?.vehicle?.plate}
                        </h4>
                        <p className='text-sm text-gray-500'>
                            {ride?.captain?.vehicle?.vehicleType}
                        </p>
                    </div>
                </div>

                <div className='mt-4'>
                    <div className='flex items-start gap-4 py-4 border-b border-gray-200'>
                        <i className="text-[#e56f96] text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-900'>Destination</h3>
                            <p className='text-sm text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>

                    <div className='flex items-start gap-4 py-4'>
                        <i className="text-[#e56f96] text-lg ri-currency-line"></i>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-900'>Fare</h3>
                            <p className='text-lg font-bold text-gray-900'>₹{ride?.fare}</p>
                            <p className='text-xs text-gray-500'>Cash payment</p>
                        </div>
                    </div>
                </div>

                {/* ✅ MAKE PAYMENT — only usable after ride ends */}
                <button
                    onClick={() => rideEnded ? navigate('/home') : null}
                    className={`w-full mt-4 font-medium py-3 rounded-lg transition shadow-md text-white ${
                        rideEnded
                            ? 'bg-[#e56f96] hover:bg-[#d95d86] cursor-pointer'
                            : 'bg-gray-300 cursor-not-allowed'
                    }`}
                >
                    {rideEnded ? 'Make Payment ✓' : 'Ride in Progress...'}
                </button>

            </div>
        </div>
    )
}

export default Riding