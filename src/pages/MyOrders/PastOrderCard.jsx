import { Button, Group, Stack, Table, Text } from '@mantine/core'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { CART_CONTEXT_ACTIONS, ORDER_STATUS_COLOR, ORDER_STATUS_FF } from '../../constants'
import customAxios from '../../api/axios'

const PastOrderCard = (data) => {
  const { dispatch,setOrderType } = useCart()
  const navigate = useNavigate()

  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  const onClickRepeatOrder = async () => {
    setLoading(true)
    try {
      const {data:{data:orderItems}} = await customAxios.get('/get-dish-from-id',{params:{
        items: data.items.map(obj => obj.itemId)
      }})
      const createCart = (orderItems,prevOrderItems) => {
        const cart = orderItems.map(order => {
          const {qty} = prevOrderItems.find(obj => obj.itemId === order._id)
          return ({...order,qty})
        })
        return cart
      }
      dispatch({type:CART_CONTEXT_ACTIONS.SET_CART, payload: createCart(orderItems,data.items)})
      setOrderType(data.orderType)
      navigate('/cart')
    } catch (error) {
      console.log(error)
      setError(error)
    } finally{
      setLoading(false)
    }
  }

  return (
    <Stack spacing={5} mb={10} justify="space-between" style={{borderRadius:'5px',padding:'16px 8px',background:'#fff'}}>
      <Group position='apart' style={{paddingBottom:'5px'}}>
      <Text fz={13} fw={500} color='dimmed'>{new Date(data.createdAt).toLocaleString("en-US", {timeZone: "Asia/Kolkata",
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
})}</Text>
      <Button variant='light' radius={'md'} size='xs' color={ORDER_STATUS_COLOR[data.orderStatus]}>{ORDER_STATUS_FF[data.orderStatus]}</Button>
      </Group>
      <Stack spacing={0}>
        <Table striped verticalSpacing={'xs'} >
          <thead>
            <tr>
              <th>Item</th>
              <th>QTY</th>
              <th>PerPrice</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {
              data.items.map((item,i) => (
                <tr key={i}>
                  <td>{item?.itemName}</td>
                  <td>{item?.qty}</td>
                  <td>{item?.perPrice} INR</td>
                  <td>{item?.qty*item?.perPrice} INR</td>
                </tr>
              ))
            }
          </tbody>
      </Table>

      </Stack>
      <Group position='apart'>
        <Text color='dimmed' fw={500} fz={13}>Total: {data?.amount} INR</Text>
        <Button  style={{textDecoration:'underline'}} variant='subtle' size="xs" component={Link} to={`/order/${data?._id}`}>
            Details
        </Button>
      </Group>
    </Stack>
  )
}

export default PastOrderCard
