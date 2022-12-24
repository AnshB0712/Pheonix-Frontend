import React from 'react'
import {Center, Chip ,Text} from "@mantine/core"
import { DISHES_CATEGORY } from '../../../constants'

const SearchInput = ({setSearchQuery,searchQuery}) => {
  return (
    <div>
    <Center sx={theme => ({
        padding: theme.spacing.md,
     })}>
    </Center>
    <Text size="sm" style={{padding:"0 5px",marginBottom:"2px"}}>Categories you can choose from: </Text>
    <Chip.Group onChange={name => setSearchQuery(name)} position="center" style={{overflow:"scroll",display:"block",whiteSpace:"nowrap"}}>
        {DISHES_CATEGORY.map((obj,i) => <Chip key={i} checked={searchQuery === obj.value} style={{display:"inline-block",margin:"0 5px"}} value={obj.value}>{obj.label}</Chip>)}
    </Chip.Group>
    </div>
  )
}

export default SearchInput
