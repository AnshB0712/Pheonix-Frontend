import { Group, Text } from '@mantine/core'
import { IconReceipt } from '@tabler/icons'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useCart } from '../../../context/CartContext'

const ViewCartBottomBar = () => {
    const navigate = useNavigate()
    const { totalValue,takeOutCharges } = useCart()

    if(!totalValue) return null

  return (
    <Group onClick={() => navigate('/cart')} sx={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        width: '100%',
        padding: "10px 8px",
        borderRadius: '5px 5px 0 0'
    }} position='apart' bg={'#25D366'}>
        <Group position='apart' spacing={'xs'}>
            <Text color={'#fff'} fw={600} fz={16}>View Cart</Text>
            <IconReceipt color='#fff'/>
        </Group>
        <Text color={'#fff'} fw={600} fz={16}>{`₹${totalValue + takeOutCharges}`}</Text>
    </Group>
  )
}

export default ViewCartBottomBar
