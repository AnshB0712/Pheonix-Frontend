import { useState } from 'react'
import useSWRMutation from 'swr/mutation'
import customAxios from '../api/axios'
import { CART_CONTEXT_ACTIONS } from '../constants'
import { useCart } from '../context/CartContext'
import { loadDynamicScript, removeAppendedScript } from '../payment/loadScript'

const useCreateOrder = () => {

  const { dispatch } = useCart()
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState(null)

  const stopLoadingUI = () => {
    dispatch({type: CART_CONTEXT_ACTIONS.DELETE_CART})
    localStorage.removeItem('order')
    setIsLoading(false)
  }

  const createOrder = async (url, {arg}) => {
      try {
        setIsLoading(true)
        const {data:{objectId,amount }} = await customAxios.post(url, arg)
        const {data:{response:{body}}} = await customAxios.post('/payment/paytm', {
            orderId: objectId,
            userId: arg.orderBy,
            amount
          })
        loadDynamicScript({ orderId:objectId,txnToken:body?.txnToken },stopLoadingUI)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
        setError(error)
      } finally {
        removeAppendedScript()
      }      
}
    
const { trigger } = useSWRMutation('/user/create-a-order', createOrder)

return({ trigger, isLoading, error })

}

export default useCreateOrder