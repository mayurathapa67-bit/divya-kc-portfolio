"use client";

import { useEffect, useRef } from "react";
import { SceneCanvas } from "./SceneCanvas";
import { FloatingShapes } from "./FloatingShapes";
import { ParticleField } from "./ParticleField";
import { Text3D } from "./Text3D";

export function Hero3DScene() {
  const mouse = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onScroll = () => {
      scroll.current = window.scrollY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <SceneCanvas className="!absolute inset-0" cameraPosition={[0, 0, 7]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#ffd93d" />
      <directionalLight position={[-4, -2, 2]} intensity={0.7} color="#8b5cf6" />
      <pointLight position={[0, 0, 5]} intensity={0.6} color="#ff6b6b" />
      <ParticleField scroll={scroll} />
      <FloatingShapes count={10} mouse={mouse} />
      <Text3D position={[0, 2.6, -1]} size={0.5} color="#1a1a1a">
        Creating Digital Magic
      </Text3D>
    </SceneCanvas>
  );
}
