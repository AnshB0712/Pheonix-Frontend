import useSWR from 'swr'
import customAxios from '../api/axios'
const fetcher = (args) => customAxios.get(...args).then(({data}) => data)

const useGetOrderStatus = (orderId) => {
    const { data,error,isLoading } = useSWR([`shared/order`,{params:{orderId}}],fetcher)
  return ({ data,error,isLoading })
}

export default useGetOrderStatus
