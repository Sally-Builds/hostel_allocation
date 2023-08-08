import React from 'react'
import { Outlet } from "react-router-dom";
import NavBar from '../../components/navbar';

const HomeLayout = () => {
  return (
    <div className="grid">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default HomeLayout