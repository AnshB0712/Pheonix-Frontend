import { useEffect } from 'react';
import customAxios from '../api/axios'
import { useAuth } from '../context/AuthContext';
import useRefreshToken from './useRefreshToken';

const useAxiosWithInterceptor = () => {
  const {user} = useAuth()
  const refresh = useRefreshToken()
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
    const responseIntercept = customAxios.interceptors.response.use(
      res => res,
      async(err) => {
        const prevReq = err?.config
        if(err?.response?.status === 400 && !prevReq?.sent){
          prevReq.sent = true;
          const newAccessToken = await refresh();
          prevReq.headers['authorization'] = `Bearer ${newAccessToken}`;
          return customAxios(prevReq);
        }
        return Promise.reject(err)
      }
    )
    return () => {
      customAxios.interceptors.request.eject(requestIntercept)
      customAxios.interceptors.response.eject(responseIntercept)
    }
    },[user])
  return (customAxios)
}

export default useAxiosWithInterceptor
