"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { ArrowDown, Rocket, Code2, Cpu } from "lucide-react"
import Image from "next/image"

const roles = ["SOFTWARE & AVIONICS ENGINEER", "FULL STACK DEVELOPER", "CS @ ROWAN UNIVERSITY"]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="h-6 mb-4 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="text-primary font-mono text-sm tracking-widest"
                >
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-balance"
            >
              <span className="text-foreground">Keven</span>
              <br />
              <span className="text-gradient">Guzman</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed mb-8"
            >
              Senior Computer Science student at Rowan University with hands-on experience in web development, 
              software engineering, and avionics systems for high-powered rocketry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                View Projects
                <ArrowDown className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary transition-colors"
              >
                Get In Touch
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative">
              {/* Rotating rings around photo */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-6 rounded-full border border-primary/30"
                style={{ boxShadow: '0 0 12px oklch(0.62 0.18 260 / 0.15)' }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 rounded-full border border-primary/40"
                style={{ boxShadow: '0 0 18px oklch(0.62 0.18 260 / 0.2)' }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-20 rounded-full border border-primary/20"
              />

              {/* Floating icons */}
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 glass-card p-3 rounded-xl z-10"
                style={{ boxShadow: '0 0 12px oklch(0.62 0.18 260 / 0.25)' }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Code2 className="w-6 h-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 glass-card p-3 rounded-xl z-10"
                style={{ boxShadow: '0 0 12px oklch(0.62 0.18 260 / 0.25)' }}
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Cpu className="w-6 h-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-20 -translate-y-1/2 glass-card p-3 rounded-xl z-10"
                style={{ boxShadow: '0 0 12px oklch(0.62 0.18 260 / 0.25)' }}
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Rocket className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Profile image */}
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-primary/50"
                style={{ boxShadow: '0 0 30px oklch(0.62 0.18 260 / 0.35), 0 0 60px oklch(0.62 0.18 260 / 0.15)' }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KevenHeadshot-SyzGYOtC8SneFaiIpL108JLeajXO5V.jpg"
                  alt="Keven Guzman"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-primary/10" />
              </div>

              {/* Glow effect behind photo */}
              <div className="absolute inset-0 -z-10 bg-primary/25 rounded-full blur-2xl animate-pulse-glow scale-110" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
