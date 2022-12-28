import { Group, Text, Title } from '@mantine/core';
import React from 'react'
import CardContainer from '../../components/CardContainer';
import EmptyStateComponent from '../../components/EmptyStateComponent';
import useGetAllPastOrders from '../../hooks/useGetAllPastOrders'
import PastOrderCard from './PastOrderCard';

const MyOrders = () => {
  const { data,error,isLoading } = useGetAllPastOrders()

  return (
    <>
     <Group position='apart'>
        <Title order={4}>My Orders</Title>
        <Text fs={'italic'}>{`Total Orders: ${data?.data?.length || 0}`}</Text>
      </Group>
      <CardContainer>
        {isLoading && <EmptyStateComponent index='3'/>}
        {error &&  <EmptyStateComponent title={`${error.code}: ${error.name}`} body={error.message} index={'1'}/>}
        {data?.data?.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))?.map(obj => <PastOrderCard data={obj}/>)}
      </CardContainer>
    </>
  )
}

export default MyOrders
