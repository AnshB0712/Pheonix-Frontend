import { Center, Group, Loader, LoadingOverlay, Text, Title } from '@mantine/core'
import React from 'react'
import { ReactComponent as Puzzle } from "../assets/Puzzle.svg";
import { ReactComponent as ErrorServer } from "../assets/ErrorServer.svg";
import { ReactComponent as Astronaut } from "../assets/Astronaut.svg";
import { ReactComponent as ErrorRocket } from "../assets/ErrorRocket.svg";

const LookUpObject = {
    0: {
        component: <Puzzle style={{width:'70%'}}/>,
        title: 'No Data To Show',
        body: 'Sorry, for the emptiness in your life because of us.'
    },
    1: {
        component: <ErrorServer style={{width:'70%'}}/>,
        title: 'Encountered an Error',
        body: "OOP's, please try again later!"
    },
    2: {
        component: <Astronaut style={{width:'70%'}}/>,
        title: 'Empty Cart',
        body: "Add some items to the cart and then come back here."
    },
    3: {
        component: (<LoadingOverlay visible/>),
    },
    4: {
        component: <ErrorRocket style={{width:'70%'}}/>,
        title: 'Protected Route',
        body: "Sign Up to get access of this page."
    },
}

const EmptyStateComponent = ({index,title,body}) => {
    const {component,title:lookupTitle,body:lookupBody} = LookUpObject[index]
  return (
    <Group position='center' spacing={'xs'}>
      {component}
      <Title order={5}>{title || lookupTitle || ''}</Title>
      <Text fw={400} fz={'md'} color={'dimmed'} ta={'center'}>{body || lookupBody || ''}</Text>
    </Group>
  )
}

export default EmptyStateComponent
