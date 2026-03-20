// // // import React, { useState } from 'react'
// // // import { Link } from 'react-router-dom'
// // // import axios from 'axios'
// // // import { useNavigate } from 'react-router-dom'

// // // const ConfirmRidePopUp = (props) => {
// // //     const [otp, setOtp] = useState('')

// // //     const navigate = useNavigate()

// // //     const submitHander = async (e) => {
// // //         e.preventDefault()

// // //         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
// // //             params: {
// // //                 rideId: props.ride._id,
// // //                 otp: otp
// // //             },
// // //             headers: {
// // //                 Authorization: `Bearer ${localStorage.getItem('token')}`
// // //             }
// // //         })

// // //         if (response.status === 200) {
// // //             props.setConfirmRidePopupPanel(false)
// // //             props.setRidePopupPanel(false)
// // //             navigate('/captain-riding', { state: { ride: props.ride } })
// // //             // navigate('/captain-riding')
// // //         }
// // //     }
// // //     return (
// // //         <div>
// // //             <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
// // //                 props.setRidePopupPanel(false)
// // //             }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
// // //             <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
// // //             <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
// // //                 <div className='flex items-center gap-3 '>
// // //                     <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
// // //                     <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname}</h2>                </div>
// // //                 <h5 className='text-lg font-semibold'>2.2 KM</h5>
// // //             </div>
// // //             <div className='flex gap-2 justify-between flex-col items-center'>
// // //                 <div className='w-full mt-5'>
// // //                     <div className='flex items-center gap-5 p-3 border-b-2'>
// // //                         <i className="ri-map-pin-user-fill"></i>
// // //                         <div>
// // //                             <h3 className='text-lg font-medium'>562/11-A</h3>
// // //                             <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>                        </div>
// // //                     </div>
// // //                     <div className='flex items-center gap-5 p-3 border-b-2'>
// // //                         <i className="text-lg ri-map-pin-2-fill"></i>
// // //                         <div>
// // //                             <h3 className='text-lg font-medium'>562/11-A</h3>
// // //                             <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>                        </div>
// // //                     </div>
// // //                     <div className='flex items-center gap-5 p-3'>
// // //                         <i className="ri-currency-line"></i>
// // //                         <div>
// // //                             <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
// // //                             <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
// // //                         </div>
// // //                     </div>
// // //                 </div>

// // //                 <div className='mt-6 w-full'>
// // //                     <form onSubmit={submitHander}>
// // //                         <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3' placeholder='Enter OTP' />

// // //                         <button className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
// // //                         <button onClick={() => {
// // //                             props.setConfirmRidePopupPanel(false)
// // //                             props.setRidePopupPanel(false)

// // //                         }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel</button>
// // //                     </form>
// // //                 </div>
// // //             </div>
// // //         </div>
// // //     )
// // // }

// // // export default ConfirmRidePopUp

// // import React, { useState } from 'react'
// // import axios from 'axios'
// // import { useNavigate } from 'react-router-dom'

// // const ConfirmRidePopUp = (props) => {
// //     const [otp, setOtp] = useState('')
// //     const navigate = useNavigate()

// //     const submitHander = async (e) => {
// //         e.preventDefault()

// //         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
// //             params: {
// //                 rideId: props.ride._id,
// //                 otp: otp
// //             },
// //             headers: {
// //                 Authorization: `Bearer ${localStorage.getItem('token')}`
// //             }
// //         })

// //         if (response.status === 200) {
// //             props.setConfirmRidePopupPanel(false)
// //             props.setRidePopupPanel(false)
// //             navigate('/captain-riding', { state: { ride: props.ride } })
// //         }
// //     }

// //     return (
// //         <div>
// //             <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => {
// //                 props.setRidePopupPanel(false)
// //             }}>
// //                 <i className="text-3xl text-gray-400 hover:text-gray-600 transition ri-arrow-down-wide-line"></i>
// //             </h5>

// //             <h3 className='text-2xl font-bold text-gray-900 mb-4'>Confirm Ride to Start</h3>

// //             {/* User Card */}
// //             <div className='flex items-center justify-between p-4 bg-[#fff4f7] border border-[#e56f96] rounded-xl mt-4'>
// //                 <div className='flex items-center gap-3 '>
// //                     <img className='h-12 w-12 rounded-full object-cover shadow-sm' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
// //                     <h2 className='text-lg font-semibold text-gray-900 capitalize'>{props.ride?.user?.fullname?.firstname || "Passenger"}</h2>                
// //                 </div>
// //                 <h5 className='text-lg font-bold text-gray-900'>2.2 KM</h5>
// //             </div>

