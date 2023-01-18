import { Group, Pagination, Text, Title } from '@mantine/core';
import React,{useState} from 'react'
import CardContainer from '../../components/CardContainer';
import DisplayData from '../../components/DisplayData';
import EmptyStateComponent from '../../components/EmptyStateComponent';
import useGetAllPastOrders from '../../hooks/useGetAllPastOrders'
import PastOrderCard from './PastOrderCard';

const MyOrders = () => {
  const [page,setPage] = useState(1)
  const { data,error,isLoading } = useGetAllPastOrders(page)

  return (
    <>
     <Group position='apart'>
        <Title order={4}>My Orders</Title>
        <Text fs={'italic'}>{`Total Orders: ${data?.totalOrders || '-'}`}</Text>
      </Group>
      <CardContainer>
        { isLoading && <EmptyStateComponent index='3'/> }
        { error && <EmptyStateComponent title={`${error.code}: ${error.name}`} body={error.message} index={'1'}/> }
        { data?.data && <DisplayData Component={PastOrderCard} data={data.data}/>}
      </CardContainer>
      <Pagination total={data.totalPages} onChange={index => setPage(index)} page={page} position='center'/>
    </>
  )
}

export default MyOrders
