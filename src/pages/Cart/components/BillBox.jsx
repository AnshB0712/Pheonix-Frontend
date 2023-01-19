import { Group, Text } from '@mantine/core'
import React from 'react'

const BillBox = ({totalValue,items,takeOutCharges}) => {
  return (
    <>
    <Group spacing={0} style={{width:'100%',borderTop:'1px dashed grey',borderBottom:'1px dashed grey'}}>
        <Group position='apart' style={{width:'100%',padding:"10px 0",}}>
            {items?.map((obj,i) => (
              <Group key={i} style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',width:'100%',placeItems:'center' }}>
                 <Text fz={12} color={'dimmed'} fw={600} transform={'capitalize'} ml={'auto'}>{`${obj.itemName}(${obj.qty}X)`}</Text>
                 <Text fz={13} color={'dimmed'} fw={600}>{`₹${obj.perPrice}`}</Text>
                 <Text fz={13} color={'dimmed'} fw={600} ml={'auto'}>{`₹${obj.perPrice*obj.qty}`}</Text>
                </Group>
            ))}
           {
              takeOutCharges && (
              <Group style={{ display:'grid',gridTemplateColumns:'1fr 1fr',width:'100%',alignItems:'center',justifyContent:'space-between'}}>
                <Text fz={12} color={'red'} fw={600} transform={'capitalize'}>Take-Out Charges</Text>
                <Text fz={13} color={'dimmed'} fw={600} ml={'auto'}>{`₹${takeOutCharges}`}</Text>
               </Group>
              )
            }
        </Group>
        <Group position='apart' style={{width:'100%',padding:'5px 0',borderTop:'1px dashed grey'}}>
            <Text fz={16} fw={600}>Total</Text>
            <Text fz={16} fw={600}>{`₹${totalValue+takeOutCharges}`}</Text>
        </Group>
    </Group>
    </>

  )
}

export default BillBox
