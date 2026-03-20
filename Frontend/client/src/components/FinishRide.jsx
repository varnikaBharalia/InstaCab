// import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const FinishRide = (props) => {
//     const navigate = useNavigate()

//     async function endRide() {
//         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {

//             rideId: props.ride._id


//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         if (response.status === 200) {
//             navigate('/captain-home')
//         }

//     }

//     return (
//         <div>
//             <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
//                 props.setFinishRidePanel(false)
//             }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
//             <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
//             <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
//                 <div className='flex items-center gap-3 '>
//                     <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
//                     <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname}</h2>
//                 </div>
//                 <h5 className='text-lg font-semibold'>2.2 KM</h5>
//             </div>
//             <div className='flex gap-2 justify-between flex-col items-center'>
//                 <div className='w-full mt-5'>
//                     <div className='flex items-center gap-5 p-3 border-b-2'>
//                         <i className="ri-map-pin-user-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>562/11-A</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-5 p-3 border-b-2'>
//                         <i className="text-lg ri-map-pin-2-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>562/11-A</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-5 p-3'>
//                         <i className="ri-currency-line"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
//                             <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div className='mt-10 w-full'>

//                     <button
//                         onClick={endRide}
//                         className='w-full mt-5 flex  text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default FinishRide







// //////////////////////////////////////////////////////



// // import React, { useState } from 'react'
// // import axios from 'axios'
// // import { useNavigate } from 'react-router-dom'

// // const FinishRide = (props) => {
// //     const navigate = useNavigate()
// //     const [isLoading, setIsLoading] = useState(false)
// //     const [error, setError] = useState(null)

// //     async function endRide() {
// //         setIsLoading(true)
// //         setError(null)

// //         try {
// //             const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
// //                 rideId: props.ride?._id
// //             }, {
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem('token')}`
// //                 }
// //             })

// //             if (response.status === 200) {
// //                 navigate('/captain-home')
// //             }
// //         } catch (err) {
// //             console.error("Error ending ride:", err)
// //             setError(err.response?.data?.message || "Failed to end the ride. Please try again.")
// //         } finally {
// //             setIsLoading(false)
// //         }
// //     }

// //     return (
// //         <div>
// //             <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => {
// //                 props.setFinishRidePanel(false)
// //             }}>
// //                 <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
// //             </h5>
// //             <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
            
// //             <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
// //                 <div className='flex items-center gap-3 '>
// //                     <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="User Avatar" />
// //                     {/* Added safer optional chaining */}
// //                     <h2 className='text-lg font-medium'>{props.ride?.user?.fullname?.firstname || "Passenger"}</h2>
// //                 </div>
// //                 {/* Consider making this dynamic: {props.ride?.distance} KM */}
// //                 <h5 className='text-lg font-semibold'>2.2 KM</h5> 
// //             </div>

// //             <div className='flex gap-2 justify-between flex-col items-center'>
// //                 <div className='w-full mt-5'>
// //                     <div className='flex items-center gap-5 p-3 border-b-2'>
// //                         <i className="ri-map-pin-user-fill"></i>
// //                         <div>
// //                             {/* You may want to split the pickup address dynamically here */}
// //                             <h3 className='text-lg font-medium'>Pickup</h3> 
// //                             <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
// //                         </div>
// //                     </div>
// //                     <div className='flex items-center gap-5 p-3 border-b-2'>
// //                         <i className="text-lg ri-map-pin-2-fill"></i>
// //                         <div>
// //                             <h3 className='text-lg font-medium'>Dropoff</h3>
// //                             <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
// //                         </div>
// //                     </div>
// //                     <div className='flex items-center gap-5 p-3'>
// //                         <i className="ri-currency-line"></i>
// //                         <div>
// //                             <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
// //                             <p className='text-sm -mt-1 text-gray-600'>Cash</p>
// //                         </div>
// //                     </div>
// //                 </div>

// //                 <div className='mt-10 w-full'>
// //                     {/* Display error message if the API call fails */}
// //                     {error && <p className='text-red-500 text-sm mb-3 text-center'>{error}</p>}
                    
// //                     <button
// //                         onClick={endRide}
// //                         disabled={isLoading}
// //                         className={`w-full flex text-lg justify-center font-semibold p-3 rounded-lg ${
// //                             isLoading ? 'bg-gray-400 text-gray-200' : 'bg-green-600 text-white'
// //                         }`}
// //                     >
// //                         {isLoading ? 'Finishing...' : 'Finish Ride'}
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     )
// // }

// // export default FinishRide



import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate()
    const ride = props.ride

    async function endRide() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
                {
                    rideId: ride._id
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            if (response.status === 200) {
                navigate('/captain-home')
            }
        } catch (err) {
            console.error("End Ride Error:", err)
        }
    }

    return (
        <div>

            {/* CLOSE */}
            <h5
                className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
                onClick={() => props.setFinishRidePanel(false)}
            >
                <i className="text-2xl text-gray-300 hover:text-gray-500 transition ri-arrow-down-wide-line"></i>
            </h5>

            {/* TITLE */}
            <h3 className='text-xl font-semibold mb-5 text-gray-900'>
                Finish this ride
            </h3>

            {/* 👤 USER CARD */}
            <div className='flex items-center justify-between p-4 border border-[#e56f96] bg-[#fff4f7] rounded-lg mt-4'>

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
                <div className='w-full mt-5'>

                    {/* PICKUP */}
                    <div className='flex items-center gap-4 py-4 border-b border-gray-200'>
                        <i className="text-lg text-[#e56f96] ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-base font-semibold text-gray-900'>
                                Pickup
                            </h3>
                            <p className='text-sm text-gray-600 mt-1'>
                                {ride?.pickup || "Not available"}
                            </p>
                        </div>
                    </div>

                    {/* DESTINATION */}
                    <div className='flex items-center gap-4 py-4 border-b border-gray-200'>
                        <i className="text-lg text-[#e56f96] ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-base font-semibold text-gray-900'>
                                Destination
                            </h3>
                            <p className='text-sm text-gray-600 mt-1'>
                                {ride?.destination || "Not available"}
                            </p>
                        </div>
                    </div>

                    {/* FARE */}
                    <div className='flex items-center gap-4 py-4'>
                        <i className="text-lg text-[#e56f96] ri-currency-line"></i>
                        <div>
                            <h3 className='text-base font-semibold text-gray-900'>
                                Fare
                            </h3>
                            <p className='text-lg font-semibold text-gray-900 mt-1'>
                                ₹{ride?.fare || 0}
                            </p>
                            <p className='text-xs text-gray-500'>
                                Cash payment
                            </p>
                        </div>
                    </div>
                </div>

                {/* ✅ FINISH BUTTON */}
                <div className='mt-8 w-full'>
                    <button
                        onClick={endRide}
                        className='w-full bg-[#e56f96] hover:bg-[#d95d86] text-white font-semibold py-3 rounded-lg transition shadow-md active:scale-95'
                    >
                        Complete Ride
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FinishRide