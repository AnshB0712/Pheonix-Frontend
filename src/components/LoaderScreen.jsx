import { Center, Container, Loader } from '@mantine/core'
import React from 'react'

const LoaderScreen = () => {
  return (
    <Center style={{width:"100%",minHeight:"300px"}}>
      <Loader size={'sm'}/>
    </Center>
  )
}

export default LoaderScreen
