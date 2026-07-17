"use client";

import { useState } from "react";

type ImgProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

export function Img({ src, alt, className, style }: ImgProps) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setHidden(true)}
    />
  );
}
