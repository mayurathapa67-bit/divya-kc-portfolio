"use client";

import { SceneCanvas } from "./SceneCanvas";
import { ParticleField } from "./ParticleField";

export function ParticleScene({ count = 300 }: { count?: number }) {
  return (
    <SceneCanvas className="!absolute inset-0" cameraPosition={[0, 0, 6]}>
      <ambientLight intensity={0.9} />
      <ParticleField count={count} />
    </SceneCanvas>
  );
}
