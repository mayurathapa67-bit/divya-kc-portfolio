"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text } from "@react-three/drei";
import type { Group } from "three";

type CarouselItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  accent: string;
};

type Carousel3DProps = {
  items: CarouselItem[];
  radius?: number;
  autoRotate?: boolean;
  speed?: number;
};

const MAX_LEN = 90;

function wrap(text: string, max: number): string {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max) {
      lines.push(line.trim());
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.join("\n");
}

export function Carousel3D({
  items,
  radius = 4,
  autoRotate = true,
  speed = 0.15,
}: Carousel3DProps) {
  const group = useRef<Group>(null);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    if (autoRotate && !dragging.current) {
      velocity.current += (speed - velocity.current) * 0.02;
    }
    group.current.rotation.y += velocity.current * delta;
  });

  const n = items.length;
  const angleStep = (Math.PI * 2) / n;

  return (
    <group
      ref={group}
      onPointerDown={(e) => {
        dragging.current = true;
        lastX.current = e.clientX ?? 0;
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
      onPointerMove={(e) => {
        if (!dragging.current || !group.current) return;
        const x = e.clientX ?? 0;
        const dx = x - lastX.current;
        lastX.current = x;
        velocity.current = dx * 0.002;
        group.current.rotation.y += dx * 0.002;
      }}
    >
      {items.map((item, i) => {
        const a = angleStep * i;
        const x = Math.sin(a) * radius;
        const z = Math.cos(a) * radius;
        return (
          <Billboard key={i} position={[x, 0, z]}>
            <group rotation={[0, -a, 0]}>
              <mesh position={[0, 0, -0.05]}>
                <planeGeometry args={[2.6, 2.4]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.92} roughness={0.7} />
              </mesh>
              <mesh position={[0, 1.0, 0]}>
                <planeGeometry args={[2.6, 0.12]} />
                <meshBasicMaterial color={item.accent} />
              </mesh>
              <Text
                position={[0, 0.4, 0.02]}
                fontSize={0.16}
                color="#1a1a1a"
                anchorX="center"
                anchorY="middle"
                maxWidth={2.3}
                textAlign="center"
              >
                {`"${wrap(item.quote, MAX_LEN)}"`}
              </Text>
              <Text
                position={[0, -0.7, 0.02]}
                fontSize={0.14}
                color={item.accent}
                anchorX="center"
                anchorY="middle"
              >
                {item.name}
              </Text>
              <Text
                position={[0, -0.92, 0.02]}
                fontSize={0.1}
                color="#666666"
                anchorX="center"
                anchorY="middle"
              >
                {`${item.role}, ${item.company}`}
              </Text>
            </group>
          </Billboard>
        );
      })}
    </group>
  );
}
