"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-200 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, oklch(0.62 0.18 260), oklch(0.75 0.15 245), oklch(0.62 0.18 260))",
        boxShadow: "0 0 8px oklch(0.62 0.18 260 / 0.9), 0 0 20px oklch(0.62 0.18 260 / 0.5)",
      }}
    />
  )
}
