import customAxios from '../api/axios'
import { useAuth } from '../context/AuthContext'

const useRefreshToken = () => {
    const { setUser } = useAuth()
    const refresh = async () => {
        const {data} = await customAxios.get('/renew')
        setUser(p => ({...p,token: data?.token}))
        // CHANGING TOKEN IN LOCAL STORAGE TOO
        localStorage.setItem('user',JSON.stringify({
           ... JSON.parse(localStorage.getItem('user')),
           token: data?.token
        }))
        return data?.token
    }
  return (refresh)
}

export default useRefreshToken
