
import React from 'react'
import api from '../lib/api'
import { useNavigate } from 'react-router-dom'

export const CaptainLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    api.get('/captains/logout').then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/captain-login')
        }
    })

    return (
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout