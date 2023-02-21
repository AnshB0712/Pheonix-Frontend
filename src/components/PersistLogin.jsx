import React from 'react'
import jwt_decode from 'jwt-decode'
import refreshAccessToken from '../api/refreshAccessToken'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { LoadingOverlay } from '@mantine/core'
import { Outlet } from 'react-router-dom'

const PersistLogin = () => {
    const { user,dispatch } = useAuth()
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const token = await refreshAccessToken()
                const { name } = jwt_decode(token)
                dispatch({action: {type: 'USER_DATA',payload:{name,token}}})
                setLoading(false)
            } catch (err) {
                console.log(err);
                setLoading(false)
            }finally{
                setLoading(false)
            }
        }
        !user.user?.token ? verifyRefreshToken() : setLoading(false)
    },[])

  return (
    user.user 
    ? loading ? <LoadingOverlay visible/> : <Outlet/> 
    : <Outlet/>
  )
}

export default PersistLogin
