import React from 'react'
import api from '../lib/api'
import { useNavigate } from 'react-router-dom'

export const UserLogout = () => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    api.get('/users/logout').then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    })

    return (
        <div>UserLogout</div>
    )
}

export default UserLogout
