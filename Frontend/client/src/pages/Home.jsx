// /* eslint-disable no-unused-vars */
// import React, { useRef, useState, useEffect } from 'react'
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import 'remixicon/fonts/remixicon.css'
// import LocationSearchPanel from '../components/LocationSearchPanel';
// import VehiclePanel from '../components/VehiclePanel';
// import ConfirmRide from '../components/ConfirmRide';
// import LookingForDriver from '../components/LookingForDriver';
// import WaitingForDriver from '../components/WaitingForDriver';
// import axios from 'axios';
// import { SocketContext } from '../context/SocketContext';
// import { useContext } from 'react';
// import { UserDataContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';
// import LiveTracking from '../components/LiveTracking';


// const Home = () => {
//     const [pickup, setPickup] = useState('')
//     const [destination, setDestination] = useState('')
//     const [panelOpen, setPanelOpen] = useState(false)
//     const vehiclePanelRef = useRef(null)
//     const confirmRidePanelRef = useRef(null)
//     const vehicleFoundRef = useRef(null)
//     const waitingForDriverRef = useRef(null)


//     const panelRef = useRef(null)
//     const panelCloseRef = useRef(null)

//     const [vehiclePanel, setVehiclePanel] = useState(false)
//     const [confirmRidePanel, setConfirmRidePanel] = useState(false)
//     const [vehicleFound, setVehicleFound] = useState(false)
//     const [waitingForDriver, setWaitingForDriver] = useState(false)
//     const [pickupSuggestions, setPickupSuggestions] = useState([])
//     const [destinationSuggestions, setDestinationSuggestions] = useState([])
//     const [activeField, setActiveField] = useState(null)
//     const [fare, setFare] = useState({})
//     const [vehicleType, setVehicleType] = useState(null)
//     const [ride, setRide] = useState(null)

//     const navigate = useNavigate()


//     const { socket } = useContext(SocketContext)
//     const { user } = useContext(UserDataContext)

//     useEffect(() => {
//         socket.emit("join", { userType: "user", userId: user._id })
//     }, [socket, user])

//     socket.on('ride-confirmed', ride => {

//         setVehicleFound(false)
//         setWaitingForDriver(true)
//         setRide(ride)
//     })

//     socket.on('ride-started', ride => {
//         console.log("ride")
//         setWaitingForDriver(false)
//         navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
//     })

//     const handlePickupChange = async (e) => {
//         setPickup(e.target.value)
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
//                 params: { input: e.target.value },
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             })
//             setPickupSuggestions(response.data)
//         } catch {
//             // handle error
//         }
//     }

//     const handleDestinationChange = async (e) => {
//         setDestination(e.target.value)
//         try {
//             const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
//                 params: { input: e.target.value },
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             })
//             setDestinationSuggestions(response.data)
//         } catch {
//             // handle error
//         }
//     }

//     const submitHandler = (e) => {
//         e.preventDefault()
//     }

//     useGSAP(function () {
//         if (panelOpen) {
//             gsap.to(panelRef.current, {
//                 height: '70%',
//                 padding: 24
//                 // opacity:1
//             })
//             gsap.to(panelCloseRef.current, {
//                 opacity: 1
//             })
//         } else {
//             gsap.to(panelRef.current, {
//                 height: '0%',
//                 padding: 0
//                 // opacity:0
//             })
//             gsap.to(panelCloseRef.current, {
//                 opacity: 0
//             })
//         }
//     }, [panelOpen])


//     useGSAP(function () {
//         if (vehiclePanel) {
//             gsap.to(vehiclePanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(vehiclePanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [vehiclePanel])

//     useGSAP(function () {
//         if (confirmRidePanel) {
//             gsap.to(confirmRidePanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(confirmRidePanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [confirmRidePanel])


//     useGSAP(function () {
//         if (vehicleFound) {
//             gsap.to(vehicleFoundRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(vehicleFoundRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [vehicleFound])

//     useGSAP(function () {
//         if (waitingForDriver) {
//             gsap.to(waitingForDriverRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(waitingForDriverRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [waitingForDriver])


//     async function findTrip() {
//         setVehiclePanel(true)
//         setPanelOpen(false)

//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
//             params: { pickup, destination },
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         // console.log(response.data)
//         setFare(response.data)


//     }

//     async function createRide() {
//         const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
//             pickup,
//             destination,
//             vehicleType
//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })

//         // console.log(response.data)
//     }


