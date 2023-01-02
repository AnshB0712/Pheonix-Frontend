import {
  useState
} from 'react'
import useSWRMutation from 'swr/mutation'
import customAxios from '../api/axios'
import {
  CART_CONTEXT_ACTIONS
} from '../constants'
import {
  useCart
} from '../context/CartContext'

const useCreateOrder = () => {
  const {
    dispatch
  } = useCart()
  const [isLoading,
    setIsLoading] = useState(false)
  const [error,
    setError] = useState(null)

  const createOrder = async (url, {arg}) => {
    try {
      setIsLoading(true)
      const {
        data: {
          objectId
        }} = await customAxios.post(url, arg)
      const {
        data: {
          response: {
            body
          }}} = await customAxios.post('/payment/paytm', {
          orderId: objectId,
          userId: arg.orderBy
        })

      let script = document.createElement("script");
      script.type = "application/javascript"
      script.crossorigin = "anonymous"
      script.src = "https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/sYSLCQ80020853041607.js"
      document.body.appendChild(script);
      
      script.onload = function onLoad() {
        
        if (window.Paytm && window.Paytm.CheckoutJS) {
          window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad () {
            window.Paytm.CheckoutJS.init({
              "merchant": {
                "redirect": true
              },
              "payMode": {
                "order": ['UPI', 'CARD']
              },
              "data": {
                "orderId": objectId, /* update order id */
                "token": body?.txnToken, /* update token value */
                "tokenType": "TXN_TOKEN",
                "amount": "1" /* update amount */
              },
              "handler": {
                notifyMerchant: function (eventName, data) {
                  console.log('notifyMerchant handler function called');
                  console.log('eventName => ', eventName);
                  console.log('data => ', data);
                },
                transactionStatus: function (data) {
                  console.log('payment status ', data);
                }
              }}).then(() => {
                window.Paytm
                .CheckoutJS.invoke();
              localStorage.removeItem('order');
              dispatch({
                type: CART_CONTEXT_ACTIONS.DELETE_CART
              })
              setIsLoading(false)
              }).catch(e => {
                console.log('error => ',e)
              })
          });
        }
}}
    catch (error) {
    setError(error)
    setIsLoading(false)
}
}
const {
trigger
} = useSWRMutation('/user/create-a-order', createOrder)

return({
trigger, isLoading, error
})
}

export default useCreateOrder