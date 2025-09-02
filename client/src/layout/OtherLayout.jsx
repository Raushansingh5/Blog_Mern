import React from 'react'
import { Outlet } from 'react-router-dom'

function OtherLayout() {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default OtherLayout