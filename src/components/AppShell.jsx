import React, { useState } from 'react'
import {AppShell as MantineAppShell} from "@mantine/core"
import Navbar from './Navbar'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import MyOrders from '../pages/MyOrders'
import Cart from '../pages/Cart'

const AppShell = ({colorScheme,toggleColorScheme}) => {
    const [open,setOpen] = useState(false)
  return (
    <MantineAppShell
      padding="sm"
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar open={open} setOpen={setOpen} colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}/>}
      header={<Header open={open} setOpen={setOpen} colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}/>}
      >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
      </Routes>
    </MantineAppShell>
  )
}

export default AppShell
