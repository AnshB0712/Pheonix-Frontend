import { Button, Group, Tooltip } from '@mantine/core'
import { IconShieldLock } from '@tabler/icons'
import React from 'react'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'

const PaymentButton = () => {
    const {totalValue,orderItems,orderType} = useCart()
    const {user} = useAuth()

    const handlePayment = () => {
      const order = {
        orderByName: user.name,
        orderByMobile: user.mobile,
        orderBy: user.id,
        orderType: orderType,
        amount: totalValue,
        items: orderItems
      }
      console.log(order)
    }

  return (
    <Group gutter={0} style={{position:'fixed',bottom:'0',left:'0',width:'100%',padding:'5px'}}>
        <Tooltip withArrow={true} arrowPosition='center' label="Sign up to continue with the payment." offset={5} opened={!user}>
            <Button onClick={handlePayment} disabled={!user} size={'lg'} fullWidth leftIcon={<IconShieldLock/>}>
                {`Pay ${totalValue}`}
            </Button>
        </Tooltip>
    </Group>
  )
}

export default PaymentButton
