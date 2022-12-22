import { Avatar, Group, Text } from '@mantine/core'
import { IconLocation, IconMapPin, IconMapPins } from '@tabler/icons'
import React from 'react'

const UserBox = () => {
  return (
    <Group position="apart" sx={(theme) => ({
      border: `1px solid ${theme.colors.gray[4]}`,
      borderRadius: 8,
      padding: theme.spacing.sm
    })}>
      <div>
        <Text size={16}>Hi, Guest User!</Text>
        <div style={{display:"flex",gap:'4px'}}>
          <IconMapPins color='#0d76c1'/>
          <Text size={14} fs="italic" color={'dimmed'}>PU Campus,Waghodia</Text>
        </div>
      </div>
      <Avatar color="blue" radius="xl">MK</Avatar>
    </Group>
  )
}

export default UserBox
