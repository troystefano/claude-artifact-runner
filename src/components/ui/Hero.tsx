// src/components/ui/Hero.tsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

const Hero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Neural network simulation
    const points: Point[] = [];
    const numPoints = 80;
    const connectionDistance = 150;
    const pointSize = 2;

    // Initialize points
    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }

    // Animation function
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.fillStyle = 'rgba(241, 245, 249, 0.9)'; // Slate-50 with opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update points
      points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Keep points in bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)'; // Slate-700 with opacity
      ctx.lineWidth = 0.5;

      points.forEach((point, i) => {
        points.forEach((otherPoint, j) => {
          if (i === j) return;

          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(51, 65, 85, ${opacity})`;
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      // Draw points
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, pointSize, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(51, 65, 85, 0.8)'; // Slate-700 with high opacity
        ctx.fill();
      });

      // Add subtle glow effect to some points
      points.forEach((point, i) => {
        if (i % 3 === 0) { // Only add glow to every third point
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, 20
          );
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)'); // Blue-500 with low opacity
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Neural Network Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.8 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence>
          {isVisible && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200"
              >
                <span className="animate-pulse w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600">Advancing Ethical AI Development</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-8 text-slate-900"
              >
                Building AI That Serves
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 animate-gradient bg-300% mb-12 leading-tight">
                  Human Flourishing
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-4"
              >
              A premier research and resource library dedicated to advancing ethical AI leadership and AI systems that promote human flourishing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
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

export default Hero;