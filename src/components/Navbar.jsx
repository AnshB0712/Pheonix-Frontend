import React from 'react'
import {Group, Navbar as MantineNavbar, Switch, Text, ThemeIcon, UnstyledButton} from "@mantine/core"
import {IconChevronRight, IconMoonStars, IconPower } from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import { NAVLINK_DATA } from '../constants';
import Logout from './Logout';
import { useAuth } from '../context/AuthContext';

const MainLink = ({ icon, label , to, setOpen,colorScheme,toggleColorScheme}) => {
  return (
    <UnstyledButton
    component={NavLink}
    sx={(theme) => ({
      display: 'flex',
      alignItems:"center",
      justifyContent: 'space-between',
      width: '100%',
      padding: theme.spacing.md,
      borderRadius: 20,
      marginBottom: theme.spacing.md,
      textDecoration: 'none',
    })}
      style={({ isActive }) => {
        return {
          background: isActive ? "#2d2f3a" : "none",
          color: "#aaadb3",
        }
      }}
      to={to}
      onClick={() => to ? setOpen(false):undefined}
    >
      <Group>
          {icon}
        <Text size="md" >{label}</Text>
      </Group>

    </UnstyledButton>
  );
}

const Links = ({setOpen}) => {
  const links = NAVLINK_DATA.map((link) => <MainLink setOpen={setOpen} {...link} key={link.label} />);
  return <div>{links}</div>;
}

const Navbar = ({open,setOpen,colorScheme,toggleColorScheme}) => {
  const { user } = useAuth()
  return (
    <MantineNavbar width={{ sm: 200, lg: 300 }} hidden={!open} sx={{background: '#151a24',border:'none'}} height={'100%'} p="xs">
      <Links setOpen={setOpen}/>
      { user.user?.token && <Logout icon={<IconPower size={18} />} label="Logout" color='red' to='/' setOpen={setOpen}/>}
    </MantineNavbar>
  )
}

export default Navbar
