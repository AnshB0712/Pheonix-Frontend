import { Avatar, Group, Text } from '@mantine/core'
import { IconMapPins } from '@tabler/icons'
import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import getInitialsFromString from '../../../utils/getInitialsFromString'

const UserBox = () => {
  const {user} = useAuth()
  return (
    <Group position="apart" sx={(theme) => ({
      border: `1px solid ${theme.colors.gray[4]}`,
      borderRadius: 8,
      padding: theme.spacing.sm
    })}>
      <div>
        <Text size={16}>{`Hi, ${user ? user?.name?.split('+')?.join(' ') : "Guest User"}!`}</Text>
        <div style={{display:"flex",gap:'4px'}}>
          <IconMapPins color='#0d76c1'/>
          <Text size={14} fs="italic" color={'dimmed'}>PU Campus,Waghodia</Text>
        </div>
      </div>
      <Avatar color="blue" radius="xl">{user ? getInitialsFromString(user.name) : "GU"}</Avatar>
    </Group>
  )
}

export default UserBox
