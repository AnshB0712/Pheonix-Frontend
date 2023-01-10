import { Button } from '@mantine/core'
import WhatsLogo from "./WhatsLogo"
import React from 'react'
import OtplessSdk from "otpless-js-sdk";


const WhatsAppButton = ({wait,setWait,setError}) => {

    const {createGetIntentOnClick} = OtplessSdk(
        {
            appId: import.meta.env.VITE_APP_ID,
            enableErrorLogging: true
      });

    const handleClick = async () => {
      try {
        setWait(true)
        await createGetIntentOnClick({redirectionURL: location.href.split('?')[0]})()
      } catch (error) {
        console.log(error);
        setError(error)
      } finally {
        setWait(false)
      }
    }
      
  return (
    <Button loading={wait} styles={() => ({
      'root': {
        backgroundColor:'#25D366'
      }
    })} size='md' leftIcon={<WhatsLogo/>} fullWidth onClick={handleClick}>
       Continue with WhatsApp
    </Button>
  )
}

export default WhatsAppButton
