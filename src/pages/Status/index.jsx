import { Modal, Paper } from '@mantine/core'
import { useParams } from 'react-router-dom'
import React from 'react'
import OrderDetails from './components/OrderDetails'
import Waves from './components/Waves'
import useGetOrderStatus from '../../hooks/useGetOrderStatus'
import EmptyStateComponent from '../../components/EmptyStateComponent'
import { useCart } from '../../context/CartContext'
import { useEffect } from 'react'
import { CART_CONTEXT_ACTIONS } from '../../constants'

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

  if(isLoading) return <EmptyStateComponent index={'3'}/>
  
  return (
    <Modal 
    styles={(theme) => ({modal: {padding:'0px !important'}})} 
    fullScreen 
    opened 
    withCloseButton={false}>
        <Waves id={data?.data?._id} paymentstatus={data?.data?.paymentStatus}/>
        <Paper style={{padding:'10px'}}>
            <OrderDetails data={data?.data}/>
        </Paper>
    </Modal>
  )
}

export default StatusPage
