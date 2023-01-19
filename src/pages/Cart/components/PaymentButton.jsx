import { Button, Group, Tooltip } from '@mantine/core'
import { IconShieldLock } from '@tabler/icons'
import React from 'react'
import { useCart } from '../../../context/CartContext'
import { useAuth } from '../../../context/AuthContext'
import useCreateOrder from '../../../hooks/useCreateOrder'

const PaymentButton = () => {
    const {totalValue,orderItems,orderType,takeOutCharges} = useCart()
    const {user} = useAuth()
    const {trigger,isLoading,error} = useCreateOrder()

    const handlePayment = () => {
      const order = {
        orderByName: user.name,
        orderByMobile: user.mobile,
        orderBy: user.id,
        orderType: orderType,
        amount: totalValue+takeOutCharges,
        takeOutCharges,
        items: orderItems
      }
      trigger(order)
    }

  return (
    <Group gutter={0} style={{position:'fixed',bottom:'0',left:'0',width:'100%'}}>
        <Tooltip withArrow={true} arrowPosition='center' label={error?.message || "Sign up to continue with the payment."} offset={5} opened={!user || error?.message}>
            <Button radius={0} loading={isLoading} onClick={handlePayment} disabled={!user} size={'lg'} fullWidth leftIcon={<IconShieldLock/>}>
                {`Pay ₹${totalValue+takeOutCharges}`}
            </Button>
        </Tooltip>
    </Group>
  )
}

export default PaymentButton
