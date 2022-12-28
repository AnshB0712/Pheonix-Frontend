import { Badge, Group, List, Stack, Text } from '@mantine/core'
import React from 'react'

const OrderDetails = ({data}) => {
  return (
    <Group sx={theme => ({
        border: `1px solid ${theme.colors.gray[4]}`,
        borderRadius: '8px',
        padding: theme.spacing.md
    })}>
        <Text ta={'left'} fw={500}>Order Details's</Text>
        <Stack>
          {Object.entries(data).map(([key,value]) => {
            if(key === '_id' || key === 'orderBy' || key === 'updatedAt' || key === '__v') return

            if(key === 'orderType'){
              return (
                <Group>
                <Text>{`${key}:`}</Text>
                <Text fw={500}>
                  {(value === '7' ? "Dine In":"Take Out")}
                </Text>
              </Group>
              )
            }

            if(key === 'createdAt'){
              return (
                <Group>
                <Text>{`${key}:`}</Text>
                <Text fw={500}>
                  {new Date(value).toLocaleString("en-IN", {timeZone: "Asia/Kolkata"})}
                </Text>
              </Group>
              )
            }

            if(key === 'amount'){
              return (
                <Group>
                <Text>{`${key}:`}</Text>
                <Text fw={500}>
                  {`${value} INR`}
                </Text>
              </Group>
              )
            }

            if(key === 'orderStatus' || key === 'PaymentStatus'){
              return (
                <Group>
                <Text>{`${key}:`}</Text>
                <Badge variant='filled' bg={value==='PNDG' ? 'yellow':'green'}>{value==='PNDG' ? 'Pending':'Success'}</Badge>
              </Group>
              )
            }

            if(key === 'items'){
              return (
              <Group>
              <Text>{`${key}:`}</Text>
              <List>
                <List.Item>
                  {
                  value.map(obj => Object.entries(obj).map(([key,value]) => {
                  if(key==='_id' || key==='perPrice' || key==='itemId') return
                  return(
                  <Group>
                  <Text>{`${key}:`}</Text>
                  <Text fw={500}>
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
            <Group>
              <Text>{`${key}:`}</Text>
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
