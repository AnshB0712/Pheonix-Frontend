import { Group, Text } from '@mantine/core'
import { IconReceipt } from '@tabler/icons'
import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useCart } from '../../../context/CartContext'

const ViewCartBottomBar = () => {
    const navigate = useNavigate()
    const { totalValue } = useCart()

    if(!totalValue) return null

  return (
    <Group onClick={() => navigate('/cart')} sx={{
        position: 'fixed',
        bottom:'10px',
        left:'2.5%',
        width: '95%',
        padding: "10px 8px",
        borderRadius: '8px'
    }} position='apart' bg={'#25D366'}>
        <Group position='apart' spacing={'xs'}>
            <Text color={'#fff'} fw={600} fz={16}>View Cart</Text>
            <IconReceipt color='#fff'/>
        </Group>
        <Text color={'#fff'} fw={600} fz={16}>{`₹${totalValue}`}</Text>
    </Group>
  )
}

export default ViewCartBottomBar
