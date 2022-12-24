import React from 'react'
import {Group, Navbar as MantineNavbar, Switch, Text, ThemeIcon, UnstyledButton} from "@mantine/core"
import {IconChevronRight, IconMoonStars } from '@tabler/icons';
import { NavLink } from 'react-router-dom';
import { NAVLINK_DATA } from '../constants';

const MainLink = ({ icon, color, label , to, setOpen,colorScheme,toggleColorScheme}) => {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'flex',
        alignItems:"center",
        justifyContent: 'space-between',
        width: '100%',
        padding: theme.spacing.sm,
        border: `1px solid ${theme.colors.gray[4]}`,
        borderRadius: 10,
        marginBottom: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
      component={to ? NavLink:UnstyledButton}
      to={to}
      onClick={() => to ? setOpen(false):undefined}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="md">{label}</Text>
      </Group>

      {to ? <IconChevronRight color='#A6A7AB'/>:<Switch checked={colorScheme==="dark"} onChange={() => toggleColorScheme()} style={{display:"grid"}}/>}
    </UnstyledButton>
  );
}

const Links = ({setOpen}) => {
  const links = NAVLINK_DATA.map((link) => <MainLink setOpen={setOpen} {...link} key={link.label} />);
  return <div>{links}</div>;
}

const Navbar = ({open,setOpen,colorScheme,toggleColorScheme}) => {
  return (
    <MantineNavbar width={{ sm: 200, lg: 300 }} hidden={!open} height={500} p="xs">
      <Links setOpen={setOpen}/>
      {/* DARK MODE SWITCH */}
      <MainLink icon={<IconMoonStars size={18}/>} label="Dark Mode" color='yellow' colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}/>
    </MantineNavbar>
  )
}

export default Navbar
