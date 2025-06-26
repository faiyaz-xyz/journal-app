import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
  return (
    <main className="flex-grow flex flex-col justify-center items-center text-center px-6">
    <h2 className="text-6xl font-bold text-black mb-4 font-pixelify">
        Your Cozy Pixel Journal
    </h2>
    <p className="max-w-xl text-2xl text-black mb-8 font-pixelify">
        A safe, lofi pixelated space to log your moods, thoughts, and vibes.  
        Chill, reflect, and grow — all with pixel love.
    </p>
    <Link href="/signup" className="py-2 px-5 font-bold text-3xl rounded-sm border-4 cursor-pointer border-black hover:bg-[#e47472] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-all duration-300">
        Get Started
    </Link>
    </main>
  )
}

export default HeroSection