import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Preloader from '../components/Preloader'

const Layout = () => {
  return (
    <div className='overflow-hidden'>
      {/* <Preloader /> */}
      <Navbar />
      <AnimatePresence mode="wait">
        <Outlet key={location.pathname} />
      </AnimatePresence>
    </div>
  )
}

export default Layout