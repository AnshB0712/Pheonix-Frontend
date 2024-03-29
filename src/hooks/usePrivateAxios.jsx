/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import customAxios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import refreshAccessToken from '../api/refreshAccessToken';

const usePrivateAxios = () => {
  const { user, dispatch } = useAuth();

  useEffect(() => {
    const requestInterceptor = customAxios.interceptors.request.use(
      (config) => {
        if (!config.headers.authorization) {
          config.headers.authorization = user.user?.token ? `Bearer ${user.user.token}` : undefined;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );
    const responseInterceptor = customAxios.interceptors.response.use(
      (res) => res,
      async (err) => {
      
          const prevReq = err?.config;
          if (err?.response?.status === 403 && !prevReq?.sent) {
            prevReq.sent = true;
            const newAccessToken = await refreshAccessToken();
            dispatch({action: {type: 'UPADTE_USER_TOKEN',payload: newAccessToken}})
            prevReq.headers.authorization = `Bearer ${newAccessToken}`;
            return customAxios(prevReq);
          }
          return Promise.reject(err);
      },
    );
    return () => {
      customAxios.interceptors.request.eject(requestInterceptor);
      customAxios.interceptors.response.eject(responseInterceptor);
    };
  }, [user.user,dispatch]);

  return (customAxios);
};

export default usePrivateAxios;
