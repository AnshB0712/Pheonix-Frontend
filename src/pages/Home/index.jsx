import React,{useState} from 'react'
import CardContainer from '../../components/CardContainer'
import FoodCard from './components/FoodCard'
import SearchInput from './components/SearchInput'
import UserBox from './components/UserBox'
import EmptyStateComponent from '../../components/EmptyStateComponent'
import useGetDishes from '../../hooks/useGetDishes'
import ViewCartBottomBar from './components/ViewCartBottomBar'
import DisplayData from '../../components/DisplayData'
import LoaderScreen from '../../components/LoaderScreen'


const Home = () => {
  const [searchQuery,setSearchQuery] = useState('all')
  const {data,error,isLoading} = useGetDishes(searchQuery)

  return (
    <>
      <UserBox/>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
        <CardContainer>
          { isLoading && <LoaderScreen/> }
          { error && <EmptyStateComponent title={`${error.code}: ${error.name}`} body={JSON.stringify(error.response.data)} index={'1'}/> }
          {data?.data &&  <DisplayData data={data.data} Component={FoodCard}/> }
        </CardContainer>
      <ViewCartBottomBar/>
    </>
  )
}

export default Home