// //             <div className='flex gap-2 justify-between flex-col items-center'>
// //                 <div className='w-full mt-4'>
// //                     <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
// //                         <i className="text-xl text-[#e56f96] ri-map-pin-user-fill"></i>
// //                         <div>
// //                             <h3 className='text-lg font-semibold text-gray-900'>Pick Up</h3>
// //                             <p className='text-sm text-gray-500'>{props.ride?.pickup}</p>                        
// //                         </div>
// //                     </div>
// //                     <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
// //                         <i className="text-xl text-[#e56f96] ri-map-pin-2-fill"></i>
// //                         <div>
// //                             <h3 className='text-lg font-semibold text-gray-900'>Drop Off</h3>
// //                             <p className='text-sm text-gray-500'>{props.ride?.destination}</p>                        
// //                         </div>
// //                     </div>
// //                     <div className='flex items-center gap-4 p-3'>
// //                         <i className="text-xl text-[#e56f96] ri-currency-line"></i>
// //                         <div>
// //                             <h3 className='text-lg font-semibold text-gray-900'>₹{props.ride?.fare} </h3>
// //                             <p className='text-sm text-gray-500'>Estimated Fare</p>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className='mt-6 w-full'>
// //                     <form onSubmit={submitHander}>
// //                         {/* Themed OTP Input */}
// //                         <input 
// //                             value={otp} 
// //                             onChange={(e) => setOtp(e.target.value)} 
// //                             type="text" 
// //                             className='bg-[#f4f4f4] px-6 py-4 font-mono text-center tracking-widest text-xl rounded-lg w-full mt-3 outline-none border border-transparent focus:border-[#e56f96] transition shadow-sm' 
// //                             placeholder='ENTER OTP' 
// //                             required
// //                         />

// //                         <div className='flex flex-col gap-3 mt-6'>
// //                             <button className='w-full flex justify-center bg-[#e56f96] hover:bg-[#d95d86] text-white font-medium py-3 rounded-lg transition shadow-md'>
// //                                 Confirm & Start Ride
// //                             </button>

// //                             <button type="button" onClick={() => {
// //                                 props.setConfirmRidePopupPanel(false)
// //                                 props.setRidePopupPanel(false)
// //                             }} 
// //                             className='w-full bg-[#f4f4f4] text-gray-700 hover:bg-gray-200 font-medium py-3 rounded-lg transition'>
// //                                 Cancel
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default ConfirmRidePopUp



// import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const ConfirmRidePopUp = (props) => {
//     const [otp, setOtp] = useState('')
//     const navigate = useNavigate()

//     const submitHander = async (e) => {
//         e.preventDefault()

//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
//             params: {
//                 rideId: props.ride._id,
//                 otp: otp
//             },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         if (response.status === 200) {
//             props.setConfirmRidePopupPanel(false)
//             props.setRidePopupPanel(false)
//             navigate('/captain-riding', { state: { ride: props.ride } })
//         }
//     }

//     return (
//         <div>
//             <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => {
//                 props.setRidePopupPanel(false)
//             }}>
//                 <i className="text-3xl text-gray-400 hover:text-gray-600 transition ri-arrow-down-wide-line"></i>
//             </h5>

//             <h3 className='text-2xl font-bold text-gray-900 mb-4'>Confirm Ride to Start</h3>

//             {/* User Card */}
//             <div className='flex items-center justify-between p-4 bg-[#fff4f7] border border-[#e56f96] rounded-xl mt-4'>
//                 <div className='flex items-center gap-3 '>
//                     <img className='h-12 w-12 rounded-full object-cover shadow-sm' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
//                     <h2 className='text-lg font-semibold text-gray-900 capitalize'>{props.ride?.user?.fullname?.firstname || "Passenger"}</h2>                
//                 </div>
//                 <h5 className='text-lg font-bold text-gray-900'>2.2 KM</h5>
//             </div>

//             <div className='flex gap-2 justify-between flex-col items-center'>
//                 <div className='w-full mt-4'>
//                     <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
//                         <i className="text-xl text-[#e56f96] ri-map-pin-user-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-semibold text-gray-900'>Pick Up</h3>
//                             <p className='text-sm text-gray-500'>{props.ride?.pickup}</p>                        
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
//                         <i className="text-xl text-[#e56f96] ri-map-pin-2-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-semibold text-gray-900'>Drop Off</h3>
//                             <p className='text-sm text-gray-500'>{props.ride?.destination}</p>                        
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-4 p-3'>
//                         <i className="text-xl text-[#e56f96] ri-currency-line"></i>
//                         <div>
//                             <h3 className='text-lg font-semibold text-gray-900'>₹{props.ride?.fare} </h3>
//                             <p className='text-sm text-gray-500'>Estimated Fare</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='mt-6 w-full'>
//                     <form onSubmit={submitHander}>
//                         {/* Themed OTP Input */}
//                         <input 
//                             value={otp} 
//                             onChange={(e) => setOtp(e.target.value)} 
//                             type="text" 
//                             className='bg-[#f4f4f4] px-6 py-4 font-mono text-center tracking-widest text-xl rounded-lg w-full mt-3 outline-none border border-transparent focus:border-[#e56f96] transition shadow-sm' 
//                             placeholder='ENTER OTP' 
//                             required
//                         />

