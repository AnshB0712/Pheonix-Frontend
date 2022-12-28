import { Button, Chip, Group, Stack, Text } from '@mantine/core'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { CART_CONTEXT_ACTIONS } from '../../constants'
import customAxios from '../../api/axios'

const PastOrderCard = ({data}) => {

  const { dispatch } = useCart()
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
      navigate('/cart')
    } catch (error) {
      console.log(error)
      setError(err)
    } finally{
      setLoading(false)
    }
  }

  return (
    <Stack spacing={5} justify="space-between" style={{borderRadius:'5px',border:'1px solid #dbdbd8',padding:'8px 4px'}}>
      <Group position='apart'  style={{borderBottom: '1px dashed grey',paddingBottom:'5px'}}>
      <Text fz={13} fs={'italic'}>Created At: {new Date(data.createdAt).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"})}</Text>
      <Chip size="xs" radius="sm" color={'red'}>{data?.orderType === 7 ? 'Dine In':'Take Out'}</Chip>
      </Group>
      <Stack spacing={1.5}>
        {data?.items?.map(obj => {
            return(
                <Group position='apart' key={obj?.itemId} style={{border:"1px solid #dbdbd8",borderRadius:'4px',padding:'4px 8px'}}>
                    <Text fz={12} c='dimmed'>{obj?.itemName}</Text>
                    <Text fz={12} c='dimmed'>₹{obj?.perPrice*obj?.qty}</Text>
                    <Text fz={12} c='dimmed'>QTY: {obj?.qty}</Text>
                </Group>
            )
        })}
      </Stack>
      <Group position='apart'>
        <Text fw={500} fz={13}>Amount:  ₹{data?.amount}</Text>
        <Button  style={{textDecoration:'underline'}} variant='subtle' size="xs" component={Link} to={`/order/${data?._id}`}>
            Details
        </Button>
        <Button loading={loading} onClick={onClickRepeatOrder} color="orange" radius="xl" size="xs">
            Repeat
        </Button>
      </Group>
    </Stack>
  )
}

export default PastOrderCard
