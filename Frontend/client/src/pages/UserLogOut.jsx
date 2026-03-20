// import React from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// export const UserLogout = () => {

//     const token = localStorage.getItem('token')
//     const navigate = useNavigate()

//     axios.get(`${import.meta.env.VITE_API_URL}/user/logout`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }).then((response) => {
//         if (response.status === 200) {
//             localStorage.removeItem('token')
//             navigate('/login')
//         }
//     })

//     return (
//         <div>UserLogout</div>
//     )
// }

// export default UserLogout


import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const token = localStorage.getItem('token')

                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/users/logout`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (response.status === 200) {
                    localStorage.removeItem('token')
                    navigate('/login')
                }

            } catch (err) {
                console.error("Logout Error:", err)

                // even if error → force logout locally
                localStorage.removeItem('token')
                navigate('/login')
            }
        }

        logoutUser()
    }, [])

    return (
        <div className='h-screen flex items-center justify-center text-gray-500'>
            Logging out...
        </div>
    )
}

export default UserLogout