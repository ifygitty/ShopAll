import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  FaShoppingCart, FaHome, FaInfoCircle, FaPhone, FaShoppingBasket } from 'react-icons/fa'
import { Link } from "react-router-dom";
import CartItems from "./CartItems";
import { RiCloseLine, RiUserLine } from "react-icons/ri";
import WishListItems from "./WishListItems";
import { getUser } from "@/api/authUser";
import { useQuery } from "@tanstack/react-query";
import { useSalesiveConfig } from "salesive-dev-tools";


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

    const variables = useSalesiveConfig()

    const getInitials = (name = "") => {
  const words = name.trim().split(" ").filter(Boolean);

  if (words.length === 0) return "";
  if (words.length === 1) return words[0][0].toUpperCase();

  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
};


  return (
    <div className=" w-full top-0 fixed z-50 md:hidden flex justify-between items-center px-6 md:px-16 lg:px-32 max-sm:px-4  border-b bg-white border-gray-300 text-gray-700">

        {variables?.logo ? <Link className="w-20 h-20 rounded-full">
        <img className="w-full h-full" src={variables.logo} alt="" />
      </Link> : <Link to="/" className="font-medium text-2xl">
        <span className="text-blue-600">S</span>hopAll
      </Link>}
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
         
            <p className="w-12 h-12 flex items-center justify-center 
              text-gray-200 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 
              rounded-full font-semibold font-template-badoni md:hidden avatar max-sm:h-10 max-sm:w-10 max-sm:text-sm">
 {getInitials(user?.name)}
</p>

            
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
              className="fixed top-0 right-0 w-2/4 h-full bg-white shadow-lg p-6 z-50 max-sm:w-3/4"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
               
               <div className="relative">
                <button 
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full flex items-center justify-center
                              hover:bg-gray-100 transition"
                >
                  <RiCloseLine size={20} />
                </button>
                <nav className="flex flex-col gap-6 mt-6">
                <Link onClick={() => setOpen(false)} className="flex gap-3 items-center"><FaHome /> Home</Link>
                <Link to={"/orders"} onClick={() => setOpen(false)} className="flex gap-3 items-center"><FaShoppingBasket /> Orders</Link>
               <Link to={"/about-us"} onClick={() => setOpen(false)} className="flex gap-3 items-center"><FaInfoCircle /> About</Link>
               

                
              </nav>
               </div>
              
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
