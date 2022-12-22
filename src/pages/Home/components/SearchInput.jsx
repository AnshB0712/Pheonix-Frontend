import React from 'react'
import {IconSearch} from '@tabler/icons'
import {Center, Chip, TextInput,Text} from "@mantine/core"

const data = [
    {label:"Punjabi",value:"punjabi"},
    {label:"Thali",value:"thali"},
    {label:"Comfort Food",value:"comfort food"},
    {label:"Chinese",value:"chinese"},
]

const SearchInput = () => {
  return (
    <div>
    <Center sx={theme => ({
        padding: theme.spacing.md,
     })}>
      <TextInput
        placeholder="Search via dish name."
        size='md'
        icon={<IconSearch size={18} />}
        
      />
    </Center>
    <Text size="sm" style={{padding:"0 5px",marginBottom:"2px"}}>Categories you can choose from: </Text>
    <Chip.Group position="center" style={{overflow:"scroll",display:"block",whiteSpace:"nowrap"}}>
        {data.map(obj => <Chip style={{display:"inline-block",margin:"0 8px"}} value={obj.value}>{obj.label}</Chip>)}
    </Chip.Group>
    </div>
  )
}

export default SearchInput
