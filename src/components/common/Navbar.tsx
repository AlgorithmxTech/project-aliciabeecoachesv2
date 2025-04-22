"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Logo from '../../../public/images/picsvg_download.svg'
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full  py-5 bg-black text-white">
      <div className="max-w-[1080px] mx-auto h-full flex justify-between items-center px-4">
        
<div className="flex  items-center gap-3">
  
  <Image
  src={Logo}
  alt="alicia Bee Coached"
className="w-16 h-18"
  />
 

<h1 className="text-xl font-bold">Alicia Bee Coaches</h1>
</div>
        


        <nav className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-gray-400">Home</Link>
          <Link href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
        </nav>


        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>


      <div className={`md:hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center space-y-6 text-xl transition-transform ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button className="absolute top-5 right-5 text-white" onClick={() => setMenuOpen(false)}>
          <FaTimes size={30} />
        </button>
        <Link href="/" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/privacy-policy" className="hover:text-gray-400" onClick={() => setMenuOpen(false)}>Privacy Policy</Link>
      </div>
    </div>
  );
};

export default Navbar;
