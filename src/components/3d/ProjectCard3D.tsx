"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Float } from "@react-three/drei";

type ProjectCard3DProps = {
  image: string;
  index?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  float?: boolean;
  accent?: string;
};

export function ProjectCard3D({
  image,
  index = 0,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  float = true,
  accent = "#ff6b6b",
}: ProjectCard3DProps) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  const texture = useTexture(image);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const floatY = float ? Math.sin(t * 0.8 + index) * 0.08 : 0;
    group.current.position.y +=
      (position[1] + floatY - group.current.position.y) * Math.min(1, delta * 3);
    const desiredRotX = rotation[0] + target.current.y * 0.25;
    const desiredRotY = rotation[1] + target.current.x * 0.35;
    group.current.rotation.x +=
      (desiredRotX - group.current.rotation.x) * Math.min(1, delta * 4);
    group.current.rotation.y +=
      (desiredRotY - group.current.rotation.y) * Math.min(1, delta * 4);
  });

  const handleMove = (e: { uv?: THREE.Vector2 }) => {
    if (!e.uv) return;
    target.current.x = e.uv.x - 0.5;
    target.current.y = e.uv.y - 0.5;
  };
  const handleOut = () => {
    target.current.x = 0;
    target.current.y = 0;
  };

  const w = 2.4;
  const h = 3.2;

  const card = (
    <group ref={group} position={position} rotation={rotation}>
      <RoundedBox
        args={[w, h, 0.18]}
        radius={0.12}
        smoothness={4}
        onPointerMove={handleMove as unknown as (e: never) => void}
        onPointerOut={handleOut}
      >
        <meshStandardMaterial color="#ffffff" roughness={0.6} metalness={0.05} />
      </RoundedBox>

      <mesh position={[0, 0.05, 0.1]}>
        <planeGeometry args={[w - 0.3, h - 0.3]} />
        <meshStandardMaterial map={texture} roughness={0.5} />
      </mesh>

      <mesh position={[0, -h / 2 - 0.25, 0.05]}>
        <planeGeometry args={[w - 0.3, 0.4]} />
        <meshBasicMaterial color={accent} transparent opacity={0.9} />
      </mesh>
    </group>
  );

  if (float) {
    return (
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.6}>
        {card}
      </Float>
    );
  }
  return card;
}
