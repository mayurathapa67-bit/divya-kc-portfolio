"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";

type SceneCanvasProps = {
  children: ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  dpr?: [number, number];
  interactive?: boolean;
};

export function SceneCanvas({
  children,
  className = "",
  cameraPosition = [0, 0, 6],
  dpr = [1, 1.8],
  interactive = true,
}: SceneCanvasProps) {
  return (
    <Canvas
      className={className}
      dpr={dpr}
      camera={{ position: cameraPosition, fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      frameloop="always"
      // pointer events only when interactive (mouse parallax)
      onPointerMissed={() => undefined}
      {...(interactive ? {} : { eventSource: undefined })}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
