import useSWR from 'swr'
import customAxios from '../api/axios'
import { useAuth } from '../context/AuthContext'

const fetcher = (args) => customAxios.get(...args).then(({data}) => data)

const useGetAllPastOrders = () => {
  const { user } = useAuth()
  const { data,error,isLoading } = useSWR([`user/get-all-orders`,{params:{userId: user.id}}],fetcher)
  return ({ data,error,isLoading })
}

export default useGetAllPastOrders