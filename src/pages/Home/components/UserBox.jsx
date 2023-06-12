import { ActionIcon, Avatar, Button, Group, Stack, Text } from '@mantine/core'
import { IconBrandDeliveroo } from '@tabler/icons'
import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import getInitialsFromString from '../../../utils/getInitialsFromString'

const UserBox = () => {
  const {user} = useAuth()
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'auto 2fr 1fr',
      gap:'1rem',
      placeItems:'center',
      borderRadius: '16px',
      background: '#fff',
      padding: '1rem'
    }}>
    <Avatar color="dark" radius="xl" size={'lg'}>{"GU"}</Avatar>

    <Stack spacing={0} mr='auto'>
      <Text color='dimmed' >Greetings from us,</Text>
      <Text size={18} fw={500} color='dark'>{`${ user.user?.name || "Guest User"}`}</Text>
    </Stack>

      <ActionIcon variant='outline' radius={'lg'} size={'xl'}>
        <IconBrandDeliveroo />
      </ActionIcon>

    </div>
  )
}

export default UserBox
