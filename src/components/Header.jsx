import React from 'react'
import {ActionIcon, Burger, Button, Header as MantineHeader, MediaQuery, Title} from "@mantine/core"
import { IconSun, IconMoonStars } from '@tabler/icons';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Header = ({setOpen,open,colorScheme,toggleColorScheme,setOpenAuthModal}) => {
  const {user} = useAuth()
  const RightSideComponent = () => user.user ? (
    <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  ):(
    <Button size="xs" component={Link} to='/auth'>
      Sign Up
    </Button>
  )

  return (
    <MantineHeader height={60} p="xs">
        <div style={{display:"flex",alignItems:"center" ,justifyContent:"space-between",height:"100%"}}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                opened={open}
                onClick={() => setOpen((o) => !o)}
                size="md"
                />
            </MediaQuery>
            <RightSideComponent/>
        </div>
    </MantineHeader>
  )
}

export default Header
