import React, { useState } from 'react'
import {AppShell as MantineAppShell} from "@mantine/core"
import Navbar from './Navbar'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import MyOrders from '../pages/MyOrders'
import Cart from '../pages/Cart'
import AuthModal from './AuthModal'
import StatusPage from '../pages/Status'
import ProtectedRoute from './ProtectedRoute'
import PersistLogin from './PersistLogin'


const AppShell = ({colorScheme,toggleColorScheme}) => {
    const [open,setOpen] = useState(false)

  return (
    <MantineAppShell
      padding="sm"
      sx={{backgroundColor:'#f8f8f9'}}
      navbarOffsetBreakpoint="sm"
      navbar={<Navbar open={open} setOpen={setOpen} />}
      header={<Header open={open} setOpen={setOpen} />}
      >
      <Routes>
        <Route element={<PersistLogin/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<AuthModal />}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route element={<ProtectedRoute/>}>
            <Route path='/my-orders' element={<MyOrders/>}/>
            <Route path='/order/:orderId' element={<StatusPage/>}/>
          </Route>
        </Route>
      </Routes>
    </MantineAppShell>
  )
}

export default AppShell
