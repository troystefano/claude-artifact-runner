// src/components/ui/hero-typing.tsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Typed from 'typed.js';

/**
 * Describes the "points" used in the neural network background animation.
 */
interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

/**
 * HeroTyping Component
 * --------------------
 * 1) Renders a <canvas> with a "neural network" style animation.
 * 2) Typing effect for two lines of text.
 * 3) Remaining elements (header badge, description, buttons) fade in
 *    after the typing completes.
 */
const HeroTyping: React.FC = () => {
  // We keep refs for the canvas (for drawing) and the typed text (for the heading).
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const el = useRef<HTMLSpanElement>(null);

  // We store the Typed.js instance so we can clean it up when the component unmounts.
  const typed = useRef<Typed | null>(null);

  // Controls whether the typed heading text is shown, and
  // whether the other elements fade in after typing finishes.
  const [showTyped, setShowTyped] = useState(false);
  const [showElements, setShowElements] = useState(false);

  /**
   * useEffect: runs once on mount to
   * 1) Start the typed text,
   * 2) Initialize the canvas animation.
   */
  useEffect(() => {
    // Display the typed heading:
    setShowTyped(true);

    // ============= 1) Initialize Typed.js =============
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings: [
          // Two lines to type (with a <br> on the second for an explicit line break):
          'The Artificial Intelligence Research and Ethics Network (AIREN)',
          '^1000Building AI That Serves<br> Human Flourishing', // Added delay before starting the second line
        ],
        typeSpeed: 50,
        startDelay: 10,
        backSpeed: 50,
        smartBackspace: true,
        loop: false,
        backDelay: 500, // Delay before erasing the first line
        onComplete: () => {
          // Once typing finishes, fade in the other elements:
          setTimeout(() => { // Added delay before showing other elements
            setShowElements(true);
          }, 500);
        },
      });
    }

    // ============= 2) Neural Network Canvas Animation =============
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fit canvas to the window size:
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Create random points for the "network" effect:
    const points: Point[] = [];
    const numPoints = 80;
    const connectionDistance = 150;
    const pointSize = 2;

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
      });
    }

    /**
     * animate():
     * - Clears the canvas each frame,
     * - Moves points and bounces them off edges,
     * - Draws connecting lines for points within a threshold distance,
     * - Adds glow effects on every 3rd point.
     */
    const animate = () => {
      if (!ctx || !canvas) return;

      // Slightly opaque background fill to create a trailing effect:
      ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Move each point and bounce off edges:
      points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));
      });

      // Draw lines between points if close enough:
      ctx.lineWidth = 0.5;
      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i === j) return;
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(51, 65, 85, ${opacity})`;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });

        // Draw each point as a small circle:
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(51, 65, 85, 0.8)';
        ctx.fill();

        // Glow effect on every 3rd point:
        if (i % 3 === 0) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            point.x,
            point.y,
            0,
            point.x,
            point.y,
            20
          );
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Request next animation frame:
      requestAnimationFrame(animate);
    };

    // Start the animation loop:
    animate();

    // Cleanup when unmounted:
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      typed.current?.destroy();
    };
  }, []);

  // ================== RENDER ==================
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Canvas for the background animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: '0.8' }}
      />

      {/* Foreground content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Typed Heading (shows immediately) */}
        {showTyped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-slate-900"
          >
            {/* 
              If text doesn't appear, try replacing
              text-transparent bg-clip-text ...
              with a plain text color like `text-slate-900`.
            */}
            <span
              ref={el}
              className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900"
            />
          </motion.div>
        )}

        {/* After the heading finishes typing, show these elements */}
        <AnimatePresence>
          {showElements && (
            <>
              {/* Small header badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200"
              >
                <span className="animate-pulse w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600">
                  Advancing Ethical AI Development
                </span>
              </motion.div>

              {/* Description text box */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-4"
              >
                A premier research and resource library dedicated to advancing 
                ethical AI leadership and AI systems that promote human flourishing.
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <button className="group px-8 py-4 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center space-x-2">
                  <span>Join Waitlist</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button className="px-8 py-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 transition-all">
                  Learn More
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroTyping;
