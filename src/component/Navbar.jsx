import { Link } from "react-router-dom";
import { RiUserLine } from "react-icons/ri";
import CartItems from "./CartItems";
import WishListItems from "./WishListItems";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useRef, useState } from "react";
import { getUser } from "@/api/authUser";
import { useSalesiveConfig } from "salesive-dev-tools";


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

  const getInitials = (name = "") => {
  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase();

  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
};


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

  const variables = useSalesiveConfig()

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700 fixed w-full top-0 z-50 bg-white max-md:hidden">

      {variables?.logo ? <Link to="/"
          className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center"
        >
          <img
            src={variables.logo}
            alt="Logo"
            className="w-full h-full object-cover block"
          />
        </Link>
        : <Link to="/" className="font-medium text-2xl">
                <span className="text-blue-600">S</span>hopAll
          </Link>
          }
      
      

      <div className="flex items-center gap-8">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <Link to="/about-us" className="hover:text-gray-900">About Us</Link>
        <Link to="/orders">Orders</Link>
      </div>

      <div className="flex items-center gap-5 relative">
       
        { user?.role === "user" ? (
          
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
         
          <p className="w-12 h-12 flex items-center justify-center 
              text-gray-200 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 
              rounded-full font-semibold font-template-badoni max-md:hidden avatar">
 {getInitials(user?.name)}
</p>


            
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

