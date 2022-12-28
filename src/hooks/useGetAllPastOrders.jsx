import useSWR from 'swr'
import { useAuth } from '../context/AuthContext'
import useAxiosWithInterceptor from './useAxiosWithInterceptor'

const useGetAllPastOrders = () => {
  const { user } = useAuth()
  const customAxios = useAxiosWithInterceptor()
  const fetcher = (args) => customAxios.get(...args).then(({data}) => data)
  const { data,error,isLoading } = useSWR([`user/get-all-orders`,{params:{userId: user.id}}],fetcher)
  return ({ data,error,isLoading })
}

export default useGetAllPastOrders