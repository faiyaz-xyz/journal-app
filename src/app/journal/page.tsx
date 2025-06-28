"use client"

import { useRouter } from "next/navigation"
import { format } from "date-fns"
import React from "react"

export default function JournalHome() {
  const router = useRouter()
  const today = format(new Date(), "MMMMddyyyy")

  const handleJournalToday = () => {
    router.push(`/journal/${today}`)
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] flex flex-col items-center py-16 px-4">
      <h1 className="text-4xl font-bold text-[#444] mb-10 pixel-font">📅 Your Journal</h1>

      {/* Pixel Calendar (Fake UI for now) */}
      <div className="grid grid-cols-7 gap-2 mb-12 w-full max-w-2xl">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 bg-[#fff] border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,1)] text-center leading-10 font-bold pixel-font text-[#444]"
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Journal Today Button */}
      <button
        onClick={handleJournalToday}
        className="bg-[#ffe8cc] text-[#222] border-4 border-black px-6 py-3 rounded-sm font-bold shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:bg-[#fcd5b4] pixel-font transition-all"
      >
        📝 Journal today?
      </button>
    </div>
  )
}
