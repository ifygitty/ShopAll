import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import MobileNav from '../component/MobileNav'
import { useCreateGhostUser } from '@/hooks/auth-hook'

const Root = () => {
  const createGhostHandler = useCreateGhostUser();
  useEffect(() => {
    const createUser = async () => {
      try {
        await createGhostHandler.mutateAsync();
      } catch (err) {
        console.error(err);
      }
    };

    createUser();
  }, []);

  return (
    <>
      <Navbar />
      <MobileNav />
      <div className="px-6 md:px-16 lg:px-32 max-sm:px-4 mt-15">
        <Outlet />
      </div>
      <Footer />
    </>

  )
}

export default Root