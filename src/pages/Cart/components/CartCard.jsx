import { ActionIcon, Badge, Group, Image, Text, Title } from '@mantine/core'
import { IconSquareMinus, IconSquarePlus } from '@tabler/icons'
import React from 'react'
import { CART_CONTEXT_ACTIONS } from '../../../constants'
import { useCart } from '../../../context/CartContext'

const CounterButtons = ({name}) => {
  const { cartState,dispatch } = useCart()
  const isItemInACart = cartState?.find(item => item.name === name)
  return (
    <Group position='apart' sx={theme => ({
      width:"100%",
    })}>
      <ActionIcon onClick={() => dispatch({type:CART_CONTEXT_ACTIONS.MANIPULATE_QTY,payload:{sign:'-',itemName:name}})} size={'lg'}>
        <IconSquareMinus size={26}/>
      </ActionIcon>
      <Text fw={500}>{isItemInACart?.qty}</Text>
      <ActionIcon onClick={() => dispatch({type:CART_CONTEXT_ACTIONS.MANIPULATE_QTY,payload:{sign:'+',itemName:name}})} size={'lg'}>
        <IconSquarePlus size={26}/>
      </ActionIcon>
    </Group>
  )
}

const CartCard = ({data}) => {
  return (
    <div 
    style={{
        display: 'grid',
        gridTemplateColumns: '120px 200px',
        padding: "10px",
        border: "1px solid #CED4DA",
        borderRadius: "5px",
        overflow: "hidden"
    }}>
    <Image fit='cover' src={data?.imageURL} alt={data?.name}/>
    <div 
    style={{
        display: "flex",
        flexDirection:"column",
        alignItems:"flex-start",
        padding:"5px 10px",
    }}>
        <Title order={5}>{data?.name}</Title>
        <Badge
        variant='outline'
        size='sm'
        radius={'sm'}
        style={{marginTop:"auto"}}
        >{data?.category}</Badge>
        <Text style={{marginTop:"auto"}} color='dimmed' fw={500} fz="md">{`₹${data?.perPrice}`}</Text>
        <CounterButtons name={data.name}/>
    </div>
    </div>
  )
}

export default CartCard
