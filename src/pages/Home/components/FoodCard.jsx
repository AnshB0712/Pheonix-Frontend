import { ActionIcon, Badge, Button, Group, Image, Text, Title } from '@mantine/core'
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

const FoodCard = (data) => {
  const { cartState,dispatch } = useCart()

  const addItemToCart = () => dispatch({
    type: CART_CONTEXT_ACTIONS.ADD_TO_CART,
    payload: {
      ...data,
      qty: 1
    }
  })

  const isItemInACart = cartState?.find(item => item.name === data.name)

  return (
    <div 
    style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        alignItems:'center',
        padding: "5px",
        background: '#fff',
        borderRadius: "5px",
        overflow: "hidden",
        filter: `grayscale(${data.inStock ? '0%':'80%'})`,
        pointerEvents: data.inStock ? 'auto':'none'
    }}>
    <Image fit='contain'  radius={'md'} src={data?.imageURL} alt={data?.name}/>
    <div 
    style={{
        display: "flex",
        flexDirection:"column",
        gap:'5px',
        alignItems:"flex-start",
        padding:"5px 10px",
        position: 'relaive'
    }}>
      <Group style={{width:'100%',justifyContent:'space-between'}}>
          <Text transform={'capitalize'} fw={500}>{data?.name}</Text>
          <Button
          variant='outline'
          color='gray'
          size='xs'
          radius={'lg'}
          compact
          style={{marginTop:"auto"}}
          ><Text transform='capitalize'>{data?.category}</Text></Button>
      </Group>
        <Text style={{marginTop:"auto"}} color='dimmed' fw={500} fz="md">{`₹${data?.perPrice}`}</Text>
        {!isItemInACart && <Button style={{marginTop:"auto",width:"100%"}} color='dark' onClick={() => addItemToCart(data.name)}>Add</Button>}
        { isItemInACart && <CounterButtons name={data.name}/>}
    </div>
    </div>
  )
}

export default FoodCard
