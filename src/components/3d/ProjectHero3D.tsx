"use client";

import { SafeScene } from "./SafeScene";
import { SceneCanvas } from "./SceneCanvas";
import { ImageFrame3D } from "./ImageFrame3D";
import { TextureBoundary } from "./TextureBoundary";

export function ProjectHero3DInner({ image }: { image?: string }) {
  return (
    <SceneCanvas className="!absolute inset-0" cameraPosition={[0, 0, 5.5]}>
      <ambientLight intensity={0.95} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#ffd93d" />
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#8b5cf6" />
      <TextureBoundary
        fallback={
          <mesh>
            <planeGeometry args={[3, 3.6]} />
            <meshStandardMaterial color="#ff6b6b" roughness={0.5} />
          </mesh>
        }
      >
        <ImageFrame3D image={image ?? ""} position={[0, 0, 0]} size={[3, 3.6]} />
      </TextureBoundary>
    </SceneCanvas>
  );
}

export function ProjectHero3D({ image, title }: { image: string; title: string }) {
  const fallback = (
    <div className="flex h-full items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="max-h-full max-w-full rounded-3xl object-cover shadow-soft"
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
      />
    </div>
  );

  return (
    <SafeScene
      variant="projectHero"
      fallback={fallback}
      mobileFallback={fallback}
      className="h-full w-full"
      sceneProps={{ image }}
    />
  );
}
