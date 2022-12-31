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

        let script = document.createElement("script");
        script.type = "application/javascript"
        script.crossorigin = "anonymous"
        script.src = "https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/sYSLCQ80020853041607.js"
        document.body.appendChild(script);
        script.onload = () => {
          const config = {
            root: '',
            merchant: {
              redirect: true
            },
            flow: 'DEFAULT',
            data: {
              orderId: objectId /* update order id */,
              token: body?.txnToken /* update token value */,
              tokenType: 'TXN_TOKEN',
              amount: '1',
              payMode: {
                order: ['UPI','BALANCE', 'PPBL', 'PDC'],
                labels: {
                  "UPI":"Bhim UPI"
                },
                filter: {
                  include:['UPI']
                }
              }
            },
            handler: {
              notifyMerchant: function (eventName, data) {
                console.log('notifyMerchant handler function called');
                console.log('eventName => ', eventName);
                console.log('data => ', data);
              },
              transactionStatus: function (data) {
                console.log('payment status ', data);
              }
            }
          };
        
          if (window.Paytm && window.Paytm.CheckoutJS) {
            window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad () {
              // initialze configuration using init method
              window.Paytm.CheckoutJS.init(config)
                .then(function onSuccess () {
                  // after successfully updating configuration, invoke JS Checkout
                  window.Paytm.CheckoutJS.invoke();
                })
                .catch(function onError (error) {
                  console.log('error => ', error);
                });
            });
          }
        }
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
