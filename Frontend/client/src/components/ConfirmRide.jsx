// import React from 'react'

// const ConfirmRide = (props) => {
//     return (
//         <div>
//             <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
//                 // props.setVehiclePanel(false)
//                 props.setConfirmRidePanel(false)
//             }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
//             <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

//             <div className='flex gap-2 justify-between flex-col items-center'>
//                 <img className='h-20' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
//                 <div className='w-full mt-5'>
//                     <div className='flex items-center gap-5 p-3 border-b-2'>
//                         <i className="ri-map-pin-user-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>562/11-A</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-5 p-3 border-b-2'>
//                         <i className="text-lg ri-map-pin-2-fill"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>562/11-A</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
//                         </div>
//                     </div>
//                     <div className='flex items-center gap-5 p-3'>
//                         <i className="ri-currency-line"></i>
//                         <div>
//                             <h3 className='text-lg font-medium'>₹{props.fare[props.vehicleType]}</h3>
//                             <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
//                         </div>
//                     </div>
//                 </div>
//                 <button onClick={() => {
//                     props.setVehicleFound(true)
//                     props.setConfirmRidePanel(false)
//                     props.createRide()
//                 }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Confirm</button>

//             </div>
//         </div>
//     )
// }

// export default ConfirmRide


import React from 'react'

// 🔥 import your assets
import instacab from '../assets/instacab.png'
import motorbike from '../assets/motorbike.png'
import instaauto from '../assets/instauto.png'

const ConfirmRide = (props) => {

    // 🔥 dynamic image based on vehicle
    const getVehicleImage = () => {
        if (props.vehicleType === 'car') return instacab
        if (props.vehicleType === 'moto') return motorbike
        if (props.vehicleType === 'auto') return instaauto
    }

    return (
        <div className='px-3'>

            {/* CLOSE */}
            <h5
                className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
                onClick={() => props.setConfirmRidePanel(false)}
            >
                <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>

            {/* TITLE */}
            <h3 className='text-xl font-semibold mb-4 text-gray-900'>
                Confirm your ride
            </h3>

            <div className='flex flex-col items-center'>

                {/* 🚗 VEHICLE IMAGE */}
                <img
                    className='h-20 object-contain mb-2'
                    src={getVehicleImage()}
                    alt=""
                />

                {/* 🚘 VEHICLE NAME (NEW 🔥) */}
                <p className='text-sm font-medium text-gray-600 mb-4 capitalize'>
                    {props.vehicleType === 'car' && 'InstaCab'}
                    {props.vehicleType === 'moto' && 'MotorBike'}
                    {props.vehicleType === 'auto' && 'InstaAuto'}
                </p>

                {/* DETAILS */}
                <div className='w-full mt-2'>

                    {/* PICKUP */}
                    <div className='flex items-start gap-3 py-4 border-b border-gray-200'>
                        <i className="text-lg text-[#e56f96] ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-base font-semibold text-gray-900'>
                                Pickup
                            </h3>
                            <p className='text-sm text-gray-600 mt-1 leading-snug'>
                                {props.pickup}
                            </p>
                        </div>
                    </div>

                    {/* DESTINATION */}
                    <div className='flex items-start gap-3 py-4 border-b border-gray-200'>
                        <i className="text-lg text-[#e56f96] ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-base font-semibold text-gray-900'>
                                Destination
                            </h3>
                            <p className='text-sm text-gray-600 mt-1 leading-snug'>
                                {props.destination}
                            </p>
                        </div>
                    </div>

                    {/* PRICE */}
                    <div className='flex items-start gap-3 py-4'>
                        <i className="text-lg text-[#e56f96] ri-currency-line"></i>
                        <div>
                            <h3 className='text-base font-semibold text-gray-900'>
                                Fare
                            </h3>
                            <p className='text-lg font-semibold text-gray-900 mt-1'>
                                ₹{props.fare[props.vehicleType]}
                            </p>
                            <p className='text-xs text-gray-500'>
                                Cash payment
                            </p>
                        </div>
                    </div>
                </div>

                {/* ✅ CONFIRM BUTTON */}
                <button
                    onClick={() => {
                        props.setVehicleFound(true)
                        props.setConfirmRidePanel(false)
                        props.createRide()
                    }}
                    className='w-full mt-6 bg-[#e56f96] text-white font-semibold py-3 rounded-md 
                    hover:bg-[#d95d86] transition text-base'
                >
                    Confirm Ride
                </button>

            </div>
        </div>
    )
}

export default ConfirmRide