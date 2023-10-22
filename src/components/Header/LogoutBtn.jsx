import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import authService from '../../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                navigate('/')
                toast.success('Logged out successfully')
            })
            .catch((error) => {
                console.log(error)
                toast.error('Error logging out')
            })
    }
    return (
        <button onClick={handleLogout} className='inline-bock px-6 py-2 duration-800 hover:bg-purple-500 transition-all  rounded-full'>Logout</button>
    )
}

export default LogoutBtn