import { Space } from '@mantine/core'
import React,{useState} from 'react'
import CardContainer from './components/CardContainer'
import FoodCard from './components/FoodCard'
import SearchInput from './components/SearchInput'
import UserBox from './components/UserBox'

import LoaderScreen from '../../components/LoaderScreen'
import EmptyStateComponent from '../../components/EmptyStateComponent'
import useGetDishes from '../../hooks/useGetDishes'



const DataDisplay = ({data}) => {
  const content = data.data.length ? data.data.map(item => <FoodCard key={item._id} data={item}/>) : <EmptyStateComponent index={'0'}/>
  return content
}

const Home = () => {
  const [searchQuery,setSearchQuery] = useState('all')
  const {data,error,isLoading} = useGetDishes(searchQuery)
  return (
    <>
    <UserBox/>
    <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
    <CardContainer>
      {isLoading ? <LoaderScreen/> : !error && <DataDisplay data={data}/>}
      {error && <EmptyStateComponent title={`${error.code}: ${error.name}`} body={error.message} index={'1'}/>}
    </CardContainer>
    </>
  )
}

export default Home
