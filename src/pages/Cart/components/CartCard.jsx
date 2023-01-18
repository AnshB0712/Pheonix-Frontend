import { ActionIcon, Badge, Group, Image, Text, Title } from '@mantine/core'
import { IconSquareMinus, IconSquarePlus } from '@tabler/icons'
import React from 'react'
import { CART_CONTEXT_ACTIONS } from '../../../constants'
import { useCart } from '../../../context/CartContext'

const CounterButtons = ({name,isItemInACart,dispatch}) => {
  return (
    <>
    <div style={{
      width:"100%",
      display:'flex',
      flexDirection: 'column',
      alignItems:'center'
    }}>
      <ActionIcon onClick={() => dispatch({type:CART_CONTEXT_ACTIONS.MANIPULATE_QTY,payload:{sign:'-',itemName:name}})} size={'lg'}>
        <IconSquareMinus size={26}/>
      </ActionIcon>
      <Text fw={500}>{isItemInACart?.qty}</Text>
      <ActionIcon onClick={() => dispatch({type:CART_CONTEXT_ACTIONS.MANIPULATE_QTY,payload:{sign:'+',itemName:name}})} size={'lg'}>
        <IconSquarePlus size={26}/>
      </ActionIcon>
    </div>
    </>
  )
}

const CartCard = (data) => {
  const { cartState,dispatch } = useCart()
  const isItemInACart = cartState?.find(item => item.name === data.name)
  return (
    <div 
    style={{
        display: 'grid',
        gridTemplateColumns: '120px 150px 50px',
        alignItems:'center',
        padding: "5px",
        marginBottom: '5px',
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
        <Title order={5} transform={'capitalize'}>{data?.name}</Title>
        <Text style={{marginTop:"auto"}} color='dimmed' fw={500} fz="md">{`₹${data?.perPrice}`}</Text>
        <Group position='apart' sx={{width:'100%'}}>
          <Text size={12} fw={500} fs={'italic'} color={'dimmed'}>Item Total</Text>
          <Text size={12} fw={500} fs={'italic'} > {`₹${isItemInACart.qty*isItemInACart.perPrice}`}</Text>
        </Group>
    </div>
        <CounterButtons name={data.name} isItemInACart={isItemInACart} dispatch={dispatch}/>
    </div>
  )
}

export default CartCard
