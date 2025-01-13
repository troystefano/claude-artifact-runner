import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  MutableRefObject
} from "react";
import { motion, useSpring, useTransform, SpringOptions } from "framer-motion";

/**
 * SpotlightProps interface:
 * - className?: optional string for custom tailwind classes
 * - size?: diameter (in px) of the spotlight "circle"
 * - springOptions?: optional framer-motion SpringOptions
 */
type SpotlightProps = {
  className?: string;
  size?: number;
  springOptions?: SpringOptions;
};

/**
 * Spotlight component:
 * This component automatically positions a glowing "circle" (radial gradient)
 * that follows the user's mouse pointer inside its parent container.
 *
 * Usage example in any parent component:
 *   <div className="relative overflow-hidden">
 *     <Spotlight />
 *     ... other content ...
 *   </div>
 */
export function Spotlight({
  className,
  size = 200,
  springOptions = {
    bounce: 0,
  },
}: SpotlightProps) {
  // A ref to the motion.div so we can attach event listeners on the parent
  const containerRef = useRef<HTMLDivElement>(null);

  // Track if cursor is inside the parent
  const [isHovered, setIsHovered] = useState(false);

  // Keep reference to parent so we can remove event listeners on cleanup
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  // Framer Motion springs for x and y
  const mouseX = useSpring(0, springOptions);
  const mouseY = useSpring(0, springOptions);

  // Transform these numeric values into CSS strings for left & top
  const spotlightLeft = useTransform(mouseX, (x) => `${x - size / 2}px`);
  const spotlightTop = useTransform(mouseY, (y) => `${y - size / 2}px`);

  /**
   * Once the ref is set, store the parent DOM element
   * and ensure it has "position: relative; overflow: hidden;" so the glow
   * doesn't overflow outside the parent.
   */
  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        parent.style.position = "relative";
        parent.style.overflow = "hidden";
        setParentElement(parent);
      }
    }
  }, []);

  /**
   * Mouse move handler: subtract parent's bounding offset to get local x/y
   */
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!parentElement) return;
      const { left, top } = parentElement.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
    },
    [mouseX, mouseY, parentElement]
  );

  /**
   * Set up and clean up event listeners on the parent container
   */
  useEffect(() => {
    if (!parentElement) return;

    // On mouse move, set spotlight position
    parentElement.addEventListener("mousemove", handleMouseMove);
    // On mouse enter and leave, toggle the isHovered flag
    parentElement.addEventListener("mouseenter", () => setIsHovered(true));
    parentElement.addEventListener("mouseleave", () => setIsHovered(false));

    // Cleanup
    return () => {
      parentElement.removeEventListener("mousemove", handleMouseMove);
      parentElement.removeEventListener("mouseenter", () => setIsHovered(true));
      parentElement.removeEventListener("mouseleave", () => setIsHovered(false));
    };
  }, [parentElement, handleMouseMove]);

  // Return the motion div that visually represents the spotlight
  return (
    <motion.div
      ref={containerRef}
      // Basic styling:
      // - pointer-events-none so it doesn't block clicks
      // - absolute so we can move it around (left/top)
      // - radial gradient background with a "soft glow"
      // - blur, transition on opacity
      className={
        "pointer-events-none absolute rounded-full " +
        "bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops),transparent_80%)] " +
        "blur-xl transition-opacity duration-200 " +
        // from-zinc-50 etc. can be overridden by the className prop
        (isHovered ? "opacity-100" : "opacity-0") +
        (className ? " " + className : "")
      }
      style={{
        width: size,
        height: size,
        left: spotlightLeft,
        top: spotlightTop,
      }}
    />
  );
}
