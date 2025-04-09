"use client"
import React, { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"
import Link from "next/link"
import { Dropdown, Avatar, MenuProps } from "antd"
import { UserOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons"
import { useRouter } from "next/navigation"

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const navLinks = [
    { label: "Articles", href: "/admin/dashboard" },
  ]

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      })
  
      // Optionally, clear any client-side state or localStorage items
      localStorage.removeItem("token") // If you're using both cookies and localStorage
  
      router.push("/admin/login")
    } catch (error) {
      console.error("Logout failed", error)
    }
  }
  
  const dropdownItems: MenuProps["items"] = [
 
    {
      key: "logout",
      label: <span onClick={handleLogout}>Logout</span>,
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <div className="w-full py-4 bg-gray-800 text-white z-50 relative">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center px-4">
        {/* Left: Brand */}
        <h1 className="text-lg font-bold">
        Alicia Bee Coaches 
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map(({ label, href }) => (
            <Link key={href} href={href} className="hover:text-gray-400">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: Avatar + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Ant Design Avatar + Dropdown */}
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" trigger={["click"]}>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar size="large" icon={<UserOutlined />} />
              <DownOutlined className="text-xs md:inline-block hidden" />
            </div>
          </Dropdown>

          {/* Hamburger menu (mobile) */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center space-y-6 text-xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5 text-white"
          onClick={() => setMenuOpen(false)}
        >
          <FaTimes size={30} />
        </button>

        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="hover:text-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}

        {/* Logout in mobile menu */}
        <button
          onClick={() => {
            setMenuOpen(false)
            handleLogout()
          }}
          className="text-white hover:text-gray-400 mt-6"
        >
          <LogoutOutlined className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminNavbar
