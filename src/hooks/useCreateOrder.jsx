import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import useAxiosWithInterceptor from './useAxiosWithInterceptor'

const useCreateOrder = () => {
    const axiosWithInt = useAxiosWithInterceptor()
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)

    const createOrder = async (url,{arg}) => {
        try {
        setIsLoading(true)
        await axiosWithInt.post(url,arg).then((res) => res)
        } catch (error) {
        setError(error)
        }finally{
        setIsLoading(false)
        }
    }

    const {trigger} = useSWRMutation('/user/create-a-order',createOrder)

  return({trigger,isLoading,error})
}

export default useCreateOrder
