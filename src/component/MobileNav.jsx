import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  FaShoppingCart, FaHome, FaInfoCircle, FaPhone, FaShoppingBasket } from 'react-icons/fa'
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import { RiUserLine } from "react-icons/ri";
import WishListItems from "./WishListItems";
import { getUser } from "@/api/authUser";
import { useQuery } from "@tanstack/react-query";


const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);








  const { data, isSuccess } = useQuery({
      queryKey: ["auth-user"],
      queryFn: getUser,
      retry: false,
    });
  
  
  
    const user = isSuccess ? data?.data?.user : null;
  
    console.log(user)
  
    const [oppen, setOppen] = useState(false);
    const closeTimeout = useRef(null);
  
  
  
    const handleMouseEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setOppen(true);
  };
  
  const handleMouseLeave = () => {
    closeTimeout.current = window.setTimeout(() => {
      setOppen(false);
    }, 2000);
  };
  
  
    const avatarLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <div className=" w-full top-0 fixed z-50 md:hidden flex justify-between items-center px-6 md:px-16 lg:px-32 py-3 border-b bg-white border-gray-300 text-gray-700">

        <Link to={'/'} className='font-medium text-2xl max-sm:text-xl'><span className='font-medium text-blue-600 text-2xl'>S</span>hopAll</Link> 
        <div className="flex justify-between items-center gap-5">
           <div className='flex items-center gap-2 '>
             {user?.role !== "user" ? (
          <Link to="/login">
            <RiUserLine className="text-2xl hover:cursor-pointer" />
          </Link>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
         
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover cursor-pointer border max-sm:h-7 max-sm:w-7"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold cursor-pointer">
                {avatarLetter}
              </div>
            )}

            
            <div
              className={`absolute right-0 top-12 w-fit bg-white border rounded-lg shadow-lg px-4 py-3 text-sm text-gray-700 transition-all duration-200 ease-out max-sm:left-0 max-sm:text-xs max-sm:px-2 max-sm:py-2
              ${oppen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
              <p className="font-medium truncate">{user.name}</p>
            </div>
          </div>
        )}
                      <WishListItems />
                     <CartItems />
                     </div>
            <button
        onClick={() => setOpen(true)}
        className="p-2 focus:outline-none"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </div>
      </button>
        </div>
    
      

     
      <AnimatePresence>
        {open && (
          <>
            
            <motion.div
              className="fixed inset-0 bg-black/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            
            <motion.div
              ref={navRef}
              className="fixed top-0 right-0 w-2/4 h-full bg-white shadow-lg p-6 z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <nav className="flex flex-col gap-6">
                <Link onClick={() => setOpen(false)} className="flex gap-3 items-center"><FaHome /> Home</Link>
                <Link onClick={() => setOpen(false)} className="flex gap-3 items-center"><FaShoppingBasket /> Shop</Link>
               <Link onClick={() => setOpen(false)} className="flex gap-3 items-center"><FaInfoCircle /> About</Link>
                <Link onClick={() => setOpen(false)} className="flex gap-3 items-center"><FaPhone /> Phone</Link>

                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 text-red-500"
                >
                  Close
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
