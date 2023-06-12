import { Badge, Button, Group, List, Popover, Portal, Stack, Table, Text } from '@mantine/core'
import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { ORDER_STATUS_COLOR, ORDER_STATUS_FF } from '../../../constants'

const ORDER_STATUS_KEYS_LOOKUP = {
  'orderByName':'Name',
  'orderByMobile':'Mobile',
  'orderType': 'OrderType',
  'orderStatus':'OrderStatus',
  'amount':'Amount',
  'takeOutCharges':'TakeOut-Charge',
  'items': 'Order',
  'paymentStatus': 'PaymentStatus',
  'createdAt': 'Date/Time',
  'orderFailReason': 'OrderFail Due To'

}

function OrderItemsPopOver({ orderItems }) {
  const [opened, { close, open }] = useDisclosure(false);
  return (
    <Popover width={200} position="right" withArrow shadow="md" opened={opened}>
      <Popover.Target>
        <Button
          onMouseEnter={open}
          onMouseLeave={close}
          size="xs"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            // eslint-disable-next-line no-unused-expressions
            opened ? close() : open();
          }}
        >
          Items
        </Button>
      </Popover.Target>
      <Portal>
        <Popover.Dropdown sx={{ pointerEvents: 'none' }}>
          <Table striped withColumnBorders>
            <thead>
              <tr>
                <th>
                  <Text ta="center" fz={10} fw={500}>ItemName</Text>
                </th>
                <th>
                  <Text ta="center" fz={10} fw={500}>QTY</Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((obj) => (
                <tr key={obj._id}>
                  <td>
                    <Text ta="center" transform="capitalize" fz={10} fw={700}>{obj.itemName}</Text>
                  </td>
                  <td>
                    <Text ta="center" fz={10} fw={700}>{`${obj.qty}x`}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Popover.Dropdown>
      </Portal>
    </Popover>
  );
}

const OrderDetails = ({data}) => {
  return (
    <Stack mt={8} style={{background:'#FFF'}} sx={theme => ({
        borderRadius: '1rem',
        padding: theme.spacing.md
    })}>
        <Text fw={500} style={{width:'100%'}} size={'xl'} mb={10}>Order Details</Text>
        <Stack>
          {Object.entries(data).map(([key,value],i) => {
            if(key === '_id' || key === 'orderBy' || key === 'updatedAt' || key === '__v') return
            if(key === 'orderFailReason' && !value) return

            if(key === 'orderType'){
              return (
                <Group key={i}  style={{justifyContent:'space-between'}}>
               <Text color='dimmed' fw={500}>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
               <Text fw={500}  sx={(theme) => ({ color: theme.colors.dark[5]})}>
                  {(value == '7' ? "Dine In":"Take Out")}
                </Text>
              </Group>
              )
            }

            if(key === 'createdAt'){
              return (
                <Group key={i}  style={{justifyContent:'space-between'}}>
                <Text color='dimmed' fw={500}>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
                  <Text fw={500}  sx={(theme) => ({ color: theme.colors.dark[5]})} color='dimmed'>{new Date(data.createdAt).toLocaleString("en-US", {timeZone: "Asia/Kolkata",
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
              })}</Text>
              </Group>
              )
            }

            if(key === 'amount' || key === 'takeOutCharges'){
              return (
                <Group key={i}  style={{justifyContent:'space-between'}}>
                <Text color='dimmed' fw={500}>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
                <Text fw={500}  sx={(theme) => ({ color: theme.colors.dark[5]})}>
                  {`${value} INR`}
                </Text>
              </Group>
              )
            }

            if(key === 'orderStatus' || key === 'paymentStatus'){
              return (
                <Group key={i}  style={{justifyContent:'space-between'}}>
                <Text color='dimmed' fw={500}>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
                <Button variant='light' radius={'md'} size='xs' color={ORDER_STATUS_COLOR[value]}>{ORDER_STATUS_FF[value]}</Button>
              </Group>
              )
            }

            if(key === 'items'){
              return (
              <Group key={i} style={{justifyContent:'space-between'}}>
              <Text color='dimmed' fw={500}>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
              <OrderItemsPopOver orderItems={value}/>
              </Group>
              )
            }

            return (
            <Group key={i} style={{justifyContent:'space-between'}} >
              <Text color='dimmed' fw={500}>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
              <Text fw={500}  sx={(theme) => ({ color: theme.colors.dark[5]})}>
                {''+value}
              </Text>
            </Group>
          )})}
        </Stack>
    </Stack>
  )
}

export default OrderDetails