//     return (
//         <div className='h-screen relative overflow-hidden'>
//             {/* <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" /> */}
//             <div className='h-screen w-screen'>
//                 <LiveTracking />
//             </div>
//             <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
//                 <div className='h-[30%] p-6 bg-white relative'>
//                     <h5 ref={panelCloseRef} onClick={() => {
//                         setPanelOpen(false)
//                     }} className='absolute opacity-0 right-6 top-6 text-2xl'>
//                         <i className="ri-arrow-down-wide-line"></i>
//                     </h5>
//                     <h4 className='text-2xl font-semibold'>Find a trip</h4>
//                     <form className='relative py-3' onSubmit={(e) => {
//                         submitHandler(e)
//                     }}>
//                         <div className="line absolute h-16 w-1 top-[50%] left-5 -translate-y-1/2 bg-gray-700 rounded-full"></div>
//                         <input
//                             onClick={() => {
//                                 setPanelOpen(true)
//                                 setActiveField('pickup')
//                             }}
//                             value={pickup}
//                             onChange={handlePickupChange}
//                             className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
//                             type="text"
//                             placeholder='Add a pick-up location'
//                         />
//                         <input
//                             onClick={() => {
//                                 setPanelOpen(true)
//                                 setActiveField('destination')
//                             }}
//                             value={destination}
//                             onChange={handleDestinationChange}
//                             className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
//                             type="text"
//                             placeholder='Enter your destination' />
//                     </form>
//                     <button
//                         onClick={findTrip}
//                         className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
//                         Find Trip
//                     </button>

//                 </div>
//                 <div ref={panelRef} className='bg-white h-0'>
//                     <LocationSearchPanel
//                         suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
//                         setPanelOpen={setPanelOpen}
//                         setVehiclePanel={setVehiclePanel}
//                         setPickup={setPickup}
//                         setDestination={setDestination}
//                         activeField={activeField}
//                     />
//                 </div>
//             </div>
//             <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//                 <VehiclePanel
//                     selectVehicle={setVehicleType}
//                     fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
//             </div>

//             <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
//                 <ConfirmRide
//                     createRide={createRide}
//                     pickup={pickup}
//                     destination={destination}
//                     fare={fare}
//                     vehicleType={vehicleType}
//                     setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
//             </div>
//             <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
//                 <LookingForDriver
//                     createRide={createRide}
//                     pickup={pickup}
//                     destination={destination}
//                     fare={fare}
//                     vehicleType={vehicleType}
//                     setVehicleFound={setVehicleFound} />
//             </div>
//             <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
//                 <WaitingForDriver
//                     ride={ride}
//                     setVehicleFound={setVehicleFound}
//                     setWaitingForDriver={setWaitingForDriver}
//                     waitingForDriver={waitingForDriver} />
//             </div>
//         </div>
//     )
// }

// export default Home;


/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'
import logoutPink from '../assets/logout.png'


