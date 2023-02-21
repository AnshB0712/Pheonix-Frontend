import { Button } from '@mantine/core'
import WhatsLogo from "./WhatsLogo"
import React, { useState } from 'react'
import OtplessSdk from "otpless-js-sdk";

const {createGetIntentOnClick} = OtplessSdk(
    {
        appId: import.meta.env.VITE_APP_ID,
        enableErrorLogging: true
  });

const WhatsAppButton = () => {

    const [wait,setWait] = useState(false)

    const handleClick = async () => {
      try {
        setWait(true)
        await createGetIntentOnClick({redirectionURL: `${import.meta.env.VITE_FRONTEND_URL}/auth`})()
      } catch (error) {
        console.log(error);
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
