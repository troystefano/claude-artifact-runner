import React, { useRef, useCallback, useEffect, useState } from "react";
import { motion, useSpring, useTransform, SpringOptions } from "framer-motion";

/**
 * SpotlightWrapperProps:
 *  - children: content you want to wrap (entire sections, etc.)
 *  - className?: optional string for extra Tailwind classes on the wrapper
 *  - size?: diameter (in px) of the spotlight circle
 *  - springOptions?: optional framer-motion SpringOptions
 */
interface SpotlightWrapperProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
}

/**
 * SpotlightWrapper:
 *  Wrap any JSX content you want to have a spotlight glow. 
 *  The wrapper automatically handles position: relative, overflow: hidden, 
 *  and the glow effect.
 *
 * Usage:
 *  <SpotlightWrapper className="my-section-class" size={100}>
 *    <h2>My Section Title</h2>
 *    <p>This entire section now has a glow effect following the mouse!</p>
 *  </SpotlightWrapper>
 */
export function SpotlightWrapper({
  children,
  className,
  size = 200,
  springOptions = { bounce: 0 },
}: SpotlightWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track hover state
  const [isHovered, setIsHovered] = useState(false);

  // Keep ref to the "real" parent DOM element
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  // Framer Motion hooks
  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);
  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  // Once the wrapper is mounted, ensure its parent has position/overflow set
  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current;
      parent.style.position = "relative";
      parent.style.overflow = "hidden";
      setParentElement(parent);
    }
  }, []);

  // Mouse event logic
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  useEffect(() => {
    if (!parentElement) return;

    parentElement.addEventListener("mousemove", handleMouseMove);
    parentElement.addEventListener("mouseenter", () => setIsHovered(true));
    parentElement.addEventListener("mouseleave", () => setIsHovered(false));

    return () => {
      parentElement.removeEventListener("mousemove", handleMouseMove);
      parentElement.removeEventListener("mouseenter", () => setIsHovered(true));
      parentElement.removeEventListener("mouseleave", () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove]);

  return (
    <div ref={containerRef} className={className}>
      {/* The spotlight glow effect */}
      <motion.div
        className={[
          "pointer-events-none absolute rounded-full",
          "bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)]",
          "blur-xl transition-opacity duration-200",
          // Default gradient colors; override with Tailwind classes if you like
          "from-purple-800 via-purple-600 to-purple-400",
          // Fade in/out
          isHovered ? "opacity-100" : "opacity-0",
        ].join(" ")}
        style={{
          width: size,
          height: size,
          left: spotlightLeft,
          top: spotlightTop,
        }}
      />

      {/* Wrapped content */}
      {children}
    </div>
  );
}
