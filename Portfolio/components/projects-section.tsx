"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Rocket, Dumbbell, Globe, Radio } from "lucide-react"
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
    technologies: ["SolidWorks", "RF Antennas", "RTL-SDR", "TeleMega", "Telemetry", "3D Printing"],
    featured: true,
  },
  {
    title: "Northeast Precast PDF Automation",
    subtitle: "Machine Learning Application",
    description:
      "Full-stack web application using C#, Blazor, and .NET 9 to automate extraction and processing of engineering shop-ticket PDFs. Trained YOLO-based model to detect section and form views in technical drawings.",
    icon: Dumbbell,
    technologies: ["C#", "Blazor", ".NET 9", "YOLO", "SQLite", "CVAT"],
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
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "group relative bg-card border border-border rounded-2xl p-8 transition-all duration-300",
                  hoveredIndex === index && "border-primary/50 scale-[1.02]",
                  project.featured && "md:col-span-1"
                )}
              >
                <div className="absolute inset-0 bg-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative">
                  {project.image && (
                    <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden bg-secondary/50">
                      <Image
                        src={project.image}
                        alt={project.imageAlt || project.title}
                        fill
                        className="object-contain p-4"
                      />
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex items-center gap-3">
                      {project.status && (
                        <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
                          {project.status}
                        </span>
                      )}
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
                        className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full"
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
