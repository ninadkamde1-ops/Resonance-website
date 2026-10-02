"use client";

import { ReactNode, useRef } from "react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
}

export default function Magnetic({
  children,
  strength = 20,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);

    ref.current.style.transform = `translate(${x / strength}px, ${
      y / strength
    }px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;

    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="transition-transform duration-200 ease-out"
    >
      {children}
    </div>
  );
}