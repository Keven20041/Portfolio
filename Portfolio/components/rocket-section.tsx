"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect } from "react"
import Image from "next/image"

export function RocketSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return

    // Ensure muted before attempting to play — required by many browsers for autoplay
    vid.muted = true

    if (isInView) {
      const p = vid.play()
      if (p !== undefined) {
        p.catch(() => {
          // play() may be blocked by browser policies; ignore errors silently
        })
      }
    }
  }, [isInView])

  return (
    <section id="rocket" className="py-32 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 mb-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary font-mono text-sm tracking-widest mb-4">ROWAN ROCKETRY</p>
            <h2 className="text-4xl md:text-5xl font-bold text-balance">
              Launch day at
              <span className="text-gradient"> Rowan Rocketry</span>
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              A live launch captured during a competition flight. As Avionics Engineer, I designed
              the RF antenna and telemetry system onboard this rocket.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-hidden rounded-2xl border border-border bg-card"
        >
          {/* Place your video at public/videos/rocket-launch.mp4 */}
          {/* Aspect ratio container — change aspect-video (16:9) to aspect-[21/9] for ultra-wide crop */}
          <div className="relative w-full aspect-video">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/videos/rocket-launch.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
