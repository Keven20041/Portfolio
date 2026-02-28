"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function Particles({ count = 500 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  const light = useRef<THREE.PointLight>(null)

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
    const color1 = new THREE.Color("#4a7cf5")
    const color2 = new THREE.Color("#6b8cff")
    for (let i = 0; i < count; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random())
      temp.push(mixedColor.r, mixedColor.g, mixedColor.b)
    }
    return new Float32Array(temp)
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.02
      mesh.current.rotation.y = state.clock.elapsedTime * 0.03
    }
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 10
      light.current.position.y = Math.cos(state.clock.elapsedTime * 0.5) * 10
    }
  })

  return (
    <>
      <pointLight ref={light} intensity={2} color="#4a7cf5" />
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
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </>
  )
}

export function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={["#0f172a"]} />
        <ambientLight intensity={0.3} />
        <Particles count={800} />
      </Canvas>
    </div>
  )
}
