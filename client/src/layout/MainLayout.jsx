import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'

function MainLayout() {
  return (
    <div className='px-12 md:px-32 lg:px-64'>
        <Navbar/>
        <main className='my-4'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default MainLayout