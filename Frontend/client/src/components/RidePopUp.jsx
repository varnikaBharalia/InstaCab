// import React from 'react'

// const RidePopUp = (props) => {
//   return (
//     <div>
//         <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
//                 props.setRidePopupPanel(false)
//             }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
//             <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
//             <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
//                 <div className='flex items-center gap-3 '>
//                     <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
//                     <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
//                             <h3 className='text-lg font-medium'>₹193.20 </h3>
//                             <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='mt-5 w-full '>
//                 <button onClick={() => {
//                         props.setConfirmRidePopupPanel(true)
//                         props.confirmRide()

//                     }} className=' bg-green-600 w-full text-white font-semibold p-2 px-10 rounded-lg'>Accept</button>

//                     <button onClick={() => {
//                         props.setRidePopupPanel(false)

//                     }} className='mt-2 w-full bg-gray-300 text-gray-700 font-semibold p-2 px-10 rounded-lg'>Ignore</button>
//                 </div>
//             </div>
//     </div>
//   )
// }

// export default RidePopUp



// import React from 'react'

// const RidePopUp = (props) => {
//   return (
//     <div>
//         <h5 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer' onClick={() => {
//                 props.setRidePopupPanel(false)
//             }}>
//             <i className="text-3xl text-gray-400 hover:text-gray-600 transition ri-arrow-down-wide-line"></i>
//         </h5>
        
//         <h3 className='text-2xl font-bold text-gray-900 mb-4'>New Ride Available!</h3>
        
//         {/* User Card */}
//         <div className='flex items-center justify-between p-4 bg-[#f4f4f4] border-l-4 border-[#e56f96] rounded-xl mt-4'>
//             <div className='flex items-center gap-3 '>
//                 <img className='h-12 w-12 rounded-full object-cover shadow-sm' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
//                 <h2 className='text-lg font-semibold text-gray-900 capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
//             </div>
//             <h5 className='text-lg font-bold text-gray-900'>2.2 KM</h5>
//         </div>

//         <div className='flex gap-2 justify-between flex-col items-center'>
//             <div className='w-full mt-4'>
//                 <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
//                     <i className="text-xl text-[#e56f96] ri-map-pin-user-fill"></i>
//                     <div>
//                         <h3 className='text-lg font-semibold text-gray-900'>Pick Up</h3>
//                         <p className='text-sm text-gray-500'>{props.ride?.pickup}</p>
//                     </div>
//                 </div>
//                 <div className='flex items-center gap-4 p-3 border-b border-gray-100'>
//                     <i className="text-xl text-[#e56f96] ri-map-pin-2-fill"></i>
//                     <div>
//                         <h3 className='text-lg font-semibold text-gray-900'>Drop Off</h3>
//                         <p className='text-sm text-gray-500'>{props.ride?.destination}</p>
//                     </div>
//                 </div>
//                 <div className='flex items-center gap-4 p-3'>
//                     <i className="text-xl text-[#e56f96] ri-currency-line"></i>
//                     <div>
//                         <h3 className='text-lg font-semibold text-gray-900'>₹{props.ride?.fare || "193.20"} </h3>
//                         <p className='text-sm text-gray-500'>Estimated Fare</p>
//                     </div>
//                 </div>
//             </div>

//             <div className='mt-6 w-full flex flex-col gap-3'>
//                 <button onClick={() => {
//                         props.setConfirmRidePopupPanel(true)
//                         props.confirmRide()
//                     }} 
//                     className='w-full bg-[#e56f96] text-white font-medium py-3 rounded-lg hover:bg-[#d95d86] transition shadow-md'>
//                     Accept Ride
//                 </button>

//                 <button onClick={() => {
//                         props.setRidePopupPanel(false)
//                     }} 
//                     className='w-full bg-[#f4f4f4] text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition'>
//                     Ignore
//                 </button>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default RidePopUp



import React from 'react'

const RidePopUp = (props) => {

    const ride = props.ride

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
                New Ride Available!
            </h3>

            {/* 👤 USER CARD */}
            <div className='flex items-center justify-between p-4 bg-[#f4f4f4] border-l-4 border-[#e56f96] rounded-xl mt-4'>

                <div className='flex items-center gap-3'>

                    {/* ✅ DYNAMIC AVATAR */}
                    <img
                        className='h-12 w-12 rounded-full object-cover shadow-sm'
                        src={`https://i.pravatar.cc/150?u=${ride?.user?._id}`}
                        alt="user"
                    />

                    {/* ✅ NAME */}
                    <h2 className='text-lg font-semibold text-gray-900 capitalize'>
                        {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
                    </h2>
                </div>

                {/* ✅ DISTANCE (meters → km) */}
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

                {/* BUTTONS */}
                <div className='mt-6 w-full flex flex-col gap-3'>

                    <button
                        onClick={() => {
                            props.setConfirmRidePopupPanel(true)
                            props.confirmRide()
                        }}
                        className='w-full bg-[#e56f96] text-white font-medium py-3 rounded-lg hover:bg-[#d95d86] transition shadow-md'
                    >
                        Accept Ride
                    </button>

                    <button
                        onClick={() => props.setRidePopupPanel(false)}
                        className='w-full bg-[#f4f4f4] text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-200 transition'
                    >
                        Ignore
                    </button>

                </div>
            </div>
        </div>
    )
}

export default RidePopUp