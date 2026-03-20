// // // import React, { useRef, useState } from 'react'
// // // import { Link } from 'react-router-dom'
// // // import CaptainDetails from '../components/CaptainDetails'
// // // import RidePopUp from '../components/RidePopUp'
// // // import { useGSAP } from '@gsap/react'
// // // import gsap from 'gsap'
// // // import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
// // // import { useEffect, useContext } from 'react'
// // // import { SocketContext } from '../context/SocketContext'
// // // import { CaptainDataContext } from '../context/CaptainContext'
// // // import axios from 'axios';

// // // const CaptainHome = () => {

// // //     const [ridePopupPanel, setRidePopupPanel] = useState(false)
// // //     const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

// // //     const ridePopupPanelRef = useRef(null)
// // //     const confirmRidePopupPanelRef = useRef(null)
// // //     const [ride, setRide] = useState(null)

// // //     const { socket } = useContext(SocketContext)
// // //     const { captain } = useContext(CaptainDataContext)

// // //     useEffect(() => {
// // //         socket.emit('join', {
// // //             userId: captain._id,
// // //             userType: 'captain'
// // //         })
// // //         const updateLocation = () => {
// // //             if (navigator.geolocation) {
// // //                 navigator.geolocation.getCurrentPosition(position => {

// // //                     socket.emit('update-location-captain', {
// // //                         userId: captain._id,
// // //                         location: {
// // //                             ltd: position.coords.latitude,
// // //                             lng: position.coords.longitude
// // //                         }
// // //                     })
// // //                 })
// // //             }
// // //         }

// // //         const locationInterval = setInterval(updateLocation, 10000)
// // //         updateLocation()

// // //         // return () => clearInterval(locationInterval)
// // //     }, [])

// // //     socket.on('new-ride', (data) => {
// // //         // console.log(data)
// // //         setRide(data)
// // //         setRidePopupPanel(true)
// // //     })

// // //     async function confirmRide() {

// // //         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

// // //             rideId: ride._id,
// // //             captainId: captain._id,


// // //         }, {
// // //             headers: {
// // //                 Authorization: `Bearer ${localStorage.getItem('token')}`
// // //             }
// // //         })

// // //         setRidePopupPanel(false)
// // //         setConfirmRidePopupPanel(true)

// // //     }

// // //     useGSAP(function () {
// // //         if (ridePopupPanel) {
// // //             gsap.to(ridePopupPanelRef.current, {
// // //                 transform: 'translateY(0)'
// // //             })
// // //         } else {
// // //             gsap.to(ridePopupPanelRef.current, {
// // //                 transform: 'translateY(100%)'
// // //             })
// // //         }
// // //     }, [ridePopupPanel])

// // //     useGSAP(function () {
// // //         if (confirmRidePopupPanel) {
// // //             gsap.to(confirmRidePopupPanelRef.current, {
// // //                 transform: 'translateY(0)'
// // //             })
// // //         } else {
// // //             gsap.to(confirmRidePopupPanelRef.current, {
// // //                 transform: 'translateY(100%)'
// // //             })
// // //         }
// // //     }, [confirmRidePopupPanel])

// // //     return (
// // //         <div className='h-screen'>
// // //             <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
// // //                 <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
// // //                 <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
// // //                     <i className="text-lg font-medium ri-logout-box-r-line"></i>
// // //                 </Link>
// // //             </div>
// // //             <div className='h-3/5'>
// // //                 <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

// // //             </div>
// // //             <div className='h-2/5 p-6'>
// // //                 <CaptainDetails />
// // //             </div>
// // //             <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
// // //                 <RidePopUp
// // //                     ride={ride}
// // //                     setRidePopupPanel={setRidePopupPanel}
// // //                     setConfirmRidePopupPanel={setConfirmRidePopupPanel}
// // //                     confirmRide={confirmRide}
// // //                 />
// // //             </div>
// // //             <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
// // //                 <ConfirmRidePopUp
// // //                     ride={ride}
// // //                     setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
// // //             </div>
// // //         </div>
// // //     )
// // // }

// // // export default CaptainHome;



