import useSWR  from 'swr'
import axios from 'axios'

const fetcher = (...args) => axios.get(...args).then(({data}) => data)

const useGetDishes = (searchQuery) => {
  const {data,error} = useSWR(['http://localhost:3000/',{params:{category:searchQuery}}],fetcher)
  return ({
    data,
    isLoading: !data && !error,
    error
  })
}

export default useGetDishes
