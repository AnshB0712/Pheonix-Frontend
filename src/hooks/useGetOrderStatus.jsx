import useSWR from 'swr'
import usePrivateAxios from './usePrivateAxios'


const useGetOrderStatus = (orderId) => {
  const customAxios = usePrivateAxios()
  const fetcher = (args) => customAxios.get(...args).then(({data}) => data)
  const { data,error,isLoading } = useSWR([`shared/order`,{params:{orderId}}],fetcher,{
    refreshInterval: 60000
  })
  return ({ data,error,isLoading })
}

export default useGetOrderStatus
