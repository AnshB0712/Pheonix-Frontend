import { Button, Loader, Paper, Stack, Text } from '@mantine/core'
import { Link, useParams } from 'react-router-dom'
import React from 'react'
import OrderDetails from './components/OrderDetails'
import Waves from './components/Waves'
import useGetOrderStatus from '../../hooks/useGetOrderStatus'
import EmptyStateComponent from '../../components/EmptyStateComponent'
import { useCart } from '../../context/CartContext'
import { useEffect } from 'react'
import { CART_CONTEXT_ACTIONS } from '../../constants'


const PaymentProcessLoader = () => {
  return (
    <Stack spacing={7} p={8} align={'center'} justify='center' style={{height:'500px'}}>
      <Loader size={'lg'} variant='dots' />
      <Text ta={'center'} size={'sm'} fs='italic'>Please do not refresh while we confirm your payment status...</Text>
    </Stack>
  )
}

const StatusPage = () => {
  const { orderId } = useParams()
  const {data, isLoading} = useGetOrderStatus(orderId)
  const {dispatch} = useCart()

  useEffect(() => {
    if(data?.data?.paymentStatus === 'SXS'){
      dispatch({type: CART_CONTEXT_ACTIONS.DELETE_CART})
      localStorage.removeItem('order')
    }
  },[data?.data])

  if(isLoading) return <PaymentProcessLoader/>

  return (
    <Paper>
        <Waves id={data?.data?._id} paymentstatus={data?.data?.paymentStatus}/>
        <Paper>
            <OrderDetails data={data?.data}/>
        </Paper>
        <Button component={Link} to='/my-orders' fullWidth size='md' variant='white' mt={10}>Back to MyOrders</Button>
    </Paper>
  )
}

export default StatusPage