// // import React, { useRef, useState, useEffect, useContext } from 'react'
// // import { Link } from 'react-router-dom'
// // import CaptainDetails from '../components/CaptainDetails'
// // import RidePopUp from '../components/RidePopUp'
// // import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
// // import { useGSAP } from '@gsap/react'
// // import gsap from 'gsap'
// // import { SocketContext } from '../context/SocketContext'
// // import { CaptainDataContext } from '../context/CaptainContext'
// // import axios from 'axios'
// // import LiveTracking from '../components/LiveTracking'

// // const CaptainHome = () => {

// //     const [ridePopupPanel, setRidePopupPanel] = useState(false)
// //     const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

// //     const ridePopupPanelRef = useRef(null)
// //     const confirmRidePopupPanelRef = useRef(null)
// //     const [ride, setRide] = useState(null)

// //     const { socket } = useContext(SocketContext)
// //     const { captain } = useContext(CaptainDataContext)

// //     useEffect(() => {
// //         socket.emit('join', {
// //             userId: captain._id,
// //             userType: 'captain'
// //         })

// //         const updateLocation = () => {
// //             if (navigator.geolocation) {
// //                 navigator.geolocation.getCurrentPosition(position => {
// //                     socket.emit('update-location-captain', {
// //                         userId: captain._id,
// //                         location: {
// //                             ltd: position.coords.latitude,
// //                             lng: position.coords.longitude
// //                         }
// //                     })
// //                 })
// //             }
// //         }

// //         // eslint-disable-next-line no-unused-vars
// //         const locationInterval = setInterval(updateLocation, 10000)
// //         updateLocation()

// //     }, [])

// //     socket.on('new-ride', (data) => {
// //         setRide(data)
// //         setRidePopupPanel(true)
// //     })

// //     async function confirmRide() {
// //         await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
// //             rideId: ride._id,
// //             captainId: captain._id,
// //         }, {
// //             headers: {
// //                 Authorization: `Bearer ${localStorage.getItem('token')}`
// //             }
// //         })

// //         setRidePopupPanel(false)
// //         setConfirmRidePopupPanel(true)
// //     }

// //     // 🔥 GSAP
// //     useGSAP(() => {
// //         gsap.to(ridePopupPanelRef.current, {
// //             transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
// //             duration: 0.4
// //         })
// //     }, [ridePopupPanel])

// //     useGSAP(() => {
// //         gsap.to(confirmRidePopupPanelRef.current, {
// //             transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
// //             duration: 0.4
// //         })
// //     }, [confirmRidePopupPanel])

// //     return (
// //         <div className='h-screen relative overflow-hidden'>

// //             {/* 🔥 TOP BAR
// //             <div className='fixed top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200'>

// //                 <h2 className='text-lg font-semibold text-gray-900'>
// //                     Insta<span className='text-[#e56f96]'>Cab</span>
// //                 </h2>

// //                 <Link
// //                     to='/captain-home'
// //                     className='h-10 w-10 bg-[#fff4f7] flex items-center justify-center rounded-full border border-[#e56f96]'
// //                 >
// //                     <i className="text-lg text-[#e56f96] ri-logout-box-r-line"></i>
// //                 </Link>
// //             </div> */}

// //             {/* 🗺️ MAP / BACKGROUND */}
// //             {/* <div className='h-[65%] w-full'>
// //                 <img
// //                     className='h-full w-full object-cover'
// //                     src="https://images.unsplash.com/photo-1502920917128-1aa500764cbd"
// //                     alt=""
// //                 />
// //             </div> */}


// //             <div className='h-[65%] w-full'>
// //                 <LiveTracking/>
// //             </div>


// //             {/* 📊 CAPTAIN PANEL */}
// //             <div className='h-[35%] bg-white px-5 pt-6 pb-4 shadow-[0_-5px_20px_rgba(0,0,0,0.08)] rounded-t-2xl'>

// //                 {/* 🔥 SECTION TITLE */}
// //                 <h3 className='text-sm text-gray-500 mb-2'>Your Dashboard</h3>

// //                 <CaptainDetails />

// //             </div>

