import React from 'react'
import jwt_decode from 'jwt-decode'
import refreshAccessToken from '../api/refreshAccessToken'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { LoadingOverlay } from '@mantine/core'
import { Outlet } from 'react-router-dom'

const PersistLogin = () => {
    const { setUser,user } = useAuth()
    const [loading,setLoading] = useState(true)
    const persistedUserInfo = localStorage.getItem('user')
  
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const token = await refreshAccessToken()
                const { mobile } = jwt_decode(token)
                setUser({...JSON.parse(persistedUserInfo),mobile,token})
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        persistedUserInfo && !user?.token ? verifyRefreshToken() : setLoading(false)
    },[])

  return (
    user 
    ? loading ? <LoadingOverlay visible/> : <Outlet/> 
    : <Outlet/>
  )
}

export default PersistLogin
