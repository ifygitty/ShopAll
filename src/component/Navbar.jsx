

import { Link } from 'react-router-dom';
import { FaStar,FaRegStar, FaStarHalf, FaShoppingCart } from 'react-icons/fa'
import CartItems from './CartItems';


const Navbar = () => {

  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 max-md:hidden relative'>
        <p className='font-medium text-2xl'><span className='font-medium text-blue-600 text-2xl'>S</span>hopAll</p> 
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

       
          <CartItems />

       



       
    </nav>
  )
}

export default Navbar