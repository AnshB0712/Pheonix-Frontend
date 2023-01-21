import { Button, Center } from '@mantine/core'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import EmptyStateComponent from './EmptyStateComponent'

const ProtectedRoute = () => {
  const { user } = useAuth()
  return (user 
    ? <Outlet/>
    : <>
        <EmptyStateComponent index={'4'}/>
        <Center>
          <Button variant='subtle' style={{textDecoration:'underline'}} component={Link} to='/'>
              Back To Home
          </Button>
        </Center>
      </>
  )
}

export default ProtectedRoute
