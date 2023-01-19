import { Badge, Group, List, Stack, Text } from '@mantine/core'
import React from 'react'

const ORDER_STATUS_KEYS_LOOKUP = {
  'orderByName':'Name',
  'orderByMobile':'Mobile',
  'orderType': 'OrderType',
  'orderStatus':'OrderStatus',
  'amount':'Amount',
  'takeOutCharges':'TakeOut-Charge',
  'items': 'Order',
  'paymentStatus': 'Payment',
  'createdAt': 'Date/Time',

}

const OrderDetails = ({data}) => {
  return (
    <Group sx={theme => ({
        border: `1px solid ${theme.colors.gray[4]}`,
        borderRadius: '8px',
        padding: theme.spacing.md
    })}>
        <Text ta={'center'} fw={600} style={{width:'100%'}} transform={'uppercase'}>Order Details</Text>
        <Stack>
          {Object.entries(data).map(([key,value],i) => {
            if(key === '_id' || key === 'orderBy' || key === 'updatedAt' || key === '__v') return

            if(key === 'orderType'){
              return (
                <Group key={i}>
                <Text>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
                <Text fw={500}>
                  {(value == '7' ? "Dine In":"Take Out")}
                </Text>
              </Group>
              )
            }

            if(key === 'createdAt'){
              return (
                <Group key={i}>
                <Text>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
                <Text fw={500}>
                  {new Date(value).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"})}
                </Text>
              </Group>
              )
            }

            if(key === 'amount'){
              return (
                <Group key={i}>
                <Text>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
                <Text fw={500}>
                  {`${value} INR`}
                </Text>
              </Group>
              )
            }

            if(key === 'orderStatus' || key === 'paymentStatus'){
              return (
                <Group key={i}>
                <Text>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
                <Badge variant='filled' bg={value==='PNDG' ? 'yellow': value==='FLD' ? 'red':'green'}>{value==='PNDG' ? 'Pending': value==='FLD' ? 'Failed':'Success'}</Badge>
              </Group>
              )
            }

            if(key === 'items'){
              return (
              <Group key={i}>
              <Text>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
              <List>
                <List.Item>
                  {
                  value.map(obj => Object.entries(obj).map(([key,value],i) => {
                  if(key==='_id' || key==='perPrice' || key==='itemId') return
                  return(
                  <Group key={i}>
                  <Text>{`${key}:`}</Text>
                  <Text fw={500} transform={'capitalize'}>
                    {value}
                  </Text>
                </Group>
                )}))}
                </List.Item>
              </List>
              </Group>
              )
            }

            return (
            <Group key={i}>
              <Text>{`${ORDER_STATUS_KEYS_LOOKUP[key]} :`}</Text>
              <Text fw={500}>
                { key === 'orderType' && (value === '7' ? "Dine In":"Take Out")}
                {''+value}
              </Text>
            </Group>
          )})}
        </Stack>
    </Group>
  )
}

export default OrderDetails
