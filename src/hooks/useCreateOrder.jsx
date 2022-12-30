import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import customAxios from '../api/axios'
import { CART_CONTEXT_ACTIONS } from '../constants'
import { useCart } from '../context/CartContext'

const useCreateOrder = () => {
    const {dispatch} = useCart()
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null)

    const createOrder = async (url,{arg}) => {
        try {
        setIsLoading(true)
        const {data:{objectId}} = await customAxios.post(url,arg)
        const {data:{response:{body}}} = await customAxios.post('/payment/paytm',{
          orderId: objectId,
          userId: arg.orderBy
        })
        const paymentResponse = await customAxios.post('/payment/paytm/process',{
          orderId: objectId,
          txnToken: body?.txnToken
        })
        console.log(paymentResponse)
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
