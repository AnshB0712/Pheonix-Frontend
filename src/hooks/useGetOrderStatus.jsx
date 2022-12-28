import useSWR from 'swr'
import useAxiosWithInterceptor from './useAxiosWithInterceptor'

const useGetOrderStatus = (orderId) => {
  const customAxios = useAxiosWithInterceptor()
  const fetcher = (args) => customAxios.get(...args).then(({data}) => data)
  const { data,error,isLoading } = useSWR([`shared/order`,{params:{orderId}}],fetcher,{
    refreshInterval: 60000
  })
  return ({ data,error,isLoading })
}

export default useGetOrderStatus
