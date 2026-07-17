"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";

export type SceneVariant =
  | "hero"
  | "particles"
  | "services"
  | "framed"
  | "projectHero"
  | "testimonials";

type SafeSceneProps = {
  variant: SceneVariant;
  fallback: ReactNode;
  className?: string;
  mobileFallback?: ReactNode;
  sceneProps?: Record<string, unknown>;
};

const REGISTRY: Record<
  SceneVariant,
  () => Promise<{ default: ComponentType<Record<string, unknown>> }>
> = {
  hero: () => import("./Hero3DScene").then((m) => ({ default: m.Hero3DScene })),
  particles: () =>
    import("./ParticleScene").then((m) => ({ default: m.ParticleScene })),
  services: () =>
    import("./ServicesScene").then((m) => ({ default: m.ServicesSceneInner })),
  framed: () =>
    import("./FramedScene").then((m) => ({ default: m.FramedScene })),
  projectHero: () =>
    import("./ProjectHero3D").then((m) => ({ default: m.ProjectHero3DInner })),
  testimonials: () =>
    import("./TestimonialScene").then((m) => ({ default: m.TestimonialScene })),
};

function getInitialMobile(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

function getInitialReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SafeScene({
  variant,
  fallback,
  className = "",
  mobileFallback,
  sceneProps,
}: SafeSceneProps) {
  const [Scene, setScene] = useState<ComponentType<Record<string, unknown>> | null>(
    null
  );
  const [isMobile, setIsMobile] = useState<boolean>(getInitialMobile);
  const [reduced, setReduced] = useState<boolean>(getInitialReduced);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 768px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMobile = () => setIsMobile(mqMobile.matches);
    const onReduced = () => setReduced(mqReduced.matches);
    mqMobile.addEventListener("change", onMobile);
    mqReduced.addEventListener("change", onReduced);
    return () => {
      mqMobile.removeEventListener("change", onMobile);
      mqReduced.removeEventListener("change", onReduced);
    };
  }, []);

  useEffect(() => {
    if (isMobile || reduced) return;
    let active = true;
    const Comp = dynamic(REGISTRY[variant], { ssr: false, loading: () => null });
    const id = window.setTimeout(() => {
      if (active) setScene(() => Comp as ComponentType<Record<string, unknown>>);
    }, 0);
    return () => {
      active = false;
      window.clearTimeout(id);
    };
  }, [variant, isMobile, reduced]);

  if (isMobile || reduced) {
    return <div className={className}>{mobileFallback ?? fallback}</div>;
  }

  if (!Scene) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={className}>
      <Scene {...(sceneProps ?? {})} />
    </div>
  );
}
