import { Button, Center, Container, Group, NativeSelect, Title } from '@mantine/core'
import { IconTriangle } from '@tabler/icons'
import React from 'react'
import {Link} from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import BillBox from './components/BillBox'
import CartCard from './components/CartCard'
import EmptyStateComponent from '../../components/EmptyStateComponent'
import PaymentButton from './components/PaymentButton'
import { useState } from 'react'

const DataDisplay = ({data}) => {
  return (data.map(item => <CartCard key={item._id} data={item}/>))
}

const Cart = () => {
  const {cartState,totalValue,orderItems,setOrderType,orderType} = useCart()
 
  const isCartEmpty = () => Boolean(cartState.length)

  return (
    <>
      <Group position='apart'>
        <Title order={4}>Order Summary</Title>
        <NativeSelect
          size='sm'
          value={orderType}
          onChange={e => setOrderType(e.target.value)}
          icon={<IconTriangle size={18} color={"#25D366"}/>}
          data={[{value:'7',label:"Dine In"},{value:'13',label:"Take Away"}]}
        />
      </Group>
      <div style={{padding:"10px 0",maxHeight:'400px',overflow:'scroll'}}>
        {!isCartEmpty() ?  <EmptyStateComponent index={'2'}/> : <DataDisplay data={cartState}/>}
      </div>
        {isCartEmpty() &&  <BillBox totalValue={totalValue} items={orderItems}/>}
        {!isCartEmpty() && 
        <Center>
          <Button variant='subtle' style={{textDecoration:'underline'}} component={Link} to='/'>
            Back To Home
          </Button>
        </Center>}
        {isCartEmpty() && <PaymentButton/>}
    </>
  )
}

export default Cart
