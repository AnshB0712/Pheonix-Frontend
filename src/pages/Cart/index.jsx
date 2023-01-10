import { Button, Center, Text, Group, NativeSelect, Switch, Title } from '@mantine/core'
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
  const {cartState,totalValue,orderItems,setOrderType} = useCart()
 
  const isCartEmpty = () => Boolean(cartState.length)

  return (
    <>
      <Group position='apart'>
        <Title order={5}>Order Summary</Title>
        <Group position='apart' align={'center'} spacing={5}>
          <Text fz={14} fw={500} style={{paddingTop:"1.5px"}}>Take Out</Text>
            <Switch defaultChecked={true} onChange={e => setOrderType(e.target.checked ? '7':'13')} style={{display:"grid"}}/>
          <Text fz={14} fw={500} style={{paddingTop:"1.5px"}}>Dine In</Text>
        </Group>
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
