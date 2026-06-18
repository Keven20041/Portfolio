"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useEffect } from "react"

export function RocketSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const videos = [
    {
      label: "2025",
      src: "/videos/rocket-launch.mp4",
      title: "ProfPulsion",
    },
    {
      label: "2026",
      src: "/videos/NightOwl2026.mp4",
      title: "Night Owl",
    },
  ]

  useEffect(() => {
    if (!isInView) return

    videoRefs.current.forEach((vid) => {
      if (!vid) return

      // Ensure muted before attempting to play — required by many browsers for autoplay
      vid.muted = true

      const p = vid.play()
      if (p !== undefined) {
        p.catch(() => {
          // play() may be blocked by browser policies; ignore errors silently
        })
      }
    })
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
          className="grid gap-6 md:grid-cols-2"
        >
          {videos.map((video, index) => (
            <div key={video.src} className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">{video.label}</p>
                <p className="text-sm text-muted-foreground">{video.title}</p>
              </div>
              <div className="relative w-full aspect-video">
                <video
                  ref={(element) => {
                    videoRefs.current[index] = element
                  }}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
