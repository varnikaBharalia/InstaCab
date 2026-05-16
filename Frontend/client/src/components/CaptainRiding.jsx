// import React, { useRef, useState } from 'react'
// import { Link  } from 'react-router-dom'
// import FinishRide from '../components/FinishRide'
// import { useGSAP } from '@gsap/react'
// import gsap from 'gsap'

// const CaptainRiding = () => {

//     const [finishRidePanel, setFinishRidePanel] = useState(false)
//     const finishRidePanelRef = useRef(null)

//     useGSAP(function () {
//         if (finishRidePanel) {
//             gsap.to(finishRidePanelRef.current, {
//                 transform: 'translateY(0)'
//             })
//         } else {
//             gsap.to(finishRidePanelRef.current, {
//                 transform: 'translateY(100%)'
//             })
//         }
//     }, [finishRidePanel])


//     return (
//         <div className='h-screen relative'>

//             <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
//                 <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
//                 <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
//                     <i className="text-lg font-medium ri-logout-box-r-line"></i>
//                 </Link>
//             </div>
//             <div className='h-4/5'>
//                 <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

//             </div>
//             <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
//             onClick={()=>{
//                 setFinishRidePanel(true)
//             }}
//             >
//                 <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={() => {

//                 }}><i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i></h5>
//                 <h4 className='text-xl font-semibold'>4 KM away</h4>
//                 <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
//             </div>
//             <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
//                 <FinishRide setFinishRidePanel={setFinishRidePanel} />
//             </div>

//         </div>
//     )
// }

// export default CaptainRiding





import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [finishRidePanel, setFinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    const location = useLocation()
    const rideData = location.state?.ride

    // ✅ GSAP
    useGSAP(() => {
        gsap.to(finishRidePanelRef.current, {
            transform: finishRidePanel ? 'translateY(0)' : 'translateY(100%)',
            duration: 0.4,
            ease: 'power3.out'
        })
    }, [finishRidePanel])

    return (
        <div className='h-screen relative overflow-hidden'>

            {/* 🔝 TOP BAR */}
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen z-10'>
                <h2 className='text-2xl font-bold bg-white/80 px-4 py-1 rounded-full shadow-sm backdrop-blur'>
                    Insta<span className='text-[#e56f96]'>Cab</span>
                </h2>

                <Link to='/captain-home'
                    className='h-10 w-10 bg-white shadow-md flex items-center justify-center rounded-full'>
                    <i className="text-lg ri-logout-box-r-line"></i>
                </Link>
            </div>

            {/* 🗺️ LIVE MAP (REPLACED GIF) */}
            <div className='h-screen w-screen '>
                <LiveTracking />
            </div>

            {/* 🚘 RIDE INFO STRIP */}
            <div className='absolute top-24 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow text-sm font-medium'>
                {rideData?.pickup?.slice(0, 20)} → {rideData?.destination?.slice(0, 20)}
            </div>

            {/* 🔻 BOTTOM PANEL */}
            <div
                className='h-[18%] p-6 flex items-center justify-between bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pt-10 absolute bottom-0 w-full cursor-pointer'
                onClick={() => setFinishRidePanel(true)}
            >

                {/* HANDLE */}
                <h5 className='absolute top-2 w-full text-center'>
                    <i className="text-3xl text-gray-400 ri-arrow-up-wide-line"></i>
                </h5>

                {/* ✅ DISTANCE */}
                <h4 className='text-xl font-bold'>
                    {rideData?.distance
                        ? (rideData.distance / 1000).toFixed(1) + " KM"
                        : "Loading..."}
                </h4>

                {/* BUTTON */}
                <button className='bg-[#e56f96] hover:bg-[#d95d86] text-white font-semibold py-3 px-8 rounded-lg shadow-md transition active:scale-95'>
                    Complete Ride
                </button>
            </div>

            {/* 🔽 FINISH PANEL */}
            <div
                ref={finishRidePanelRef}
                className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-4 py-6 pt-8 rounded-t-3xl shadow-2xl'
            >
                <FinishRide
                    ride={rideData}   // ✅ IMPORTANT FIX
                    setFinishRidePanel={setFinishRidePanel}
                />
            </div>

        </div>
    )
}

export default CaptainRiding