import { Button } from '@mantine/core'
import WhatsLogo from "./WhatsLogo"
import React from 'react'
import OtplessSdk from "otpless-js-sdk";


const WhatsAppButton = ({wait,setWait}) => {

    const {createGetIntentOnClick} = OtplessSdk(
        {
            appId: import.meta.env.VITE_APP_ID,
            enableErrorLogging: true
      });
      
  return (
    <Button loading={wait} size='md' leftIcon={<WhatsLogo/>} fullWidth bg={"#25D366"} onClick={async() => {
      setWait(true)
      await createGetIntentOnClick({redirectionURL: location.href.split('?')[0]})()
    }}>
       Continue with WhatsApp
    </Button>
  )
}

export default WhatsAppButton
