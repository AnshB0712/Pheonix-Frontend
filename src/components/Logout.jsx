import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Logout = ({ icon, color, label , to, setOpen}) => {
    const { setUser } = useAuth()

  return (
    <UnstyledButton
    sx={(theme) => ({
      display: 'flex',
      alignItems:"center",
      justifyContent: 'space-between',
      width: '100%',
      padding: theme.spacing.sm,
      border: `1px solid ${theme.colors.gray[4]}`,
      borderRadius: 10,
      marginBottom: theme.spacing.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      },
    })}
    component={NavLink}
    to={to}
    onClick={() => {
        localStorage.removeItem('user');
        setUser(null)
        setOpen(false)
    }}
  >
    <Group>
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>

      <Text size="md">{label}</Text>
    </Group>

    <IconChevronRight color='#A6A7AB'/>
  </UnstyledButton>
  )
}

export default Logout