// //             {/* 🚗 RIDE POPUP */}
// //             <div
// //                 ref={ridePopupPanelRef}
// //                 className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-4 py-6 pt-10 shadow-2xl'
// //             >
// //                 <RidePopUp
// //                     ride={ride}
// //                     setRidePopupPanel={setRidePopupPanel}
// //                     setConfirmRidePopupPanel={setConfirmRidePopupPanel}
// //                     confirmRide={confirmRide}
// //                 />
// //             </div>

// //             {/* ✅ CONFIRM POPUP */}
// //             <div
// //                 ref={confirmRidePopupPanelRef}
// //                 className='fixed w-full h-screen z-30 bottom-0 translate-y-full bg-white px-4 py-6 pt-10'
// //             >
// //                 <ConfirmRidePopUp
// //                     ride={ride}
// //                     setConfirmRidePopupPanel={setConfirmRidePopupPanel}
// //                     setRidePopupPanel={setRidePopupPanel}
// //                 />
// //             </div>

// //         </div>
// //     )
// // }

// // export default CaptainHome


// import React, { useRef, useState, useEffect, useContext } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import CaptainDetails from '../components/CaptainDetails'
// import RidePopUp from '../components/RidePopUp'
// import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'
// import { SocketContext } from '../context/SocketContext'
// import { CaptainDataContext } from '../context/CaptainContext'
// import axios from 'axios'
// import LiveTracking from '../components/LiveTracking'
// import logoutPink from '../assets/logout.png'

// const CaptainHome = () => {
//     const [ridePopupPanel, setRidePopupPanel] = useState(false)
//     const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

//     const ridePopupPanelRef = useRef(null)
//     const confirmRidePopupPanelRef = useRef(null)
//     const [ride, setRide] = useState(null)

//     const { socket } = useContext(SocketContext)
//     const { captain } = useContext(CaptainDataContext)
//     const navigate = useNavigate()

//     useEffect(() => {
//         socket.emit('join', {
//             userId: captain._id,
//             userType: 'captain'
//         })

