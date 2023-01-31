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
  
    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const token = await refreshAccessToken()
                const { name } = jwt_decode(token)
                setUser({name,token})
                setLoading(false)
            } catch (err) {
                console.log(err);
            }
        }
        !user?.token ? verifyRefreshToken() : setLoading(false)
    },[])

  return (
    user 
    ? loading ? <LoadingOverlay visible={loading}/> : <Outlet/> 
    : <Outlet/>
  )
}

export default PersistLogin
