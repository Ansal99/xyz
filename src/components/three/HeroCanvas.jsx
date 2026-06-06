import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import CentralMesh from './CentralMesh.jsx'
import FloatingParticles from './FloatingParticles.jsx'

function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef([0, 0])
  if (typeof window !== 'undefined') {
    window.onmousemove = (e) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        (e.clientY / window.innerHeight - 0.5) * 2,
      ]
    }
  }
  useFrame(() => {
    camera.position.x += (mouse.current[0] * 0.3 - camera.position.x) * 0.05
    camera.position.y += (-mouse.current[1] * 0.2 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="absolute inset-0 z-0 pointer-events-none"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 60 }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[2, 2, 2]} color="#6EE7B7" intensity={0.4} />
      <CentralMesh />
      <FloatingParticles />
      <CameraRig />
    </Canvas>
  )
}
