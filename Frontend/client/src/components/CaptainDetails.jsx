
// // import React, { useContext } from 'react'
// // import { CaptainDataContext } from '../context/CaptainContext'

// // const CaptainDetails = () => {
// //     const { captain } = useContext(CaptainDataContext)

// //     return (
// //         <div>
// //             <div className='flex items-center justify-between'>
// //                 <div className='flex items-center justify-start gap-3'>
// //                     <img className='h-10 w-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
// //                     <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
// //                 </div>
// //                 <div>
// //                     <h4 className='text-xl font-semibold'>₹295.20</h4>
// //                     <p className='text-sm text-gray-600'>Earned</p>

// //                 </div>
// //             </div>
// //             <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
// //                 <div className='text-center'>
// //                     <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
// //                     <h5 className='text-lg font-medium'>10.2</h5>
// //                     <p className='text-sm text-gray-600'>Hours Online</p>
// //                 </div>
// //                 <div className='text-center'>
// //                     <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
// //                     <h5 className='text-lg font-medium'>10.2</h5>
// //                     <p className='text-sm text-gray-600'>Hours Online</p>
// //                 </div>
// //                 <div className='text-center'>
// //                     <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
// //                     <h5 className='text-lg font-medium'>10.2</h5>
// //                     <p className='text-sm text-gray-600'>Hours Online</p>
// //                 </div>

// //             </div>
// //         </div>
// //     )
// // }

// // export default CaptainDetails




// import React, { useContext } from 'react'
// import { CaptainDataContext } from '../context/CaptainContext'
// import axios from 'axios'

// const CaptainDetails = () => {
//     const { captain } = useContext(CaptainDataContext)

//     return (
//         <div>
//             <div className='flex items-center justify-between'>
//                 <div className='flex items-center justify-start gap-3'>
//                     <img className='h-12 w-12 rounded-full object-cover border-2 border-[#e56f96]' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" alt="" />
//                     <h4 className='text-lg font-semibold text-gray-900 capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
//                 </div>
//                 <div className='text-right'>
//                     <h4 className='text-xl font-bold text-gray-900'>₹295.20</h4>
//                     <p className='text-sm text-gray-500 font-medium'>Earned</p>
//                 </div>
//             </div>
//             <div className='flex p-4 mt-6 bg-[#f4f4f4] rounded-xl justify-around items-start shadow-sm'>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-1 font-thin ri-timer-2-line text-[#e56f96]"></i>
//                     <h5 className='text-lg font-bold text-gray-900'>10.2</h5>
//                     <p className='text-xs text-gray-500 font-medium'>Hours Online</p>
//                 </div>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-1 font-thin ri-speed-up-line text-[#e56f96]"></i>
//                     <h5 className='text-lg font-bold text-gray-900'>10.2</h5>
//                     <p className='text-xs text-gray-500 font-medium'>Distance (KM)</p>
//                 </div>
//                 <div className='text-center'>
//                     <i className="text-3xl mb-1 font-thin ri-booklet-line text-[#e56f96]"></i>
//                     <h5 className='text-lg font-bold text-gray-900'>10.2</h5>
//                     <p className='text-xs text-gray-500 font-medium'>Total Rides</p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default CaptainDetails



import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)

    const [stats, setStats] = useState({
        totalRides: 0,
        totalEarnings: 0,
        totalDistance: 0,
        totalTime: 0
    })

    useEffect(() => {
        const fetchCaptainData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                )

                setStats(res.data.stats)

            } catch (err) {
                console.error("Error fetching stats:", err)
            }
        }

        fetchCaptainData()
    }, [])

    return (
        <div>

            {/* PROFILE */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {/* <img className='h-10 w-10 rounded-full object-cover'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
                        alt=""
                    /> */}
                    <img
                        className='h-10 w-10 rounded-full object-cover'
                        src={`https://i.pravatar.cc/150?u=${captain._id}`}
                        alt="profile"
                    />
                    <h4 className='text-lg font-medium capitalize'>
                        {captain.fullname.firstname + " " + captain.fullname.lastname}
                    </h4>
                </div>

                <div className='text-right'>
                    <h4 className='text-xl font-semibold text-[#e56f96]'>
                        ₹{stats.totalEarnings || 0}
                    </h4>
                    <p className='text-sm text-gray-600'>Earnings</p>
                </div>
            </div>

            {/* STATS */}
            <div className='flex p-4 mt-6 bg-gray-100 rounded-xl justify-between'>

                <div className='text-center'>
                    <i className="text-2xl mb-2 ri-timer-2-line text-[#e56f96]"></i>
                    <h5 className='text-lg font-semibold'>
                        {(stats.totalTime / 3600).toFixed(1) || 0}
                    </h5>
                    <p className='text-xs text-gray-600'>Hours</p>
                </div>

                <div className='text-center'>
                    <i className="text-2xl mb-2 ri-speed-up-line text-[#e56f96]"></i>
                    <h5 className='text-lg font-semibold'>
                        {(stats.totalDistance / 1000).toFixed(1) || 0}
                    </h5>
                    <p className='text-xs text-gray-600'>KM</p>
                </div>

                <div className='text-center'>
                    <i className="text-2xl mb-2 ri-road-map-line text-[#e56f96]"></i>
                    <h5 className='text-lg font-semibold'>
                        {stats.totalRides || 0}
                    </h5>
                    <p className='text-xs text-gray-600'>Rides</p>
                </div>

            </div>
        </div>
    )
}

export default CaptainDetails