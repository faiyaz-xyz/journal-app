"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

export default function CalendarView() {
  const router = useRouter();
  const today = new Date();

  // Format: june282025 (all lowercase month + day + year)
  const todayTitle = format(today, "MMMMdyyyy").toLowerCase();

  const handleJournalToday = () => {
    router.push(`/journal/${todayTitle}`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center pt-20 px-4">
      <h1 className="text-4xl font-bold mb-10 pixel-font">Your Pixel Journal</h1>

      {/* Simple pixelated calendar grid for current month */}
      <div className="grid grid-cols-7 gap-2 w-full max-w-md">
        {/* Weekday headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center font-bold pixel-font">{d}</div>
        ))}

        {/* Empty slots for days before first day of month */}
        {[...Array(new Date(today.getFullYear(), today.getMonth(), 1).getDay())].map((_, i) => (
          <div key={"empty-" + i}></div>
        ))}

        {/* Days of month */}
        {[...Array(new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate())].map((_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate();

          return (
            <div
              key={day}
              className={`text-center border-2 border-black cursor-pointer pixel-font rounded-sm
                ${isToday ? "bg-[#e47472] text-black font-bold" : "bg-white text-black"}`}
              onClick={() => {
                const dateTitle = format(new Date(today.getFullYear(), today.getMonth(), day), "MMMMdyyyy").toLowerCase();
                router.push(`/journal/${dateTitle}`);
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleJournalToday}
        className="mt-12 bg-black text-[#e47472] pixel-font font-bold px-8 py-3 border-4 border-black shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-[#e47472] hover:text-black transition-all duration-200 rounded"
      >
        Journal Today?
      </button>
    </div>
  );
}
