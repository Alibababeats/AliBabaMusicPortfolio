"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

export default function FancyHeadphones3D({ scrollSpring }: { scrollSpring: any }) {
  return (
    <div style={{ width: "100%", height: "900px", position: "relative", zIndex: 10 }}>
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, -1, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.25} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#9b5de5" />
        <pointLight position={[10, -10, -10]} intensity={1} color="#22d3ee" />

        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
            <HeadphonesModel scrollSpring={scrollSpring} />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -5, 0]} opacity={0.6} scale={20} blur={2.5} far={6} color="#000000" />
        {/* Environment preset provides reflections for metallic/glass materials */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function HeadphonesModel({ scrollSpring }: { scrollSpring: any }) {
  const leftCupRef = useRef<THREE.Group>(null);
  const rightCupRef = useRef<THREE.Group>(null);
  const bandRef = useRef<THREE.Group>(null);
  const leftPadRef = useRef<THREE.Mesh>(null);
  const rightPadRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // Scroll progress as a scalar value (0 to 1)
    const p = scrollSpring?.get() || 0; 
    
    // Smooth explosion transformation
    if (leftCupRef.current) {
      leftCupRef.current.position.x = -2.6 - p * 3;
      leftCupRef.current.position.y = -p * 1.5;
      leftCupRef.current.rotation.y = p * 0.8;
      leftCupRef.current.rotation.z = p * 0.3;
    }
    
    if (rightCupRef.current) {
      rightCupRef.current.position.x = 2.6 + p * 3;
      rightCupRef.current.position.y = -p * 1.5;
      rightCupRef.current.rotation.y = -p * 0.8;
      rightCupRef.current.rotation.z = -p * 0.3;
    }

    if (bandRef.current) {
      bandRef.current.position.y = p * 3;
      bandRef.current.rotation.x = p * 0.4;
    }
    
    if (groupRef.current) {
      // scroll pulls entire model down slowly
      groupRef.current.position.y = -p * 5;
    }
  });

  // Material optimization setup for maximum realism
  const materials = useMemo(() => {
    return {
      metal: new THREE.MeshStandardMaterial({
        color: "#333",
        metalness: 0.8,
        roughness: 0.3,
      }),
      darkMetal: new THREE.MeshStandardMaterial({
        color: "#111",
        metalness: 1.0,
        roughness: 0.5,
      }),
      pad: new THREE.MeshStandardMaterial({
        color: "#0a0a0a",
        roughness: 0.9,
        metalness: 0.1,
      }),
      glassLeft: new THREE.MeshPhysicalMaterial({
        color: "#9b5de5",
        emissive: "#3b1158",
        emissiveIntensity: 0.6,
        roughness: 0.05,
        transmission: 1, // Glass-like transparency
        thickness: 0.8,
        clearcoat: 1,
      }),
      glassRight: new THREE.MeshPhysicalMaterial({
        color: "#22d3ee",
        emissive: "#084152",
        emissiveIntensity: 0.6,
        roughness: 0.05,
        transmission: 1, // Glass-like transparency
        thickness: 0.8,
        clearcoat: 1,
      }),
      driverLeft: new THREE.MeshStandardMaterial({
        color: "#d8b4fe",
        emissive: "#9b5de5",
        emissiveIntensity: 1,
        roughness: 0.4,
      }),
      driverRight: new THREE.MeshStandardMaterial({
        color: "#a5f3fc",
        emissive: "#22d3ee",
        emissiveIntensity: 1,
        roughness: 0.4,
      })
    }
  }, []);

  return (
    <group ref={groupRef}>
      {/* Headband Group */}
      <group ref={bandRef}>
        {/* Soft Pad */}
        <mesh position={[0, 2.6, 0]}>
          <torusGeometry args={[2.5, 0.4, 32, 100, Math.PI]} />
          <primitive object={materials.pad} attach="material" />
        </mesh>
        {/* Metal inner core */}
        <mesh position={[0, 2.55, 0]}>
          <torusGeometry args={[2.6, 0.15, 16, 100, Math.PI]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
        
        {/* Arms descending to earcups */}
        <mesh position={[-2.6, 1.5, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 2.2, 16]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
        <mesh position={[2.6, 1.5, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 2.2, 16]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
      </group>

      {/* Left Cup Group */}
      <group position={[-2.6, 0, 0]} ref={leftCupRef}>
        {/* Yoke hinge */}
        <mesh position={[-0.2, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <primitive object={materials.darkMetal} attach="material" />
        </mesh>

        {/* Outer shell (Purple Glass / Accent) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.6, 0.6, 64]} />
          <primitive object={materials.glassLeft} attach="material" />
        </mesh>
        
        {/* Inner housing */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.4, 64]} />
          <primitive object={materials.darkMetal} attach="material" />
        </mesh>

        {/* Ear pad */}
        <mesh ref={leftPadRef} rotation={[0, 0, Math.PI / 2]} position={[0.6, 0, 0]}>
          <torusGeometry args={[1.2, 0.4, 32, 64]} />
          <primitive object={materials.pad} attach="material" />
        </mesh>
        
        {/* Center driver visible inside */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
          <primitive object={materials.driverLeft} attach="material" />
        </mesh>
      </group>

      {/* Right Cup Group */}
      <group position={[2.6, 0, 0]} ref={rightCupRef}>
        {/* Yoke hinge */}
        <mesh position={[0.2, 0, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <primitive object={materials.darkMetal} attach="material" />
        </mesh>

        {/* Outer shell (Cyan Glass / Accent) */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.6, 1.5, 0.6, 64]} />
          <primitive object={materials.glassRight} attach="material" />
        </mesh>

        {/* Inner housing */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.2, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.4, 64]} />
          <primitive object={materials.darkMetal} attach="material" />
        </mesh>

        {/* Ear pad */}
        <mesh ref={rightPadRef} rotation={[0, 0, Math.PI / 2]} position={[-0.6, 0, 0]}>
          <torusGeometry args={[1.2, 0.4, 32, 64]} />
          <primitive object={materials.pad} attach="material" />
        </mesh>
        
        {/* Center driver visible inside */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.5, 0, 0]}>
          <cylinderGeometry args={[0.9, 0.9, 0.1, 32]} />
          <primitive object={materials.driverRight} attach="material" />
        </mesh>
      </group>
    </group>
  );
}
