import React from 'react'
import Banner from '../../component/Banner'
import Arrivals from '../../component/Arrivals'
import HotDeals from '../../component/HotDeals'
import BrowseCategory from '../../component/BrowseCategory'

const Home = () => {
  return (
    <>
    <Banner />
    <Arrivals />
    {/* <HotDeals /> */}
    <BrowseCategory />
    </>
  )
}

export default Home