const Home = () => {
    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)

    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)

    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)

    const [pickupSuggestions, setPickupSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])
    const [activeField, setActiveField] = useState(null)

    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)

    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    // ================= SOCKET =================
    // useEffect(() => {
    //     socket.emit("join", { userType: "user", userId: user._id })
    // }, [socket, user])

    // socket.on('ride-confirmed', ride => {
    //     setVehicleFound(false)
    //     setWaitingForDriver(true)
    //     setRide(ride)
    // })

    // socket.on('ride-started', ride => {
    //     setWaitingForDriver(false)
    //     navigate('/riding', { state: { ride } })
    // })


    useEffect(() => {
        if (!socket) return;

        socket.emit("join", { userType: "user", userId: user._id })

        socket.on('ride-confirmed', (ride) => {
            console.log("✅ Ride Confirmed:", ride)
            setRide(ride)
            setVehicleFound(false)
            setWaitingForDriver(true)
        })

        socket.on('ride-started', (ride) => {
            console.log("🚀 Ride Started:", ride)
            setWaitingForDriver(false)
            navigate('/riding', { state: { ride } })
        })

        return () => {
            socket.off('ride-confirmed')
            socket.off('ride-started')
        }

    }, [socket, user, navigate])

    // ================= INPUT HANDLERS =================
    const handlePickupChange = async (e) => {
        setPickup(e.target.value)

        // ❌ prevent API call for empty or very small input
        if (!e.target.value || e.target.value.length < 3) return;

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setPickupSuggestions(response.data)
        } catch { /* empty */ }
    }

    const handleDestinationChange = async (e) => {

        setDestination(e.target.value)

        // ❌ prevent API call for empty or very small input
        if (!e.target.value || e.target.value.length < 3) return;

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {/* hehe */ }
    }

    const submitHandler = (e) => e.preventDefault()

    // ================= GSAP =================
    useGSAP(() => {
        gsap.to(panelRef.current, {
            height: panelOpen ? '70%' : '0%',
            padding: panelOpen ? 24 : 0
        })
        gsap.to(panelCloseRef.current, {
            opacity: panelOpen ? 1 : 0
        })
    }, [panelOpen])

    useGSAP(() => {
        gsap.to(vehiclePanelRef.current, {
            transform: vehiclePanel ? 'translateY(0%)' : 'translateY(100%)'
        })
    }, [vehiclePanel])

    useGSAP(() => {
        gsap.to(confirmRidePanelRef.current, {
            transform: confirmRidePanel ? 'translateY(0%)' : 'translateY(100%)'
        })
    }, [confirmRidePanel])

    useGSAP(() => {
        gsap.to(vehicleFoundRef.current, {
            transform: vehicleFound ? 'translateY(0%)' : 'translateY(100%)'
        })
    }, [vehicleFound])

    useGSAP(() => {
        gsap.to(waitingForDriverRef.current, {
            transform: waitingForDriver ? 'translateY(0)' : 'translateY(100%)'
        })
    }, [waitingForDriver])

    // ================= API =================
    async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setFare(response.data)
    }

    async function createRide() {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
                pickup,
                destination,
                vehicleType
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            // ✅ SAVE RIDE (VERY IMPORTANT)
            setRide(response.data)

            console.log("✅ Ride Created:", response.data)

        } catch (err) {
            console.error("❌ Create Ride Error:", err)
        }
    }

    // ================= UI =================
    return (
        <div className='h-screen relative overflow-hidden bg-[#f5f5f5]'>

            {/* MAP */}
            <div className='h-screen w-screen'>
                <LiveTracking />
            </div>


            {/* 🔓 LOGOUT ICON BUTTON */}
            <div className="absolute top-5 right-5 z-50">
                <button
                    onClick={() => navigate('/captain-logout')}
                    // We remove the white background box and use a large scale effect on hover
                    className="p-0 border-none bg-transparent hover:scale-100 transition duration-500 ease-in-out"
                >
                    <img
                        src={logoutPink} // 👈 Use the new pink button asset
                        alt="logout"
                        // SCALE UP: Changed from h-6 (24px) to h-16 (64px) for a prominent, prominent look
                        // OBJECT-CONTAIN and SHADOW-2XL: Keeps aspect ratio and adds a soft, deep shadow to the image
                        className="h-12 w-12 object-contain shadow-2xl rounded-full"
                    />
                </button>
            </div>



            {/* MAIN PANEL */}
            <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>

                <div className='h-[30%] px-5 pt-6 pb-5 bg-white relative'>

                    {/* CLOSE ICON */}
                    <h5
                        ref={panelCloseRef}
                        onClick={() => setPanelOpen(false)}
                        className='absolute opacity-0 right-1/2 top-1 text-xl text-gray-500 cursor-pointer'
                    >
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>

                    {/* TITLE */}
                    <h4 className='text-xl font-semibold text-gray-900'>
                        Find a trip
                    </h4>

                    {/* FORM */}
                    <form className='relative mt-4' onSubmit={submitHandler}>

                        {/* vertical line */}
                        <div className="absolute h-14 w-0.5 top-[50%] left-4 -translate-y-1/2 bg-gray-400"></div>

                        {/* PICKUP */}
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#f4f4f4] px-10 py-3 text-base rounded-md w-full outline-none border-2 border-transparent focus:border-[#e56f96] transition'
                            type="text"
                            placeholder='Add a pick-up location'
                        />

                        {/* DESTINATION */}
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#f4f4f4] px-10 py-3 text-base rounded-md w-full mt-3 outline-none border-2 border-transparent focus:border-[#e56f96] transition'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>

                    {/* BUTTON */}
                    <button
                        onClick={findTrip}
                        className='bg-[#e56f96] text-white py-3 rounded-md mt-6 w-full text-sm font-medium hover:bg-[#d95d86] transition'
                    >
                        Find Ride
                    </button>

                </div>

                {/* 🔍 SEARCH PANEL (NO ROUNDED) */}
                <div ref={panelRef} className='bg-white '>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>

            </div>

            {/* VEHICLE PANEL */}
            <div
                ref={vehiclePanelRef}
                className='fixed w-full h-[70%] z-30 bottom-0 translate-y-full bg-white px-4 py-6 rounded-t-3xl shadow-2xl'
            >
                <div className="overflow-y-auto h-full">
                    <VehiclePanel
                        selectVehicle={setVehicleType}
                        fare={fare}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehiclePanel={setVehiclePanel}
                    />
                </div>
            </div>


            {/* CONFIRM PANEL */}
            <div
                ref={confirmRidePanelRef}
                className='fixed w-full h-[85%] z-40 bottom-0 translate-y-full bg-white px-4 py-5 rounded-t-3xl shadow-2xl'
            >
                <div className="overflow-y-auto h-full">
                    <ConfirmRide
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehicleFound={setVehicleFound}
                    />
                </div>
            </div>


            {/* LOOKING DRIVER */}
            <div
                ref={vehicleFoundRef}
                className='fixed w-full h-[85%] z-40 bottom-0 translate-y-full bg-white px-4 py-5 rounded-t-3xl shadow-2xl'
            >
                <div className="overflow-y-auto h-full">
                    <LookingForDriver
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        fare={fare}
                        vehicleType={vehicleType}
                        setVehicleFound={setVehicleFound}
                    />
                </div>
            </div>


            {/* WAITING */}
            <div
                ref={waitingForDriverRef}
                className='fixed w-full h-[85%] z-50 bottom-0 translate-y-full bg-white px-4 py-5 rounded-t-3xl shadow-2xl'
            >
                <div className="overflow-y-auto h-full">
                    <WaitingForDriver
                        ride={ride}
                        setVehicleFound={setVehicleFound}
                        setWaitingForDriver={setWaitingForDriver}
                        waitingForDriver={waitingForDriver}
                    />
                </div>
            </div>

        </div>
    )
}

export default Home