"use client"

import { useEffect, useRef, useState } from "react"

const COLORS = ["#ff005d", "#ffa100", "#00ffe0", "#8aff00", "#faff00"]

export const PixelConfetti = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [confetti, setConfetti] = useState<any[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: -10,
      size: 8,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
    }))

    setConfetti(particles)

    let frame: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.velocityX
        p.y += p.velocityY

        ctx.fillStyle = p.color
        ctx.fillRect(p.x, p.y, p.size, p.size)
      })

      frame = requestAnimationFrame(draw)
    }

    draw()

    const timeout = setTimeout(() => {
      cancelAnimationFrame(frame)
      setConfetti([])
    }, 2000) // stop after 2s

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
    }
  }, [])

  if (confetti.length === 0) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-[9998] pointer-events-none"
    />
  )
}
