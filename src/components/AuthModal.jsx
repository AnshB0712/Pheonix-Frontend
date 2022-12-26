import { Group, Modal,Space,Text } from '@mantine/core'
import axios from 'axios'
import OTPlessSdk from 'otpless-js-sdk'
import React, { useEffect, useState } from 'react'
import customAxios from '../api/axios'
import { useAuth } from '../context/AuthContext'
import WhatsAppButton from './WhatsAppButton'

const AuthModal = ({openAuthModal,setOpenAuthModal,fetchingUser}) => {
    const [wait,setWait] = useState(false)
    const {setUser} = useAuth()

    const {getState,getToken} = OTPlessSdk(
      {
          appId: import.meta.env.VITE_APP_ID,
          enableErrorLogging: true
    });

    const token = getToken()
    const state = getState()

    useEffect(() => {

      if(!token || !state) return

      const handleWhatsAppLogin = async (token,state) => {
        setWait(true)
        try {
          const {data} = await customAxios.post("auth/whatsapp-login",{ token,state },{
            withCredentials: true
          })
          setUser(data)
          setOpenAuthModal(false)
        } catch (error) {
          console.log(error)
        } finally{
          setWait(false)
        }
      }

      handleWhatsAppLogin(token,state)

    },[])

    return (
        <Modal opened={openAuthModal} withCloseButton={false} centered closeOnClickOutside={true} onClose={() => setOpenAuthModal(false)}>
            <Group position='center'>
                <Text fw={600} fz={32}>Hello!</Text>
                <Text fw={500} ta={'center'}>Use your WhatsApp credentials to continue your order.</Text>
            </Group>
            <Space h="lg"/>
            <WhatsAppButton wait={wait} setWait={setWait}/>
        </Modal>
    )
}

export default AuthModal
