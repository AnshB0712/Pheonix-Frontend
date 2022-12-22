import { Space } from '@mantine/core'
import React from 'react'
import CardContainer from './components/CardContainer'
import FoodCard from './components/FoodCard'
import SearchInput from './components/SearchInput'
import UserBox from './components/UserBox'

const Home = () => {
  return (
    <>
    <UserBox/>
    <Space h="md"/>
    <SearchInput/>
    <Space h="md"/>
    <CardContainer>
      <FoodCard/>
    </CardContainer>
    </>
  )
}

export default Home
