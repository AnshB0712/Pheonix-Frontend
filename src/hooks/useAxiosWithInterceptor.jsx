import React from 'react'
import { useEffect } from 'react';
import customAxios from '../api/axios'
import { useAuth } from '../context/AuthContext';

const useAxiosWithInterceptor = () => {
  const {user} = useAuth()
  useEffect(() => {
    const requestIntercept = customAxios.interceptors.request.use(
      config => {
        if(!config.headers['authorization']){
          config.headers['authorization'] = user?.token ? `Bearer ${user?.token}` : undefined;
        }
        return config
      },
      err => Promise.reject(err)
    )
    return () => {
      customAxios.interceptors.request.eject(requestIntercept)
    }
    },[user])
  return (customAxios)
}

export default useAxiosWithInterceptor
