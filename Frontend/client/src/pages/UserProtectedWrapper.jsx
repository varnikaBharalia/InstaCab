// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectedWrapper = ({ children }) => {

    // const { user } = useContext(UserDataContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    console.log(token);

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [navigate, token])

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectedWrapper
