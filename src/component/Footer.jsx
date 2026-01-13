import React from "react";
import { Link } from "react-router-dom";
import {
  RiWhatsappLine,
  RiMailLine,
  RiMapPinLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-white mt-20 border-t border-gray-200">
    
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
       
          <div className="space-y-6">
            <p className="text-2xl font-semibold text-gray-900">
              <span className="text-blue-600">S</span>hopAll
            </p>

            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              <strong>ShopAll</strong> is an exclusive online store that brings
              the best products straight to your doorstep.  
              From premium fashion to everyday essentials, we curate quality,
              style, and value — all in one seamless shopping experience.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/2348039506943"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-green-600 hover:text-green-700 transition"
              >
                <RiWhatsappLine className="text-lg" />
                Chat with us
              </a>
            </div>
          </div>

         
          <div className="md:justify-self-center">
            <h2 className="font-semibold text-gray-900 mb-5">
              Company
            </h2>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  to="/"
                  className="hover:text-gray-900 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-gray-900 transition"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                 
                  className="hover:text-gray-900 transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

       
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-900 mb-5">
              Get in touch
            </h2>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RiWhatsappLine className="text-green-600 text-lg" />
              <a
                href="https://wa.me/2348039506943"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-900 transition"
              >
                +234 803 950 6943
              </a>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RiMailLine className="text-blue-600 text-lg" />
              <span>support@shopall.com</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-600">
              <RiMapPinLine className="text-red-500 text-lg" />
              <span>Nigeria</span>
            </div>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-200 py-4 px-6 md:px-16 lg:px-32">
        <p className="text-xs text-gray-500 text-center">
          © 2025 <span className="font-medium text-gray-700">Salesive</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
