import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  RiWhatsappLine,
  RiMailLine,
  RiMapPinLine,
  RiSendPlaneLine,
} from "react-icons/ri";
import { useCheckNewsletterEmail, useSubscribeNewsletter } from "@/query/querySubscribe";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/api/authUser";
import { toast } from "sonner";
import Spinner from "./Spinner";
import { useSalesiveConfig } from "salesive-dev-tools";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(false);

  const { mutate:checkEmail, isLoading, data, error } =
    useCheckNewsletterEmail();
  const { mutate: subscribe, isLoading:loading } = useSubscribeNewsletter();

  const { data:dataa, isSuccess } = useQuery({
          queryKey: ["auth-user"],
          queryFn: getUser,
          retry: false,
    });
  const user = isSuccess ? dataa?.data?.user : null;


const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidName = (name) => {
  return /^[A-Za-z\s]+$/.test(name.trim());
};




const handleSubscribe = (e) => {
  e.preventDefault();
 console.log(checking)

 
  if (!email.trim()) {
    toast.error("Email is required");
    return;
  }

  if (!isValidEmail(email)) {
    toast.error("Please enter a valid email address");
    return;
  }
 setChecking(true)
  checkEmail(email, {
    onSuccess: async (res) => {
      await new Promise((r) => setTimeout(r, 2000)); 

      setChecking(false);
      if (res?.exists) {
        toast.error("Email already exists");
        return;
      }

      console.log(checking)

      subscribe(
        {
          email,
          name: user?.name || "Guest",
          source: "footer",
        },
        {
          onSuccess: () => {
            toast.success("Subscribed successfully");
          },
          onError: (err) => {
            console.error(err.message);
            toast.info(err.message)
          },
        }
      );
    },

    onError: (err) => {
      console.error(err.message);
    },
  });
  setEmail("")
};

const variables = useSalesiveConfig()
console.log(variables)


const DESCRIPTION_LIMIT = 80;
  const [showFullDescription, setShowFullDescription] =
    useState(false);

  const isLongDescription =  variables?.description?.length > DESCRIPTION_LIMIT;

  const displayedDescription = showFullDescription
    ? variables?.description
    : variables?.description?.slice(0, DESCRIPTION_LIMIT);


  return (
    <footer className="bg-white mt-20 border-t border-gray-200">
      <div className="px-6 md:px-16 lg:px-32 py-10 ">
        <div className="space-y-3 w-fit mb-5 p-5  bg-gray-100 rounded-2xl  shadow-lg max-sm:w-full">
            <h2 className="font-semibold text-gray-900">
              Subscribe to updates
            </h2>

            <p className="text-sm text-gray-600">
              Get notified about new products, drops & exclusive offers.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="
                  w-full
                  px-4 py-2.5
                  text-sm
                  rounded-full
                  border border-gray-300
                  focus:outline-none
                  focus:ring-2 focus:ring-blue-500
                "
              />

              <button
               disabled = {isLoading}
                type="submit"
                className="
                flex items-center justify-center
                 
        w-10 h-10
                  p-3
                  rounded-full
                  bg-blue-600
                  text-white
                  hover:bg-blue-700
                  transition
                "
              >
                {checking ? <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-4 h-4 rounded-full border-2 border-white border-t-transparent"
      /> : <RiSendPlaneLine />}
              </button>
            </form>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 ">
    
          <div className="">
           
        <div className="flex">
          {variables?.logo ? <Link to="/" className="w-20 h-20 rounded-full">
        <img className="w-full h-full" src={variables.logo} alt="" />
      </Link> : <Link to="/" className="font-medium text-2xl">
        <span className="text-blue-600">S</span>hopAll
      </Link>}
        </div>
           
            <p className="text-sm text-gray-600 leading-relaxed">
            {displayedDescription}
            {!showFullDescription && isLongDescription && "..."}
          </p>

          {isLongDescription && (
            <button
              onClick={() =>
                setShowFullDescription((prev) => !prev)
              }
              className="text-blue-600 mt-2 text-sm font-medium"
            >
              {showFullDescription ? "View less" : "View more"}
            </button>
          )}


    
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-5">Company</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-gray-900 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-gray-900 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gray-900 transition">
                  Privacy Policy
                </Link>
              </li>
              
            </ul>
          </div>

          

          <div className="space-y-4">
            <h2 className="font-semibold text-gray-900 mb-5">Get in touch</h2>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RiWhatsappLine className="text-green-600 text-lg" />
              <a
                href={`https://wa.me/${variables?.location?.phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition"
              >
                {variables?.location?.phone}
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RiMailLine className="text-blue-600 text-lg" />
              <span>{variables?.location?.email}</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RiMapPinLine className="text-red-500 text-lg" />
              <span>{variables?.location?.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 px-6 md:px-16 lg:px-32">
        <p className="text-xs text-gray-500 text-center">
          © 2025{" "}
          <span className="font-medium text-gray-700">Salesive</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
