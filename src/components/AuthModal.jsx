import { Group, Modal,Space,Text } from '@mantine/core'
import OTPlessSdk from 'otpless-js-sdk'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import customAxios from '../api/axios'
import { useAuth } from '../context/AuthContext'
import WhatsAppButton from './WhatsAppButton'

const AuthModal = () => {
    const [wait,setWait] = useState(false)
    const [error,setError] = useState(undefined)
    const {setUser} = useAuth()
    const navigate = useNavigate()

    const {getState,getToken} = OTPlessSdk(
      {
          appId: import.meta.env.VITE_APP_ID,
          enableErrorLogging: true
    });
    
    useEffect(() => {
  
      const token = getToken()
      const state = getState()

      if(!token || !state) return

      const handleWhatsAppLogin = async (token,state) => {
        setWait(true)
        try {
          const {data} = await customAxios.post("auth/whatsapp-login",{ token,state })
          setUser(data)
          setError('')
          navigate('/')
        } catch (error) {
          console.log(error)
          setError(error)
        } finally{
          setWait(false)
        }
      }

      handleWhatsAppLogin(token,state)
    },[])

    return (
        <Modal opened withCloseButton={false} centered closeOnClickOutside={true} onClose={() => navigate('/')}>
            <Group position='center'>
                <Text fw={600} fz={32}>Hello!</Text>
                <Text fw={500} ta={'center'}>Use your WhatsApp credentials to continue your order.</Text>
            </Group>
            <Space h="lg"/>
            {error && <Text c={'red'} fw={600} fz={12} ta='center'>ERR: {error.message}</Text>}
            {error && <Space h="xs"/>}
            <WhatsAppButton wait={wait} setWait={setWait} setError={setError}/>
        </Modal>
    )
}

export default AuthModal
