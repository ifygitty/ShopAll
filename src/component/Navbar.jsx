import { Link } from "react-router-dom";
import { RiUserLine } from "react-icons/ri";
import CartItems from "./CartItems";
import WishListItems from "./WishListItems";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useRef, useState } from "react";
import { getUser } from "@/api/authUser";


const Navbar = () => {
  const { data, isSuccess } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getUser,
    retry: false,
  });



  const user = isSuccess ? data?.data?.user : null;

  console.log(user?.role)

  const [open, setOpen] = useState(false);
  const closeTimeout = useRef(null);



  const handleMouseEnter = () => {
  if (closeTimeout.current) {
    clearTimeout(closeTimeout.current);
  }
  setOpen(true);
};

const handleMouseLeave = () => {
  closeTimeout.current = window.setTimeout(() => {
    setOpen(false);
  }, 2000);
};


  const avatarLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 fixed w-full top-0 z-50 bg-white max-md:hidden">
      <Link to="/" className="font-medium text-2xl">
        <span className="text-blue-600">S</span>hopAll
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <Link to="/all-products" className="hover:text-gray-900">Shop</Link>
        <Link to="/" className="hover:text-gray-900">About Us</Link>
      </div>

      <div className="flex items-center gap-5 relative">
       
        { user?.role === "user" ? (
          
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
         
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover cursor-pointer border"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer">
                {avatarLetter}
              </div>
            )}

            
            <div
              className={`absolute right-0 top-12 min-w-[200px] bg-white border rounded-lg shadow-lg px-4 py-3 text-sm text-gray-700 transition-all duration-200 ease-out
              ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
              <p className="font-medium truncate">{user.name}</p>
            </div>
          </div>
        ) : (
          <Link to="/login">
            <RiUserLine className="text-2xl hover:cursor-pointer" />
          </Link>
        )}

        <WishListItems />
        <CartItems />
      </div>
    </nav>
  );
};

export default Navbar;

