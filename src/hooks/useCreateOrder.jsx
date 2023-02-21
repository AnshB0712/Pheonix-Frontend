import useSWRMutation from 'swr/mutation'
import usePrivateAxios from '../hooks/usePrivateAxios'
import { loadDynamicScript, removeAppendedScript } from '../payment/loadScript'

const useCreateOrder = () => {

  const customAxios = usePrivateAxios()

  const createOrder = async (url, {arg}) => {
      try {
        const {data:{objectId,amount}} = await customAxios.post(url, arg);
        const {data:{response:{body}}} = await customAxios.post('/payment/paytm', {
            orderId: objectId,
            userId: arg.orderBy,
            amount
          })
        loadDynamicScript({ orderId:objectId,txnToken:body?.txnToken })
      } finally {
        removeAppendedScript()
      }      
}
    
const { trigger,error,isMutating } = useSWRMutation('/user/create-a-order', createOrder)

return({ trigger, isLoading:isMutating, error })

}

export default useCreateOrder