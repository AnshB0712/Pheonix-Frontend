import { Loader, Modal, Paper } from '@mantine/core'
import { useParams } from 'react-router-dom'
import React from 'react'
import OrderDetails from './components/OrderDetails'
import Waves from './components/Waves'
import useGetOrderStatus from '../../hooks/useGetOrderStatus'
import EmptyStateComponent from '../../components/EmptyStateComponent'

const StatusPage = () => {
  const { orderId } = useParams()
  const {data, error, isLoading} = useGetOrderStatus(orderId)

  if(isLoading) return <EmptyStateComponent index={'3'}/>
  
  return (
    <Modal 
    styles={(theme) => ({modal: {padding:'0px !important'}})} 
    fullScreen 
    opened 
    withCloseButton={false}>
        <Waves id={data?.data?._id} paymentStatus={data?.data?.paymentStatus}/>
        <Paper style={{padding:'10px'}}>
            <OrderDetails data={data?.data}/>
        </Paper>
    </Modal>
  )
}

export default StatusPage
