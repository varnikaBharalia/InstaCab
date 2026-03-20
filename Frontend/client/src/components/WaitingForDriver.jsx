// import React from 'react'

// const WaitingForDriver = (props) => {
//   return (
//     <div>
//       <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
//         props.waitingForDriver(false)
//       }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

//       <div className='flex items-center justify-between'>
//         <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
//         <div className='text-right'>
//           <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
//           <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
//           <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
//           <h1 className='text-lg font-semibold'>  {props.ride?.otp} </h1>

//         </div>
//       </div>

//       <div className='flex gap-2 justify-between flex-col items-center'>
//         <div className='w-full mt-5'>
//           <div className='flex items-center gap-5 p-3 border-b-2'>
//             <i className="ri-map-pin-user-fill"></i>
//             <div>
//               <h3 className='text-lg font-medium'>562/11-A</h3>
//               <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>            </div>
//           </div>
//           <div className='flex items-center gap-5 p-3 border-b-2'>
//             <i className="text-lg ri-map-pin-2-fill"></i>
//             <div>
//               <h3 className='text-lg font-medium'>562/11-A</h3>
//               <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>            </div>
//           </div>
//           <div className='flex items-center gap-5 p-3'>
//             <i className="ri-currency-line"></i>
//             <div>
//               <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
//               <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WaitingForDriver


import React from 'react'
import instacab from '../assets/instacab.png'
import motorbike from '../assets/motorbike.png'
import instaauto from '../assets/instauto.png'

const WaitingForDriver = (props) => {

  // 🔥 dynamic image
  const getVehicleImage = () => {
    if (props.ride?.vehicleType === 'car') return instacab
    if (props.ride?.vehicleType === 'moto') return motorbike
    if (props.ride?.vehicleType === 'auto') return instaauto
  }

  return (
    <div className='px-3'>

      {/* CLOSE */}
      <h5
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
        onClick={() => props.setWaitingForDriver(false)}
      >
        <i className="text-2xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>

      {/* 🔥 TITLE */}
      <h3 className='text-xl font-semibold mb-5 text-gray-900'>
        Driver is on the way
      </h3>

      {/* 🚗 DRIVER CARD */}
      <div className='flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-4'>

        <img
          className='h-14 object-contain'
          src={getVehicleImage()}
          alt=""
        />

        <div className='text-right'>
          <h2 className='text-base font-semibold capitalize text-gray-900'>
            {props.ride?.captain?.fullname?.firstname}
          </h2>

          <h4 className='text-lg font-bold text-[#e56f96]'>
            {props.ride?.captain?.vehicle?.plate}
          </h4>

          <p className='text-sm text-gray-500'>
            {props.ride?.captain?.vehicle?.model || 'Vehicle'}
          </p>

          {/* 🔐 OTP */}
          <h1 className='text-lg font-semibold mt-1 text-gray-900'>
            OTP: {props.ride?.otp}
          </h1>
        </div>
      </div>

      {/* 📍 DETAILS */}
      <div className='w-full'>

        {/* PICKUP */}
        <div className='flex items-start gap-4 py-4 border-b border-gray-200'>
          <i className="text-lg text-[#e56f96] ri-map-pin-user-fill"></i>
          <div>
            <h3 className='text-base font-semibold text-gray-900'>
              Pickup
            </h3>
            <p className='text-sm text-gray-600 mt-1 leading-snug'>
              {props.ride?.pickup}
            </p>
          </div>
        </div>

        {/* DESTINATION */}
        <div className='flex items-start gap-4 py-4 border-b border-gray-200'>
          <i className="text-lg text-[#e56f96] ri-map-pin-2-fill"></i>
          <div>
            <h3 className='text-base font-semibold text-gray-900'>
              Destination
            </h3>
            <p className='text-sm text-gray-600 mt-1 leading-snug'>
              {props.ride?.destination}
            </p>
          </div>
        </div>

        {/* FARE */}
        <div className='flex items-start gap-4 py-4'>
          <i className="text-lg text-[#e56f96] ri-currency-line"></i>
          <div>
            <h3 className='text-base font-semibold text-gray-900'>
              Fare
            </h3>
            <p className='text-lg font-semibold text-gray-900 mt-1'>
              ₹{props.ride?.fare}
            </p>
            <p className='text-xs text-gray-500'>
              Cash payment
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WaitingForDriver