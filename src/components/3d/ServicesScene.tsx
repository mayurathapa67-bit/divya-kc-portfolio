"use client";

import { SceneCanvas } from "./SceneCanvas";
import { FloatingShapes } from "./FloatingShapes";

export function ServicesSceneInner() {
  return (
    <SceneCanvas className="!absolute inset-0" cameraPosition={[0, 0, 6]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1} color="#ffd93d" />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#8b5cf6" />
      <FloatingShapes count={7} />
    </SceneCanvas>
  );
}
