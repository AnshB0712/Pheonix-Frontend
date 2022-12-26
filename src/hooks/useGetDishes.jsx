import useSWR  from 'swr'
import customAxios, { BASE_URL } from '../api/axios'

const fetcher = (args) => customAxios.get(...args).then(({data}) => data)

const useGetDishes = (searchQuery) => {
  const {data,error,isLoading} = useSWR([BASE_URL,{params:{category:searchQuery}}],fetcher)
  return ({
    data,
    isLoading,
    error
  })
}

export default useGetDishes
