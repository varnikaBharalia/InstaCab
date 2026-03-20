

// import React, { useState } from 'react'
// import instacab from '../assets/instacab.png'
// import motorbike from '../assets/motorbike.png'
// import instaauto from '../assets/instauto.png'

// const VehiclePanel = (props) => {

//     const [selected, setSelected] = useState(null)

//     const handleSelect = (type) => {
//         setSelected(type)
//         props.selectVehicle(type)

//         // ✅ IMPORTANT FIX
//         props.setVehiclePanel(false)   // close this panel
//         props.setConfirmRidePanel(true) // open next
//     }

//     return (
//         <div className='px-3'>
//             <h5
//                 className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
//                 onClick={() => props.setConfirmRidePanel(false)}
//             >
//                 <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
//             </h5>

//             {/* TITLE */}
//             <h3 className='text-xl font-semibold mb-6 text-gray-900'>
//                 Choose a vehicle
//             </h3>

//             {/* 🚗 INSTACAB */}
//             <div
//                 onClick={() => {
//                     handleSelect('car')
//                     props.setConfirmRidePanel(true)
//                 }}
//                 className={`flex mb-4 w-full p-3 items-center justify-between 
//                 border rounded-lg cursor-pointer transition-all duration-200
//                 ${selected === 'car'
//                         ? 'bg-[#fff4f7] scale-105 shadow-md border-[#e56f96]'
//                         : 'border-[#e56f96]'}`}
//             >
//                 <img className='h-12 object-contain' src={instacab} alt="" />

//                 <div className='ml-3 flex-1'>
//                     <h4 className='text-base font-medium text-gray-900'>
//                         InstaCab <span className='text-gray-500 text-xs ml-1'><i className="ri-user-3-fill"></i> 4</span>
//                     </h4>
//                     <h5 className='text-sm text-gray-500'>2 mins away</h5>
//                     <p className='text-xs text-gray-400'>Comfortable everyday rides</p>
//                 </div>

//                 <h2 className='text-base font-semibold text-gray-900'>
//                     ₹{props.fare.car}
//                 </h2>
//             </div>

//             {/* 🏍️ MOTORBIKE */}
//             <div
//                 onClick={() => {
//                     handleSelect('moto')
//                     props.setConfirmRidePanel(true)
//                 }}
//                 className={`flex mb-4 w-full p-3 items-center justify-between 
//                 border rounded-lg cursor-pointer transition-all duration-200
//                 ${selected === 'moto'
//                         ? 'bg-[#fff4f7] scale-105 shadow-md border-[#e56f96]'
//                         : 'border-[#e56f96]'}`}
//             >
//                 <img className='h-12 object-contain' src={motorbike} alt="" />

//                 <div className='ml-3 flex-1'>
//                     <h4 className='text-base font-medium text-gray-900'>
//                         MotorBike <span className='text-gray-500 text-xs ml-1'><i className="ri-user-3-fill"></i> 1</span>
//                     </h4>
//                     <h5 className='text-sm text-gray-500'>3 mins away</h5>
//                     <p className='text-xs text-gray-400'>Quick & affordable rides</p>
//                 </div>

//                 <h2 className='text-base font-semibold text-gray-900'>
//                     ₹{props.fare.moto}
//                 </h2>
//             </div>

//             {/* 🚕 INSTAAUTO */}
//             <div
//                 onClick={() => {
//                     handleSelect('auto')
//                     props.setConfirmRidePanel(true)
//                 }}
//                 className={`flex mb-4 w-full p-3 items-center justify-between 
//                 border rounded-lg cursor-pointer transition-all duration-200
//                 ${selected === 'auto'
//                         ? 'bg-[#fff4f7] scale-105 shadow-md border-[#e56f96]'
//                         : 'border-[#e56f96]'}`}
//             >
//                 <img className='h-12 object-contain' src={instaauto} alt="" />

//                 <div className='ml-3 flex-1'>
//                     <h4 className='text-base font-medium text-gray-900'>
//                         InstaAuto <span className='text-gray-500 text-xs ml-1'><i className="ri-user-3-fill"></i> 3</span>
//                     </h4>
//                     <h5 className='text-sm text-gray-500'>3 mins away</h5>
//                     <p className='text-xs text-gray-400'>Affordable auto rides</p>
//                 </div>

