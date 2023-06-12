import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Logout = ({ icon, color, label , to}) => {
    const { dispatch,user } = useAuth()

    const handlLogout = () =>  dispatch({type:'LOGOUT_USER'})
    
  return (
    <UnstyledButton
    loading={user.user.isUserLoading}
    sx={(theme) => ({
      display: 'flex',
      alignItems:"center",
      justifyContent: 'space-between',
      width: '100%',
      background: '#2d2f3a',
      padding: theme.spacing.md,
      borderRadius: 20,
      marginBottom: theme.spacing.md,
      color: '#fee1e1'
    })}
    component={NavLink}
    to={to}
    onClick={handlLogout}
  >
    <Group>
      <ThemeIcon color={color} variant="light">
        {icon}
      </ThemeIcon>

      <Text size="md" fw={500}>{label}</Text>
    </Group>

  </UnstyledButton>
  )
}

export default Logout
