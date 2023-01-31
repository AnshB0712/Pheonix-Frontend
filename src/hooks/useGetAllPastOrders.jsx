import { useEffect,useState } from 'react'
import { useAuth } from '../context/AuthContext'
import usePrivateAxios from './usePrivateAxios'

const useGetAllPastOrders = (page) => {
  const customAxios = usePrivateAxios()
  const [state,setState] = useState({
    data: undefined,
    error: undefined
    })

  useEffect(() => {
    const controller = new AbortController()
    const fetchOrders = async () => {
      try {
        const response = await customAxios.get(`user/get-all-orders`,{
          params:{page},
          signal: controller.signal
        })
        setState({
          data: response.data,
          error: undefined
        })
      } catch (error) {
        if(error.name === 'CanceledError') return
        setState({
          data: undefined,
          error: error
        })
      }
    }
    fetchOrders()
    return () => controller.abort()
  },[page])

  return ({ data: state.data,error: state.error,isLoading: !state.data && !state.error })
}

export default useGetAllPastOrders