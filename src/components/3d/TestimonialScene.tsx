"use client";

import { SceneCanvas } from "./SceneCanvas";
import { Carousel3D } from "./Carousel3D";

type CarouselItem = {
  quote: string;
  name: string;
  role: string;
  company: string;
  accent: string;
};

export function TestimonialScene({ items = [] }: { items?: CarouselItem[] }) {
  return (
    <SceneCanvas className="!absolute inset-0" cameraPosition={[0, 0, 8]}>
      <ambientLight intensity={0.9} />
      <pointLight position={[0, 0, 6]} intensity={0.6} color="#ff6b6b" />
      <Carousel3D items={items} radius={4.2} />
    </SceneCanvas>
  );
}
