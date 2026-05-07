import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function PerfumeModel() {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle breathing/floating is handled by <Float>, 
  // we just need to ensure the bottle looks great!

  return (
    <group ref={groupRef} dispose={null}>
      {/* Glass Body */}
      <RoundedBox
        args={[2.2, 3.2, 1.2]}
        radius={0.2}
        smoothness={4}
        position={[0, -0.2, 0]}
      >
        <meshPhysicalMaterial
          transmission={1}
          transparent
          opacity={1}
          roughness={0.05}
          thickness={2}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Liquid Inside */}
      <RoundedBox
        args={[1.9, 2.7, 0.9]}
        radius={0.1}
        smoothness={4}
        position={[0, -0.3, 0]}
      >
        <meshPhysicalMaterial
          color="#C8A96B"
          transmission={0.4}
          transparent
          opacity={0.9}
          roughness={0.1}
          thickness={1}
        />
      </RoundedBox>

      {/* Gold Neck Layer 1 */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.2, 32]} />
        <meshStandardMaterial color="#C8A96B" metalness={1} roughness={0.2} />
      </mesh>
      
      {/* Gold Neck Layer 2 */}
      <mesh position={[0, 1.7, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
        <meshStandardMaterial color="#C8A96B" metalness={1} roughness={0.1} />
      </mesh>

      {/* Luxury Black Cap */}
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 1.2, 32]} />
        <meshStandardMaterial color="#050505" metalness={0.8} roughness={0.15} />
      </mesh>

      {/* Cap Gold Ring Accent */}
      <mesh position={[0, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <torusGeometry args={[0.7, 0.05, 16, 32]} />
         <meshStandardMaterial color="#C8A96B" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, 2.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
         <torusGeometry args={[0.7, 0.05, 16, 32]} />
         <meshStandardMaterial color="#C8A96B" metalness={1} roughness={0.1} />
      </mesh>

      {/* Gold Brand Plate on Front */}
      <mesh position={[0, -0.2, 0.61]}>
         <boxGeometry args={[1.2, 1.2, 0.02]} />
         <meshStandardMaterial color="#C8A96B" metalness={1} roughness={0.2} />
      </mesh>
      {/* Inner Black Plate */}
      <mesh position={[0, -0.2, 0.62]}>
         <boxGeometry args={[1.1, 1.1, 0.02]} />
         <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

export default function Bottle3D() {
  return (
    <div className="w-full h-full relative z-20 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} intensity={1} angle={0.2} penumbra={1} color="#C8A96B" />
        <directionalLight position={[-10, 5, -5]} intensity={2} color="#ffffff" />
        
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
          <PerfumeModel />
        </Float>
        
        {/* Ground shadow for realism */}
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
        
        {/* Allow users to rotate */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5} 
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={1.5}
        />
        
        {/* Realistic luxury environment reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
