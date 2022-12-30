import axios from 'axios'
import getTokenFromLocalStorage from '../utils/getTokenFromLocalStorage';
import refreshAcessToken from '../utils/refreshAcessToken';

export const BASE_URL =  'http://localhost:3000/'
{/*'http://localhost:3000/'*/}

const customAxios = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

customAxios.interceptors.request.use(
    config => {
      if(!config.headers['authorization']){
        config.headers['authorization'] = `Bearer ${getTokenFromLocalStorage()}`;
      }
      return config
    },
    err => Promise.reject(err)
)

customAxios.interceptors.response.use(
    res => res,
    async(err) => {
      const prevReq = err?.config
      if(err?.response?.status === 400 && !prevReq?.sent){
        prevReq.sent = true;
        const newAccessToken = await refreshAcessToken();
        prevReq.headers['authorization'] = `Bearer ${newAccessToken}`;
        return customAxios(prevReq);
      }
      return Promise.reject(err)
    }
  )

export default customAxios