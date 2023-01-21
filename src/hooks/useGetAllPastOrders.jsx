import { useEffect,useState } from 'react'
import { useAuth } from '../context/AuthContext'
import usePrivateAxios from './usePrivateAxios'

const useGetAllPastOrders = (page) => {
  const customAxios = usePrivateAxios()
  const { user } = useAuth()
  const [state,setState] = useState({
    data: undefined,
    error: undefined,
    loading: true
  })

  useEffect(() => console.log(state.error),[state.error])

  useEffect(() => {
    const controller = new AbortController()
    const fetchOrders = async () => {
      try {
        const response = await customAxios.get(`user/get-all-orders`,{
          params:{
            userId: user.id,
            page:page
          },
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
      } finally {
        setState(p => ({...p,loading:false}))
      }
    }
    fetchOrders()
    return () => controller.abort()
  },[page,user?.id])

  return ({ data: state.data,error: state.error,isLoading: state.loading })
}

export default useGetAllPastOrders