import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import { CART_CONTEXT_ACTIONS } from '../constants'
import { useCart } from '../context/CartContext'
import useAxiosWithInterceptor from './useAxiosWithInterceptor'

const useCreateOrder = () => {
    const axiosWithInt = useAxiosWithInterceptor()
    const {dispatch} = useCart()
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)

    const createOrder = async (url,{arg}) => {
        try {
        setIsLoading(true)
        await axiosWithInt.post(url,arg)
        localStorage.removeItem('order');
        dispatch({type: CART_CONTEXT_ACTIONS.DELETE_CART})

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
