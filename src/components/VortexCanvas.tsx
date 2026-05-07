import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

const globalMouse = { x: 0, y: 0 };

function CloudParticles() {
  const group = useRef<THREE.Group>(null);
  
  // Use a generic blurred dot as smoke texture
  const cloudTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 128, 128);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const numClouds = 30;
  
  const clouds = useMemo(() => {
    return new Array(numClouds).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5 - 2
      ] as [number, number, number],
      rotation: Math.random() * Math.PI * 2,
      scale: Math.random() * 8 + 4,
      speed: (Math.random() - 0.5) * 0.002,
      opacity: Math.random() * 0.15 + 0.05
    }));
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.z += 0.0005;
      group.current.children.forEach((child, i) => {
        child.rotation.z += clouds[i].speed;
      });

      // Mouse interactivity for clouds
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, globalMouse.x * 2, 0.02);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, globalMouse.y * 2, 0.02);
    }
  });

  return (
    <group ref={group}>
      {clouds.map((cloud, i) => (
        <mesh key={i} position={cloud.position} rotation={[0, 0, cloud.rotation]} scale={cloud.scale}>
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={cloudTexture}
            transparent
            opacity={cloud.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color={i % 3 === 0 ? "#C8A96B" : "#ffffff"}
          />
        </mesh>
      ))}
    </group>
  );
}

function VortexParticles() {
  const count = 4000;
  const points = useRef<THREE.Points>(null);

  const [positions, colors, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const phs = new Float32Array(count); 

    const baseColor1 = new THREE.Color('#C8A96B'); // Gold
    const baseColor2 = new THREE.Color('#050A15'); // Deep Dark Blue
    const baseColor3 = new THREE.Color('#ffffff'); // White

    for (let i = 0; i < count; i++) {
        // Tornado distribution
        const y = (Math.random() - 0.5) * 14; 
        const radius = Math.pow(Math.abs(y) / 4, 1.8) + 1.0 + Math.random() * 2.0;
        const angle = Math.random() * Math.PI * 2;

        pos[i * 3] = Math.cos(angle) * radius;
        pos[i * 3 + 1] = y;
        pos[i * 3 + 2] = Math.sin(angle) * radius;

        const mix = Math.random();
        const color = mix > 0.8 ? baseColor1 : mix > 0.5 ? baseColor3 : baseColor1;
        
        cols[i * 3] = color.r;
        cols[i * 3 + 1] = color.g;
        cols[i * 3 + 2] = color.b;
        
        phs[i] = Math.random() * Math.PI * 2;
    }

    return [pos, cols, phs];
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.elapsedTime;
    points.current.rotation.y = time * 0.2; // Global spin
    
    // Animate points to tighten or loosen the vortex
    const pos = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const y = pos[i3 + 1];
      
      const wave = Math.sin(time * 2 + phases[i]) * 0.01;
      pos[i3 + 1] = y + wave;
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;

    // Mouse interactivity for vortex
    points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, globalMouse.x * 3, 0.03);
    points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, globalMouse.y * 3, 0.03);
  });

  const particleMap = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (context) {
      const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        map={particleMap}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function VortexCanvas() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none w-full h-full" style={{ mixBlendMode: 'screen' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
        <fog attach="fog" args={['#000', 5, 20]} />
        <ambientLight intensity={0.5} />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
          <VortexParticles />
          <CloudParticles />
        </Float>
      </Canvas>
    </div>
  );
}
