"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type ParticleFieldProps = {
  count?: number;
  color?: string;
  scroll?: React.MutableRefObject<number>;
};

function makePositions(count: number): Float32Array {
  const arr = new Float32Array(count * 3);
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (rand() - 0.5) * 14;
    arr[i * 3 + 1] = (rand() - 0.5) * 10;
    arr[i * 3 + 2] = (rand() - 0.5) * 8 - 2;
  }
  return arr;
}

export function ParticleField({
  count = 600,
  color = "#8b5cf6",
  scroll,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => makePositions(count), [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    points.current.rotation.y = t * 0.02;
    points.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    if (scroll) {
      points.current.position.y = scroll.current * 0.4;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}
