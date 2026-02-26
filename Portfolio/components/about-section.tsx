"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, MapPin, Languages } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest mb-4">ABOUT</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Building at the intersection of
            <span className="text-gradient"> code & hardware</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-card border border-border rounded-2xl p-8">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                I&apos;m a Computer Science student at Rowan University with a Minor in Mathematics and 
                a concentration in Cyber Security Defense. My journey spans from web development with modern 
                frameworks like React.js and Next.js to designing RF antennas and telemetry systems for 
                high-powered rockets.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Recently, I completed an internship at Northeast Precast, where I developed a full-stack 
                application using C#, Blazor, and .NET 9, along with a YOLO-based machine learning model 
                to automate technical drawing analysis. I&apos;ve also contributed to JobPiloting, integrating 
                AI-driven features into their platform.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                As an Avionics Engineer with Rowan Rocketry, I design and test RF antennas for telemetry 
                transmission, working with RTL-SDR and TeleMega flight computers to capture live flight data.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Education</p>
                  <p className="text-sm text-muted-foreground">Rowan University</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                B.S. Computer Science (May 2026)
                <br />
                Minor: Mathematics
                <br />
                Concentration: Cyber Security Defense
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">New Jersey, USA</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                Open to remote opportunities and relocation for the right role.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Languages className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Languages</p>
                  <p className="text-sm text-muted-foreground">Bilingual</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">
                English & Spanish
                <br />
                Seal of Biliteracy Certified
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
