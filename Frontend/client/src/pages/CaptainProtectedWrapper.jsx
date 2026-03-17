import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if (!token) {
            navigate('/captain-login')
            return
        }

        const fetchCaptain = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )

                if (response.status === 200) {
                    setCaptain(response.data.captain)
                    setIsLoading(false)
                }

            } catch (err) {
                console.error("Auth Error:", err)
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }

        fetchCaptain()

    }, [navigate, setCaptain, token])

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center text-lg">
                Loading...
            </div>
        )
    }

    return children
}

export default CaptainProtectWrapper