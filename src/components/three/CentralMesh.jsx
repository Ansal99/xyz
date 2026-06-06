import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function CentralMesh() {
  const meshRef = useRef()
  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x += 0.001
  })
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.8, 1]} />
      <meshBasicMaterial color="#6EE7B7" wireframe opacity={0.15} transparent />
    </mesh>
  )
}
