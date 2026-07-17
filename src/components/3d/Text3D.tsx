"use client";

import { Text } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

type Text3DProps = {
  children: string;
  position?: [number, number, number];
  size?: number;
  color?: string;
  float?: boolean;
};

export function Text3D({
  children,
  position = [0, 0, 0],
  size = 1,
  color = "#1a1a1a",
  float = true,
}: Text3DProps) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current || !float) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.06;
  });

  return (
    <group ref={ref} position={position}>
      <Text
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.012}
        outlineColor="#8b5cf6"
        outlineOpacity={0.35}
        maxWidth={8}
        textAlign="center"
      >
        {children}
      </Text>
    </group>
  );
}
