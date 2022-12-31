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

        script.onload = () => {
            //Add callback function to CheckoutJS onLoad function
        window.Paytm.CheckoutJS.onLoad(function       excecuteAfterCompleteLoad() {
          //Config
          var config = {
            flow:"DEFAULT",
            hidePaymodeLabel: true,
            data:{
              orderId:objectId,
              amount: 1,
              token:"token",
              tokenType:body?.txnToken
            },
            merchant:{
              mid:"mid"
            },
            handler: {
              notifyMerchant: function(eventType, data) {
                console.log("notify merchant called", eventType, data);
              }
            }
          };

          //Create elements instance
          var elements = window.Paytm.CheckoutJS.elements(config);
          //Create card element
          var cardElement = elements.createElement(window.Paytm.CheckoutJS.ELEMENT_PAYMODE.CARD, {root: "#card", style: {bodyBackgroundColor: "blue"}});
          //Render element
          cardElement.invoke();
        });
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
