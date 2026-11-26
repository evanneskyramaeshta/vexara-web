"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function createExtrudedPart(points: [number, number][], depth = 0.14) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], index) => {
    // Normalisasi koordinat dari grid 100x100 ke pusat 3D (-1.5 s/d +1.5)
    const nx = (x - 50) * 0.032;
    const ny = (50 - y) * 0.032;
    if (index === 0) shape.moveTo(nx, ny);
    else shape.lineTo(nx, ny);
  });
  shape.closePath();

  return new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.015,
    bevelSegments: 2,
  });
}

function VexaraSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const ringOuterRef = useRef<THREE.Mesh>(null);

  const geometries = useMemo(() => {
    return {
      leftWing: createExtrudedPart([
        [14, 20],
        [16.5, 45],
        [31, 61],
      ]),
      rightWing: createExtrudedPart([
        [86, 20],
        [83.5, 45],
        [69, 61],
      ]),
      leftMain: createExtrudedPart([
        [14, 15],
        [39, 26],
        [45, 39],
        [41, 56],
        [50, 75],
        [50, 92],
      ]),
      rightMain: createExtrudedPart([
        [86, 15],
        [61, 26],
        [55, 39],
        [59, 56],
        [50, 75],
        [50, 92],
      ]),
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetX = (state.pointer.y * Math.PI) / 10;
      const targetY = (state.pointer.x * Math.PI) / 6;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetX,
        0.06
      );
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetY,
        0.06
      );
    }

    if (ringOuterRef.current) {
      ringOuterRef.current.rotation.z += delta * 0.16;
      ringOuterRef.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.45}>
        <group position={[0, 0.1, -0.07]}>
          {/* Sayap Kiri & Utama Kiri (Misty Gray) */}
          <mesh geometry={geometries.leftWing}>
            <meshStandardMaterial color="#8E96A0" metalness={0.75} roughness={0.28} />
          </mesh>
          <mesh geometry={geometries.leftMain}>
            <meshStandardMaterial color="#9CA3AF" metalness={0.78} roughness={0.25} />
          </mesh>

          {/* Sayap Kanan & Utama Kanan (Silver Mist) */}
          <mesh geometry={geometries.rightWing}>
            <meshStandardMaterial color="#D1D5DB" metalness={0.82} roughness={0.22} />
          </mesh>
          <mesh geometry={geometries.rightMain}>
            <meshStandardMaterial color="#E5E7EB" metalness={0.85} roughness={0.2} />
          </mesh>

          {/* Jarum & Lubang Mata Pena di Tengah */}
          <mesh position={[0, -0.45, 0.08]}>
            <cylinderGeometry args={[0.02, 0.02, 0.62, 16]} />
            <meshStandardMaterial color="#E5E7EB" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0, -0.14, 0.08]}>
            <sphereGeometry args={[0.075, 24, 24]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.9} roughness={0.15} />
          </mesh>
        </group>

        {/* Cincin Orbit Tipis */}
        <mesh ref={ringOuterRef}>
          <torusGeometry args={[1.95, 0.01, 16, 100]} />
          <meshStandardMaterial color="#4B5563" metalness={0.8} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

export default function VexaraCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={1.8} color="#FFFFFF" />
      <directionalLight position={[-5, -4, -3]} intensity={0.8} color="#9CA3AF" />
      <Environment preset="city" />
      <VexaraSculpture />
    </Canvas>
  );
}