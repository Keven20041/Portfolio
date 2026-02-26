"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Server, Radio, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: ["JavaScript", "TypeScript", "Java", "Python", "HTML", "CSS", "C#"],
  },
  {
    title: "Frameworks & Libraries",
    icon: Server,
    skills: ["React.js", "Node.js", ".NET", "Blazor", "Entity Framework Core", "YOLO"],
  },
  {
    title: "Databases & Tools",
    icon: Wrench,
    skills: ["MySQL", "SQLite", "Git", "GitHub", "Maven", "Playwright", "VS Code", "CVAT"],
  },
  {
    title: "Avionics & Hardware",
    icon: Radio,
    skills: ["RF Antennas", "RTL-SDR", "Angel", "TeleMega", "Telemetry Systems", "Signal Analysis"],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 px-6 bg-secondary/30" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-primary font-mono text-sm tracking-widest mb-4">SKILLS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-balance">
            Technologies &
            <span className="text-gradient"> expertise</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: index * 0.1 + skillIndex * 0.05 }}
                      className="px-4 py-2 bg-secondary text-foreground text-sm rounded-lg hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-card border border-border rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">Certifications & Activities</h3>
          <div className="flex flex-wrap gap-3">
            {["Google IT Fundamentals", "Rowan Rocketry - Avionics Engineer", "Cyber Security Defense Concentration"].map(
              (activity, index) => (
                <motion.span
                  key={activity}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg"
                >
                  {activity}
                </motion.span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