//                 <h2 className='text-base font-semibold text-gray-900'>
//                     ₹{props.fare.auto}
//                 </h2>
//             </div>

//         </div>
//     )
// }

// export default VehiclePanel


import React, { useState } from 'react'
import instacab from '../assets/instacab.png'
import motorbike from '../assets/motorbike.png'
import instaauto from '../assets/instauto.png'

const VehiclePanel = (props) => {

    const [selected, setSelected] = useState(null)

    const handleSelect = (type) => {
        setSelected(type)
        props.selectVehicle(type)

        // ✅ IMPORTANT FIX
        props.setVehiclePanel(false)   // close this panel
        props.setConfirmRidePanel(true) // open next
    }

    return (
        <div className='px-4 py-4 relative'>

            {/* 🔥 DRAG HANDLE (BETTER UI) */}
            {/* <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div> */}

            {/* ❌ REMOVED absolute top issue */}

            {/* TITLE */}
            <h3 className='text-xl font-semibold mb-6 text-gray-900 text-center'>
                Choose a vehicle
            </h3>

            {/* 🚗 INSTACAB */}
            <div
                onClick={() => handleSelect('car')}
                className={`flex mb-4 w-full p-3 items-center justify-between 
                border rounded-xl cursor-pointer transition-all duration-200
                ${selected === 'car'
                        ? 'bg-[#fff4f7] scale-105 shadow-md border-[#e56f96]'
                        : 'border-gray-200'}`}
            >
                <img className='h-12 object-contain' src={instacab} alt="" />

                <div className='ml-3 flex-1'>
                    <h4 className='text-base font-medium text-gray-900'>
                        InstaCab <span className='text-gray-500 text-xs ml-1'><i className="ri-user-3-fill"></i> 4</span>
                    </h4>
                    <h5 className='text-sm text-gray-500'>2 mins away</h5>
                    <p className='text-xs text-gray-400'>Comfortable everyday rides</p>
                </div>

                <h2 className='text-base font-semibold text-gray-900'>
                    ₹{props.fare?.car || 0}
                </h2>
            </div>

            {/* 🏍️ MOTORBIKE */}
            <div
                onClick={() => handleSelect('moto')}
                className={`flex mb-4 w-full p-3 items-center justify-between 
                border rounded-xl cursor-pointer transition-all duration-200
                ${selected === 'moto'
                        ? 'bg-[#fff4f7] scale-105 shadow-md border-[#e56f96]'
                        : 'border-gray-200'}`}
            >
                <img className='h-12 object-contain' src={motorbike} alt="" />

                <div className='ml-3 flex-1'>
                    <h4 className='text-base font-medium text-gray-900'>
                        MotorBike <span className='text-gray-500 text-xs ml-1'><i className="ri-user-3-fill"></i> 1</span>
                    </h4>
                    <h5 className='text-sm text-gray-500'>3 mins away</h5>
                    <p className='text-xs text-gray-400'>Quick & affordable rides</p>
                </div>

                <h2 className='text-base font-semibold text-gray-900'>
                    ₹{props.fare?.moto || 0}
                </h2>
            </div>

            {/* 🚕 INSTAAUTO */}
            <div
                onClick={() => handleSelect('auto')}
                className={`flex mb-4 w-full p-3 items-center justify-between 
                border rounded-xl cursor-pointer transition-all duration-200
                ${selected === 'auto'
                        ? 'bg-[#fff4f7] scale-105 shadow-md border-[#e56f96]'
                        : 'border-gray-200'}`}
            >
                <img className='h-12 object-contain' src={instaauto} alt="" />

                <div className='ml-3 flex-1'>
                    <h4 className='text-base font-medium text-gray-900'>
                        InstaAuto <span className='text-gray-500 text-xs ml-1'><i className="ri-user-3-fill"></i> 3</span>
                    </h4>
                    <h5 className='text-sm text-gray-500'>3 mins away</h5>
                    <p className='text-xs text-gray-400'>Affordable auto rides</p>
                </div>

                <h2 className='text-base font-semibold text-gray-900'>
                    ₹{props.fare?.auto || 0}
                </h2>
            </div>

        </div>
    )
}

export default VehiclePanel