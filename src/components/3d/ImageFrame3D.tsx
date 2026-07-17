"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Float } from "@react-three/drei";

type ImageFrame3DProps = {
  image: string;
  position?: [number, number, number];
  size?: [number, number];
};

export function ImageFrame3D({
  image,
  position = [0, 0, 0],
  size = [2.6, 3.2],
}: ImageFrame3DProps) {
  const group = useRef<THREE.Group>(null);
  const hovered = useRef(false);

  const texture = useTexture(image);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const floatY = Math.sin(t * 0.7) * 0.06;
    group.current.position.y += (position[1] + floatY - group.current.position.y) * Math.min(1, delta * 2);
    const targetRotY = hovered.current ? 0.5 : Math.sin(t * 0.3) * 0.12;
    const targetRotX = hovered.current ? -0.1 : 0;
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * Math.min(1, delta * 4);
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * Math.min(1, delta * 4);
  });

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.5}>
      <group
        ref={group}
        position={position}
        onPointerOver={() => {
          hovered.current = true;
        }}
        onPointerOut={() => {
          hovered.current = false;
        }}
      >
        <RoundedBox args={[size[0] + 0.2, size[1] + 0.2, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0, 0.12]}>
          <planeGeometry args={size} />
          <meshStandardMaterial map={texture} roughness={0.5} />
        </mesh>
      </group>
    </Float>
  );
}
