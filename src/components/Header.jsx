import React from 'react'
import {ActionIcon, Avatar, Burger, Button, Header as MantineHeader, MediaQuery, Title} from "@mantine/core"
import { IconSun, IconMoonStars } from '@tabler/icons';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import getInitialsFromString from '../utils/getInitialsFromString';

const Header = ({setOpen,open}) => {
  const {user} = useAuth()

  return (
    <MantineHeader height={60} p="xs" sx={theme => ({background: '#151a24',border: 'none'})}>
        <div style={{display:"flex",alignItems:"center" ,justifyContent:"space-between",height:"100%"}}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                color='white'
                opened={open}
                onClick={() => setOpen((o) => !o)}
                size="md"
                />
            </MediaQuery>
            {user?.user?.token 
                      ? <Avatar color="dark" radius="xl">{getInitialsFromString(user.user?.name) || "GU"}</Avatar>
                      : <Button size="xs" component={Link} to='/auth'>Sign Up</Button>
            }
        </div>
    </MantineHeader>
  )
}

export default Header
