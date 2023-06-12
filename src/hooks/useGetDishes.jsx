import useSWR  from 'swr'
import customAxios, { BASE_URL } from '../api/axios'

const fetcher = (url) => customAxios.get(url).then(({data}) => data)

const useGetDishes = (searchQuery) => {
  const {data,error,isLoading} = useSWR(`${BASE_URL}/?category=${searchQuery}`,(url) => fetcher(url))
  return ({
    data,
    isLoading,
    error
  })
}

export default useGetDishes
