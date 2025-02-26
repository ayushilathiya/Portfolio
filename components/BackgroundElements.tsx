"use client";

import { useState, useEffect } from "react";

export function BackgroundElements() {
  const [floatingElements, setFloatingElements] = useState<
    Array<{
      width: number;
      height: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>
  >([]);

  useEffect(() => {
    setFloatingElements(
      Array.from({ length: 20 }, () => ({
        width: Math.random() * 250 + 50,
        height: Math.random() * 250 + 50,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-pattern"></div>
      <div className="absolute w-full h-full">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="navy-circle"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.delay}s`,
              animationDuration: `${element.duration}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
