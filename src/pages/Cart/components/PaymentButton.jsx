import { Button, Group, Tooltip } from '@mantine/core'
import { IconShieldLock } from '@tabler/icons'
import React from 'react'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'
import useCreateOrder from '../../../hooks/useCreateOrder'
import { useEffect,useState } from 'react'

const PaymentButton = () => {
    const {totalValue,orderItems,orderType,takeOutCharges} = useCart()
    const {user} = useAuth()
    const {trigger,isLoading,error} = useCreateOrder()

    const handlePayment = async () => {
        const order = {
          orderByName: user.name,
          orderType: orderType,
          amount: totalValue+takeOutCharges,
          takeOutCharges,
          items: orderItems
        }
        await trigger(order)
    }

    console.log(error);
 
  return (
    <Group gutter={0} style={{position:'fixed',bottom:'0',left:'0',width:'100%'}}>
        <Tooltip styles={(theme) => ({
          'tooltip':{
            whiteSpace: 'normal',
            textAlign: 'center',
            maxWidth: '340px'
          }
        })}  color={Boolean(error) && 'red'} withArrow={true} arrowPosition='center' label={error?.message || 'Please SignUp to continue with your order.'} offset={5} opened={!user || Boolean(error)}>
            <Button radius={0} loading={isLoading} onClick={handlePayment} disabled={!user} size={'lg'} fullWidth leftIcon={<IconShieldLock/>}>
                {`Pay ₹${totalValue+takeOutCharges}`}
            </Button>
        </Tooltip>
    </Group>
  )
}

export default PaymentButton
