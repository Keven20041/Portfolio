"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Rocket, Dumbbell, Globe, Radio, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const projects = [
  {
    title: "Rowan Rocketry Website",
    subtitle: "Full Stack Development",
    description:
      "Designed and developed a fully functional website from scratch, handling both front-end and back-end implementation to showcase Rowan Rocketry's mission and achievements. Utilized Next.js, React.js, Tailwind CSS, and Express.js with MySQL backend.",
    icon: Globe,
    link: "https://www.rowanrocketry.com",
    video: "/videos/RowanWebsite.mp4",
    technologies: ["Next.js", "React.js", "Tailwind CSS", "Express.js", "MySQL"],
    featured: true,
  },
  {
    title: "Rowan Rocketry Avionics",
    subtitle: "Avionics & Telemetry Engineer",
    description:
      "Designed and fabricated a custom antenna mount for the avionics sled bay, ensuring secure GPS and telemetry signal transmission during high-powered rocket flights. Engineered, tested, and integrated RF antennas for telemetry systems. Worked with RTL-SDR, Angel, and TeleMega flight computers to capture and decode live flight data, conducting range testing and real-time signal strength evaluations.",
    icon: Rocket,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-51MPfAJz5xkfsTlrj1XyeKJQVUxRqJ.png",
    imageAlt: "CAD render of the custom antenna mount designed for the avionics sled bay",
    images: [
      { src: "/AltOS.jpg", alt: "RTL-SDR antenna and ground station setup" },
      { src: "/Eletronic-Lab.jpg", alt: "RF signal analysis on oscilloscope in the lab" },
    ],
    technologies: ["SolidWorks", "RF Antennas", "RTL-SDR", "TeleMega", "Telemetry", "3D Printing"],
    featured: true,
  },
  {
    title: "Northeast Precast PDF Automation",
    subtitle: "Machine Learning Application",
    description:
      "Full-stack web application using C#, Blazor, and .NET 9 to automate extraction and processing of engineering shop-ticket PDFs. Trained YOLO-based model to detect section and form views in technical drawings.",
    icon: Dumbbell,
    images: [
      { src: "/NE-upload.jpg", alt: "Northeast Precast upload interface" },
      { src: "/NE-history.jpg", alt: "Northeast Precast processing history" },
      { src: "/NE-viewer.jpg", alt: "Northeast Precast PDF viewer with extracted data" },
    ],
    technologies: ["C#", "Blazor", ".NET 9", "YOLO", "SQLite", "CVAT"],
    featured: true,
  },
  {
    title: "Philadelphia Pointing Span Test (PPST)",
    subtitle: "Neurocognitive Assessment Application",
    description:
      "The Philadelphia Pointing Span Test (PPST) is a digital, tablet-based neurocognitive assessment used to evaluate working memory and executive function. It measures an individual's ability to recall sequences of spatial locations, providing insight into serial order processing, attention control, and response latency. PPST serves as a screening tool for identifying potential neurocognitive impairments, with performance linked to broader executive functioning. Emerging research also suggests correlations between PPST outcomes and cardiovascular health, highlighting its value in both clinical and research settings.",
    icon: Brain,
    video: "/videos/PPSTAPP-compressed.mp4",
    technologies: ["Neurocognitive Testing", "Working Memory", "Executive Function", "Tablet App"],
    featured: true,
  },
  {
    title: "JobPiloting AI Platform",
    subtitle: "AI-Driven MVP Integration",
    description:
      "Contributed to front-end and back-end development of an AI-driven MVP platform, enhancing user engagement and functionality for a job-focused startup.",
    icon: Radio,
    technologies: ["React", "AI Integration", "Full Stack"],
    featured: false,
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [tiltState, setTiltState] = useState<{ [key: number]: { x: number; y: number } }>({})

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTiltState((prev) => ({ ...prev, [index]: { x: y * -7, y: x * 7 } }))
  }

  const handleMouseLeaveCard = (index: number) => {
    setTiltState((prev) => ({ ...prev, [index]: { x: 0, y: 0 } }))
    setHoveredIndex(null)
  }

  return (
    <section id="projects" className="py-32 px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest mb-4">PROJECTS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Things I&apos;ve
            <span className="text-gradient"> built</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => handleMouseLeaveCard(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                style={{
                  transform: `perspective(1200px) rotateX(${tiltState[index]?.x ?? 0}deg) rotateY(${tiltState[index]?.y ?? 0}deg) translateZ(0)`,
                  transition: hoveredIndex === index ? 'transform 0.12s ease-out, box-shadow 0.3s ease, border-color 0.3s ease' : 'transform 0.4s ease-out, box-shadow 0.3s ease, border-color 0.3s ease',
                  willChange: 'transform',
                  boxShadow: hoveredIndex === index ? '0 0 25px oklch(0.62 0.18 260 / 0.3), 0 0 50px oklch(0.62 0.18 260 / 0.1)' : '0 0 0px transparent',
                }}
                className={cn(
                  "group relative glass-card rounded-2xl p-8 border",
                  hoveredIndex === index ? "border-primary/50" : "border-white/[0.07]",
                  project.featured && "md:col-span-1"
                )}
              >
                <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {"video" in project && project.video && (
                    <div className="relative w-full aspect-video mb-6 rounded-xl overflow-hidden bg-secondary/50">
                      <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      >
                        <source src={project.video as string} type="video/mp4" />
                      </video>
                    </div>
                  )}
                  {project.image && (
                    <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-secondary/50">
                      <Image
                        src={project.image}
                        alt={project.imageAlt || project.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  )}
                  {"images" in project && project.images && (() => {
                    const imgs = project.images as { src: string; alt: string }[]
                    return imgs.length === 3 ? (
                      <div className="mb-6 space-y-2">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                          <Image src={imgs[0].src} alt={imgs[0].alt} fill className="object-cover" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {imgs.slice(1).map((img) => (
                            <div key={img.src} className="relative w-full aspect-video rounded-xl overflow-hidden">
                              <Image src={img.src} alt={img.alt} fill className="object-cover" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {imgs.map((img) => (
                          <div key={img.src} className="relative w-full aspect-video rounded-xl overflow-hidden">
                            <Image src={img.src} alt={img.alt} fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    )
                  })()}

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex items-center gap-3">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-1">{project.title}</h3>
                  <p className="text-primary text-sm mb-4">{project.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-primary/10 text-primary/80 text-sm rounded-full border border-primary/20 hover:border-primary/50 hover:text-primary hover:bg-primary/15 transition-all duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/Keven20041"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
            View more on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
