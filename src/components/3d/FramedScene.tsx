"use client";

import { SceneCanvas } from "./SceneCanvas";
import { ImageFrame3D } from "./ImageFrame3D";
import { TextureBoundary } from "./TextureBoundary";

export function FramedScene({ photos }: { photos?: string[] }) {
  const safe = Array.isArray(photos) ? photos : [];
  const positions: [number, number, number][] = [
    [-1.4, 0.6, 0],
    [1.4, -0.4, 0.5],
    [0, -1.2, -0.5],
  ];
  return (
    <SceneCanvas className="!absolute inset-0" cameraPosition={[0, 0, 6]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1} />
      {safe.slice(0, 3).map((p, i) => (
        <TextureBoundary
          key={i}
          fallback={
            <mesh position={positions[i]}>
              <planeGeometry args={[1.8, 2.2]} />
              <meshStandardMaterial color="#ffd93d" roughness={0.5} />
            </mesh>
          }
        >
          <ImageFrame3D image={p} position={positions[i]} size={[1.8, 2.2]} />
        </TextureBoundary>
      ))}
    </SceneCanvas>
  );
}
