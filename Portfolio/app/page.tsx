"use client"

import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { RocketSection } from "@/components/rocket-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollProgressBar } from "@/components/scroll-progress-bar"

const ParticleField = dynamic(
  () => import("@/components/particle-field").then((mod) => mod.ParticleField),
  { ssr: false }
)

export default function Portfolio() {
  return (
    <main className="relative min-h-screen">
      <ScrollProgressBar />
      <ParticleField />
      {/* Aurora atmosphere — sits between particle canvas and page content */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -5 }}>
        <div className="absolute top-1/4 -left-32 w-175 h-175 rounded-full opacity-[0.12] blur-[120px] animate-aurora-1" style={{ background: 'oklch(0.62 0.18 260)' }} />
        <div className="absolute bottom-1/3 -right-32 w-150 h-150 rounded-full opacity-[0.09] blur-[100px] animate-aurora-2" style={{ background: 'oklch(0.55 0.20 255)' }} />
        <div className="absolute top-3/4 left-1/3 w-100 h-100 rounded-full opacity-[0.07] blur-[80px] animate-aurora-1" style={{ background: 'oklch(0.62 0.18 260)', animationDelay: '-7s' }} />
      </div>
      <Navigation />
      <HeroSection />
      <AboutSection />
      <RocketSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
