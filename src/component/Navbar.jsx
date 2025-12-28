

import { Link } from 'react-router-dom';
import { FaStar,FaRegStar, FaStarHalf, FaShoppingCart } from 'react-icons/fa'
import CartItems from './CartItems';
import { RiUserLine } from 'react-icons/ri';


const Navbar = () => {

  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 max-md:hidden fixed w-full top-0 z-50 bg-white'>
        <Link to={'/'} className='font-medium text-2xl'><span className='font-medium text-blue-600 text-2xl'>S</span>hopAll</Link> 
        <div className='flex items-center gap-4 lg:gap-8 max-md:hidden'>
             <Link to="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link to="/all-products" className="hover:text-gray-900 transition">
          Shop
        </Link>
        <Link to="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
       

        </div> 
          
          <div className='flex items-center gap-5 '>
            <Link to={"/login"}>
             <RiUserLine className="hover:cursor-pointer text-2xl"/>
            </Link>
             
          <CartItems />
          </div>
          


       



       
    </nav>
  )
}

export default Navbar