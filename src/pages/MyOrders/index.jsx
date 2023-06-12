import { ActionIcon, Button, Group, Pagination, Text, Title } from '@mantine/core';
import { IconArrowNarrowLeft,IconChevronLeft } from '@tabler/icons';
import React,{useState} from 'react'
import CardContainer from '../../components/CardContainer';
import DisplayData from '../../components/DisplayData';
import EmptyStateComponent from '../../components/EmptyStateComponent';
import useGetAllPastOrders from '../../hooks/useGetAllPastOrders'
import PastOrderCard from './PastOrderCard';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [page,setPage] = useState(1)
  const { data,error,isLoading } = useGetAllPastOrders(page)

  return (
    <>
     <Group position='apart' py={5}>
        <Button compact variant='subtle' color='gray' leftIcon={<IconChevronLeft size={'26px'}/>} component={Link} to='/'>
          Back
        </Button>
        <Text color='dimmed' fw={500}>{`Total Orders: ${data?.totalOrders || '-'}`}</Text>
      </Group>
      <CardContainer>
        { data?.data && <DisplayData Component={PastOrderCard} data={data.data}/>}
        { isLoading && <EmptyStateComponent index='3'/> }
        { error && <EmptyStateComponent title={`${error.code}: ${error.name}`} body={JSON.stringify(error.response.data)} index={'1'}/> }
      </CardContainer>
        { data && <Pagination color='dark' total={data.totalPages} onChange={index => setPage(index)} page={page} position='center'/>}    
        </>
  )
}

export default MyOrders