//         const updateLocation = () => {
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(position => {
//                     socket.emit('update-location-captain', {
//                         userId: captain._id,
//                         location: {
//                             ltd: position.coords.latitude,
//                             lng: position.coords.longitude
//                         }
//                     })
//                 })
//             }
//         }

//         // eslint-disable-next-line no-unused-vars
//         const locationInterval = setInterval(updateLocation, 10000)
//         updateLocation()

//     }, [captain._id, socket])

//     // socket.on('new-ride', (data) => {
//     //     setRide(data)
//     //     setRidePopupPanel(true)
//     // })

//     async function confirmRide() {
//         await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
//             rideId: ride._id,
//             captainId: captain._id,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         setRidePopupPanel(false)
//         setConfirmRidePopupPanel(true)
//     }

//     // 🔥 GSAP
//     useGSAP(() => {
//         gsap.to(ridePopupPanelRef.current, {
//             transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
//             duration: 0.4
//         })
//     }, [ridePopupPanel])

//     useGSAP(() => {
//         gsap.to(confirmRidePopupPanelRef.current, {
//             transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
//             duration: 0.4
//         })
//     }, [confirmRidePopupPanel])


//     return (
//         <div className='h-screen relative overflow-hidden bg-[#f5f5f5]'>

//             {/* 🗺️ MAP / BACKGROUND */}
//             <div className='h-[60%] w-full'>
//                 <LiveTracking />
//             </div>

//             {/* 🔓 LOGOUT ICON BUTTON */}
//             <div className="absolute top-5 right-5 z-50">
//                 <button
//                     onClick={() => navigate('/captain-logout')}
//                     // We remove the white background box and use a large scale effect on hover
//                     className="p-0 border-none bg-transparent hover:scale-100 transition duration-500 ease-in-out"
//                 >
//                     <img
//                         src={logoutPink} // 👈 Use the new pink button asset
//                         alt="logout"
//                         // SCALE UP: Changed from h-6 (24px) to h-16 (64px) for a prominent, prominent look
//                         // OBJECT-CONTAIN and SHADOW-2XL: Keeps aspect ratio and adds a soft, deep shadow to the image
//                         className="h-12 w-12 object-contain shadow-2xl rounded-full"
//                     />
//                 </button>
//             </div>

//             {/* 📊 CAPTAIN PANEL */}
//             <div className='h-[35%] bg-white px-5 pt-6 pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-3xl relative z-10'>
//                 <h3 className='text-sm font-medium text-gray-500 mb-4'>Your Dashboard</h3>
//                 <CaptainDetails />
//             </div>

//             {/* 🚗 RIDE POPUP */}
//             <div
//                 ref={ridePopupPanelRef}
//                 className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-4 py-6 pt-8 shadow-2xl rounded-t-3xl'
//             >
//                 <RidePopUp
//                     ride={ride}
//                     setRidePopupPanel={setRidePopupPanel}
//                     setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//                     confirmRide={confirmRide}
//                 />
//             </div>

//             {/* ✅ CONFIRM POPUP */}
//             <div
//                 ref={confirmRidePopupPanelRef}
//                 className='fixed w-full h-screen z-40 bottom-0 translate-y-full bg-white px-4 py-6 pt-8'
//             >
//                 <ConfirmRidePopUp
//                     ride={ride}
//                     setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//                     setRidePopupPanel={setRidePopupPanel}
//                 />
//             </div>

//         </div>
//     )
// }
// export default CaptainHome



import React, { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'
import logoutPink from '../assets/logout.png'

const CaptainHome = () => {

    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const [ride, setRide] = useState(null)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)
    const navigate = useNavigate()

    // ✅ LOCATION UPDATE (FIXED + CLEAN)
    useEffect(() => {
        if (!socket || !captain?._id) return;

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            lat: position.coords.latitude,   // ✅ FIXED
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const interval = setInterval(updateLocation, 10000)
        updateLocation()

        return () => clearInterval(interval)

    }, [captain?._id, socket])

    // ✅ NEW RIDE LISTENER (MOST IMPORTANT FIX)
    useEffect(() => {
        if (!socket) return;

        const handleNewRide = (data) => {
            console.log("🚨 New Ride Received:", data)
            setRide(data)
            setRidePopupPanel(true)
        }

        socket.on('new-ride', handleNewRide)

        return () => {
            socket.off('new-ride', handleNewRide)
        }

    }, [socket])

    // ✅ CONFIRM RIDE
    async function confirmRide() {
        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
                {
                    rideId: ride._id,
                    captainId: captain._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )

            setRidePopupPanel(false)
            setConfirmRidePopupPanel(true)

        } catch (err) {
            console.error("Confirm Ride Error:", err)
        }
    }

    // ✅ GSAP ANIMATION
    useGSAP(() => {
        gsap.to(ridePopupPanelRef.current, {
            transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)',
            duration: 0.4
        })
    }, [ridePopupPanel])

    useGSAP(() => {
        gsap.to(confirmRidePopupPanelRef.current, {
            transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)',
            duration: 0.4
        })
    }, [confirmRidePopupPanel])

    return (
        <div className='h-screen relative overflow-hidden bg-[#f5f5f5]'>

            {/* 🗺️ MAP */}
            <div className='h-[60%] w-full'>
                <LiveTracking />
            </div>

            {/* 🔓 LOGOUT */}
            <div className="absolute top-5 right-5 z-50">
                <button
                    onClick={() => navigate('/captain-logout')}
                    className="p-0 border-none bg-transparent hover:scale-100 transition duration-500 ease-in-out"
                >
                    <img
                        src={logoutPink}
                        alt="logout"
                        className="h-12 w-12 object-contain shadow-2xl rounded-full"
                    />
                </button>
            </div>

            {/* 📊 DASHBOARD */}
            <div className='h-[35%] bg-white px-5 pt-6 pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-t-3xl relative z-10'>
                <h3 className='text-sm font-medium text-gray-500 mb-4'>Your Dashboard</h3>
                <CaptainDetails />
            </div>

            {/* 🚗 RIDE POPUP */}
            <div
                ref={ridePopupPanelRef}
                className='fixed w-full z-30 bottom-0 translate-y-full bg-white px-4 py-6 pt-8 shadow-2xl rounded-t-3xl'
            >
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>

            {/* ✅ CONFIRM POPUP */}
            <div
                ref={confirmRidePopupPanelRef}
                className='fixed w-full h-screen z-40 bottom-0 translate-y-full bg-white px-4 py-6 pt-8'
            >
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>

        </div>
    )
}

export default CaptainHome
