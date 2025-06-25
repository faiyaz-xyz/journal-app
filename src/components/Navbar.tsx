"use client"

import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <h1 className="text-2xl font-bold text-black cursor-default">MoodMate</h1>
      <nav className="flex items-center justify-center gap-6 text-black font-semibold">
        <Link className="link-underline cursor-pointer" href="/about">
          About
        </Link>
        <Link className="link-underline cursor-pointer" href="/support">
          Support
        </Link>
        <Link className="py-1 px-3 rounded-sm border-2 border-black hover:bg-[#e47472] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer" href="/login">
          Login
        </Link>
      </nav>
    </header>
  )
}

export default Navbar