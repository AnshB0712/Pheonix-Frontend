import { Group, LoadingOverlay, Modal,Space,Text } from '@mantine/core'
import OTPlessSdk from 'otpless-js-sdk'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import WhatsAppButton from './WhatsAppButton'

const {getState,getToken} = OTPlessSdk(
  {
      appId: import.meta.env.VITE_APP_ID,
      enableErrorLogging: true
});

const AuthModal = () => {
  
    const navigate = useNavigate()
    const {dispatch,user} = useAuth()

    useEffect(() => {
  
      const token = getToken()
      const state = getState()

      if(!token || !state) return

     dispatch({
      type:'INITIATE_USER_AUTH',
      payload: {token,state}
     })

    },[])

    useEffect(() => {
      if(user.user?.token) navigate('/')
    },[user.user])


    return (
        <Modal opened withCloseButton={false} centered closeOnClickOutside={true} onClose={() => navigate('/')}>
          <LoadingOverlay visible={user?.isUserLoading}/>
            <Group position='center'>
                <Text fw={600} fz={32}>Hello!</Text>
                <Text fw={500} ta={'center'}>Use your WhatsApp credentials to continue your order.</Text>
            </Group>
            <Space h="lg"/>
            {user?.userError && <Text c={'red'} fw={600} fz={12} ta='center'>ERR: {user?.userError?.message}</Text>}
            {user?.userError && <Space h="xs"/>}
            <WhatsAppButton />
        </Modal>
    )
}

export default AuthModal
