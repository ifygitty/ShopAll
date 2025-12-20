import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import MobileNav from '../component/MobileNav'
import { createGhostUser } from '../api/authUser'

const Root = () => {
  useEffect(() => {
    const createUser = async () => {
      try {
        await createGhostUser();
      } catch (err) {
        console.error(err);
      }
    };

    createUser();
  }, []);

  return (
    <>
      <Navbar/>
      <MobileNav />
      <div className="px-6 md:px-16 lg:px-32">
        <Outlet/>
      </div>
      <Footer />
    </>
    
  )
}

export default Root