//                         <div className='flex flex-col gap-3 mt-6'>
//                             <button className='w-full flex justify-center bg-[#e56f96] hover:bg-[#d95d86] text-white font-medium py-3 rounded-lg transition shadow-md'>
//                                 Confirm & Start Ride
//                             </button>

//                             <button type="button" onClick={() => {
//                                 props.setConfirmRidePopupPanel(false)
//                                 props.setRidePopupPanel(false)
//                             }} 
//                             className='w-full bg-[#f4f4f4] text-gray-700 hover:bg-gray-200 font-medium py-3 rounded-lg transition'>
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ConfirmRidePopUp



import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('')
    const navigate = useNavigate()

    const ride = props.ride

    const submitHander = async (e) => {
        e.preventDefault()

        console.log("🔑 OTP being sent:", otp)
        console.log("🚗 Ride ID:", ride._id)
        console.log("🔐 Token:", localStorage.getItem('captain-token'))  // ✅ check this



        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
                {
                    params: {
                        rideId: ride._id,
                        otp: otp
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.status === 200) {
                props.setConfirmRidePopupPanel(false)
                props.setRidePopupPanel(false)

                // ✅ navigate with updated ride
                navigate('/captain-riding', { state: { ride: response.data } })
            }
        } catch (err) {
            console.error("OTP Error:", err)

            // ✅ SHOW USER ERROR
            alert(err.response?.data?.message || "Something went wrong")

        }
    }

    return (
        <div>

            {/* CLOSE */}
            <h5
                className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
                onClick={() => props.setRidePopupPanel(false)}
            >
                <i className="text-3xl text-gray-400 hover:text-gray-600 transition ri-arrow-down-wide-line"></i>
            </h5>

            {/* TITLE */}
            <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                Confirm Ride to Start
            </h3>

            {/* 👤 USER CARD */}
            <div className='flex items-center justify-between p-4 bg-[#fff4f7] border border-[#e56f96] rounded-xl mt-4'>

                <div className='flex items-center gap-3'>

                    {/* ✅ DYNAMIC IMAGE */}
                    <img
                        className='h-12 w-12 rounded-full object-cover shadow-sm'
                        src={`https://i.pravatar.cc/150?u=${ride?.user?._id}`}
                        alt="user"
                    />

                    {/* ✅ NAME */}
                    <h2 className='text-lg font-semibold text-gray-900 capitalize'>
                        {ride?.user?.fullname?.firstname || "Passenger"}
                    </h2>
                </div>

                {/* ✅ DISTANCE */}
                <h5 className='text-lg font-bold text-gray-900'>
                    {ride?.distance
                        ? (ride.distance / 1000).toFixed(1) + " KM"
                        : "N/A"}
                </h5>
            </div>

            {/* 📍 DETAILS */}
            <div className='flex flex-col items-center'>
                <div className='w-full mt-4'>

                    {/* PICKUP */}
                    <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
                        <i className="text-xl text-[#e56f96] ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-900'>Pick Up</h3>
                            <p className='text-sm text-gray-500'>
                                {ride?.pickup || "Not available"}
                            </p>
                        </div>
                    </div>

                    {/* DESTINATION */}
                    <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
                        <i className="text-xl text-[#e56f96] ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-900'>Drop Off</h3>
                            <p className='text-sm text-gray-500'>
                                {ride?.destination || "Not available"}
                            </p>
                        </div>
                    </div>

                    {/* FARE */}
                    <div className='flex items-center gap-4 p-3'>
                        <i className="text-xl text-[#e56f96] ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-900'>
                                ₹{ride?.fare || 0}
                            </h3>
                            <p className='text-sm text-gray-500'>Estimated Fare</p>
                        </div>
                    </div>

                </div>

                {/* 🔐 OTP SECTION */}
                <div className='mt-6 w-full'>
                    <form onSubmit={submitHander}>

                        {/* ✅ OTP INPUT */}
                        <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            type="text"
                            maxLength={6}
                            className='bg-[#f4f4f4] px-6 py-4 font-mono text-center tracking-[0.3em] text-xl rounded-lg w-full mt-3 outline-none border border-transparent focus:border-[#e56f96] focus:ring-2 focus:ring-[#f8c2d3] transition shadow-sm'
                            placeholder='ENTER OTP'
                            required
                        />

                        {/* BUTTONS */}
                        <div className='flex flex-col gap-3 mt-6'>

                            <button className='w-full bg-[#e56f96] hover:bg-[#d95d86] text-white font-semibold py-3 rounded-lg transition shadow-md active:scale-95'>
                                Confirm & Start Ride
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    props.setConfirmRidePopupPanel(false)
                                    props.setRidePopupPanel(false)
                                }}
                                className='w-full bg-[#f4f4f4] text-gray-700 hover:bg-gray-200 font-medium py-3 rounded-lg transition'
                            >
                                Cancel
                            </button>

                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default ConfirmRidePopUp