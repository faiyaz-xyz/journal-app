"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { PixelConfetti } from "@/components/confetti/PixelConfetti"
import { AnimatePresence, motion } from "framer-motion"

type Toast = {
  id: number
  message: string
  type: "success" | "error"
}


const ToastContext = createContext({
  showToast: (_msg: string, _type: Toast["type"]) => {},
})

export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = (message: string, type: Toast["type"]) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    if (type === "success") setShowConfetti(true)
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-[300px] border-4 text-black font-pixelify px-4 py-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)] ${
                toast.type === "success"
                  ? "bg-[#bfe3b0] border-black"
                  : "bg-[#f08080] border-black"
              }`}
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
