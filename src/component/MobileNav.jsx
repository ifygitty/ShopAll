import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {  FaShoppingCart, FaHome, FaInfoCircle, FaPhone, FaShoppingBasket } from 'react-icons/fa'
import { Link } from "react-router-dom";


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

  return (
    <div className="relative z-50 md:hidden flex justify-between items-center px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">

        <p className='font-medium text-2xl'><span className='font-medium text-blue-600 text-2xl'>S</span>hopAll</p> 
        <div className="flex justify-between items-center gap-5">
            <FaShoppingCart className="text-blue-600" />
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
              className="fixed top-0 right-0 w-2/4 h-full bg-white shadow-lg p-6"
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
