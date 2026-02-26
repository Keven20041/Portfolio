"use client"

import { motion } from "framer-motion"
import { ArrowDown, Rocket, Code2, Cpu } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-mono text-sm tracking-widest mb-4"
            >
              SOFTWARE ENGINEER & AVIONICS DEVELOPER
            </motion.p>

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
                className="absolute -inset-6 rounded-full border border-border/50"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-12 rounded-full border border-primary/30"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-20 rounded-full border border-primary/20"
              />

              {/* Floating icons */}
              <motion.div
                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-card p-3 rounded-xl border border-border z-10"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Code2 className="w-6 h-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-card p-3 rounded-xl border border-border z-10"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              >
                <Cpu className="w-6 h-6 text-primary" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-20 -translate-y-1/2 bg-card p-3 rounded-xl border border-border z-10"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Rocket className="w-6 h-6 text-primary" />
              </motion.div>

              {/* Profile image */}
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary/30">
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
              <div className="absolute inset-0 -z-10 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
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
