import { Button, Center, Text, Group, NativeSelect, Switch, Title, SegmentedControl } from '@mantine/core'
import React from 'react'
import {Link} from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import BillBox from './components/BillBox'
import CartCard from './components/CartCard'
import EmptyStateComponent from '../../components/EmptyStateComponent'
import PaymentButton from './components/PaymentButton'
import DisplayData from '../../components/DisplayData'

const Cart = () => {
  const {cartState,totalValue,orderItems,orderType,setOrderType,takeOutCharges} = useCart()
 
  const isCartEmpty = () => Boolean(cartState.length)

  return (
    <section style={{paddingBottom:'55px'}}>
      <Group position='apart' style={{padding: "15px 0px"}}>
        <Title order={5}>Order Summary</Title>
        <SegmentedControl
        color='dark'
         onChange={val => setOrderType(val)}
         defaultValue={orderType}
          data={[
            { label: 'TakeOut', value: '13' },
            { label: 'DineIn', value: '7' }]} 
          />

      </Group>
      <div style={{padding:"10px 0",height:'400px',overflow:'scroll'}}>
        {!isCartEmpty() ?  <EmptyStateComponent index={'2'}/> : <DisplayData data={cartState} Component={CartCard}/>}
      </div>
        {isCartEmpty() &&  <BillBox totalValue={totalValue} items={orderItems} takeOutCharges={takeOutCharges}/>}
        {!isCartEmpty() && 
        <Center>
          <Button variant='subtle' style={{textDecoration:'underline'}} component={Link} to='/'>
            Back To Home
          </Button>
        </Center>}
        {isCartEmpty() && <PaymentButton/>}
    </section>
  )
}

export default Cart
