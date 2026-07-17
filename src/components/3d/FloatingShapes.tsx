"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Torus, Icosahedron } from "@react-three/drei";
import type { Group, Mesh } from "three";
import type { ThreeElements } from "@react-three/fiber";

type FloatingShapesProps = {
  count?: number;
  mouse?: React.MutableRefObject<{ x: number; y: number }>;
};

const PALETTE = ["#ff6b6b", "#ffd93d", "#8b5cf6", "#6bcb77"];

function Shape({ index, mouse }: { index: number; mouse?: FloatingShapesProps["mouse"] }) {
  const ref = useRef<Group>(null);
  const meshRef = useRef<Mesh>(null);
  const color = PALETTE[index % PALETTE.length];
  const kind = index % 3;
  const posX = (index % 4) * 1.6 - 2.4;
  const posY = ((index * 1.3) % 4) - 1.5;
  const posZ = -((index % 3) * 1.2) - 0.5;
  const scale = 0.35 + (index % 3) * 0.18;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.15 + index;
    ref.current.rotation.y = t * 0.2 + index;
    if (mouse && meshRef.current) {
      meshRef.current.position.x +=
        (mouse.current.x * (0.4 + index * 0.05) - meshRef.current.position.x) * 0.04;
      meshRef.current.position.y +=
        (mouse.current.y * (0.4 + index * 0.05) - meshRef.current.position.y) * 0.04;
    }
  });

  const floatProps = {
    speed: 1.2 + index * 0.1,
    rotationIntensity: 0.6,
    floatIntensity: 1.2,
  } as const;

  return (
    <Float {...floatProps}>
      <group ref={ref} position={[posX, posY, posZ]}>
        <RoundedBox
          ref={meshRef as unknown as React.RefObject<Mesh>}
          args={[scale, scale, scale]}
          radius={0.08}
          smoothness={4}
          visible={kind === 0}
        >
          <meshStandardMaterial
            color={color}
            roughness={0.35}
            metalness={0.15}
            transparent
            opacity={0.85}
          />
        </RoundedBox>

        <mesh visible={kind === 1} scale={scale}>
          <Torus args={[scale * 0.6, scale * 0.22, 16, 48]} ref={meshRef}>
            <meshStandardMaterial
              color={color}
              roughness={0.3}
              metalness={0.2}
              transparent
              opacity={0.85}
            />
          </Torus>
        </mesh>

        <mesh visible={kind === 2} scale={scale}>
          <Icosahedron args={[scale * 0.7, 0]} ref={meshRef}>
            <meshStandardMaterial
              color={color}
              roughness={0.4}
              metalness={0.1}
              transparent
              opacity={0.85}
              flatShading
            />
          </Icosahedron>
        </mesh>
      </group>
    </Float>
  );
}

export function FloatingShapes({ count = 9, mouse }: FloatingShapesProps) {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => (
        <Shape key={i} index={i} mouse={mouse} />
      ))}
    </group>
  );
}

export type { ThreeElements };
