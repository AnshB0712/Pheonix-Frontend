import { AspectRatio, Badge, Button, Group, Image, Text, Title } from '@mantine/core'
import React from 'react'

const FoodCard = () => {
  return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: '150px 200px',
        padding: "10px",
        border: "1px solid #CED4DA",
        borderRadius: "5px"
    }}>
    <AspectRatio ratio={1/1} style={{borderRadius:"8px"}}>
      <Image fit='cover' style={{borderRadius:"8px"}} src='https://nationaltoday.com/wp-content/uploads/2022/07/lkjhgfhjkl-1-min-12.jpg.webp'/>
    </AspectRatio>
    <div 
    style={{
        display: "flex",
        flexDirection:"column",
        alignItems:"flex-start",
        padding:"5px 10px",
    }}>
        <Title order={4}>Blale Lively</Title>
        <Badge
        variant='gradient'
        style={{marginTop:"auto"}}
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}>Actress</Badge>
        <Text style={{marginTop:"auto"}} color='dimmed' fw={500} fz="lg">₹1800</Text>
        <Button style={{marginTop:"auto",width:"100%"}}>Add To Cart</Button>
    </div>
    </div>
  )
}

export default FoodCard
