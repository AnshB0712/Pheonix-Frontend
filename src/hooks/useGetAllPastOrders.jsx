import useSWR from 'swr'
import { useAuth } from '../context/AuthContext'
import usePrivateAxios from './usePrivateAxios'


const useGetAllPastOrders = (page) => {
  const { user } = useAuth()
  const customAxios = usePrivateAxios()
  const fetcher = (args) => customAxios.get(...args).then(({data}) => data)
  const { data,error,isLoading } = useSWR(user?.id ? [`user/get-all-orders`,{
    params:{
      userId: user.id,
      page:page
    }}] : null,fetcher)
  return ({ data,error,isLoading })
}

export default useGetAllPastOrders