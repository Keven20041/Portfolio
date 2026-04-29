"use client"

import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useTheme } from "next-themes"
import * as THREE from "three"

function Particles({ count = 500, startColor = '#4a7cf5', endColor = '#6b8cff', lightColor = '#4a7cf5' }: { count?: number, startColor?: string, endColor?: string, lightColor?: string }) {
  const mesh = useRef<THREE.Points>(null)
  const light = useRef<THREE.PointLight>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50
      const y = (Math.random() - 0.5) * 50
      const z = (Math.random() - 0.5) * 50
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [count])

  const colors = useMemo(() => {
    const temp = []
    const color1 = new THREE.Color(startColor)
    const color2 = new THREE.Color(endColor)
    for (let i = 0; i < count; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random())
      temp.push(mixedColor.r, mixedColor.g, mixedColor.b)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    // Smoothly interpolate mouse position
    smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * 0.04
    smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * 0.04

    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02 + smoothMouse.current.y * 0.2
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03 + smoothMouse.current.x * 0.2
    }
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10 + smoothMouse.current.x * 4
      light.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 10 + smoothMouse.current.y * 4
    }
  })

  return (
    <>
      <pointLight ref={light} intensity={2} color={lightColor} />
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
            args={[particles, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          color={startColor}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  )
}

export function ParticleField() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const particleStart = isDark ? "#ffffff" : "#4a7cf5"
  const particleEnd = isDark ? "#d1d5db" : "#6b8cff"
  const lightColor = isDark ? "#ffffff" : "#4a7cf5"

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={[isDark ? "#000000" : "#eaf4ff"]} />
        <ambientLight intensity={isDark ? 0.3 : 0.55} />
        <Particles count={800} startColor={particleStart} endColor={particleEnd} lightColor={lightColor} />
      </Canvas>
    </div>
  )
}
