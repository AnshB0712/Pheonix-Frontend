import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import EmptyStateComponent from './EmptyStateComponent'

const ProtectedRoute = () => {
  const { user } = useAuth()
  return (user ? <Outlet/>:<EmptyStateComponent index={'4'}/>)
}

export default ProtectedRoute
