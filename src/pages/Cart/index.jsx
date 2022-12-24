import { Container, Group, NativeSelect, Title } from '@mantine/core'
import { IconTriangle } from '@tabler/icons'
import React from 'react'
import { useCart } from '../../context/CartContext'
import CartCard from './components/CartCard'

const Cart = () => {
  const {cartState,dispatch} = useCart()
  return (
    <>
    <Group position='apart'>
    <Title order={4}>Order Summary</Title>
    <NativeSelect
    size='sm'
    icon={<IconTriangle size={18} color={"#25D366"}/>}
    data={[{value:'7',label:"Dine In"},{value:'13',label:"Take Away"}]}
    />
    </Group>
    <div style={{padding:"10px 0"}}>
        {cartState.map(item => <CartCard data={item}/>)}
    </div>
    </>
  )
}

export default Cart
