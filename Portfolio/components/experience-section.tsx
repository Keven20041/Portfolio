"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, ExternalLink } from "lucide-react"

const experiences = [
  {
    title: "Software Engineering Intern",
    company: "Northeast Precast",
    period: "Sept 2025 - Dec 2025",
    description: [
      "Developed a full-stack web application using C#, Blazor, and .NET 9 to automate extraction and processing of engineering shop-ticket PDFs",
      "Designed and trained a YOLO-based model to detect section and form views in technical drawings",
      "Implemented backend services for PDF parsing, view-specific data extraction, and data persistence using SQLite",
      "Built annotated datasets using CVAT, improving detection accuracy and reliability",
    ],
    technologies: ["C#", "Blazor", ".NET 9", "YOLO", "SQLite", "CVAT", "Machine Learning"],
  },
  {
    title: "Software Engineer",
    company: "JobPiloting",
    period: "May 2024 - Nov 2024",
    description: [
      "Collaborated with the team to conceptualize and develop innovative website design ideas, enhancing user engagement and brand identity",
      "Played a key role in integrating an AI-driven Minimum Viable Product (MVP) into the company's platform",
      "Contributed to front-end and back-end development efforts, leveraging modern tools and frameworks to optimize performance",
    ],
    technologies: ["React", "AI Integration", "Full Stack Development"],
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest mb-4">EXPERIENCE</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Where I&apos;ve
            <span className="text-gradient"> worked</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-primary">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-sm font-mono">{exp.period}</span>
                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-2 w-1 h-1 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
