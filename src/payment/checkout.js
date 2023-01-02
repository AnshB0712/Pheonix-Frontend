import { CART_CONTEXT_ACTIONS } from "../constants";
import { cancelOrder } from "../utils/cancelOrder";

export const onScriptLoad = (data,stopLoadingUI) => {
    const { orderId,token } = data
  const config = {
    root: '',
    merchant: {
      redirect: true
    },
    flow: 'DEFAULT',
    data: {
      orderId: orderId /* update order id */,
      token: token /* update token value */,
      tokenType: 'TXN_TOKEN',
      payMode: {
        order: ['UPI']
      }
    },
    handler: {
      notifyMerchant: function (eventName, data) {
        console.log('notifyMerchant handler function called');
        console.log('eventName => ', eventName);
        console.log('data => ', data);

        if(eventName == 'APP_CLOSED')
            cancelOrder(orderId).then(res => console.log(res))
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
          stopLoadingUI();
        })
        .catch(function onError (error) {
          console.log('error => ', error);
          cancelOrder(orderId).then(res => console.log(res));
        });
    });
  }
};
