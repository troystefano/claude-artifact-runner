// src/components/ui/HeroInteract.tsx

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
}

const HeroInteract: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    setIsVisible(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with proper scaling
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Initialize points
    const numPoints = 80;
    const points: Point[] = [];

    for (let i = 0; i < numPoints; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      points.push({
        x,
        y,
        vx: 0,
        vy: 0,
        originalX: x,
        originalY: y
      });
    }
    pointsRef.current = points;

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isActive: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Animation
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.fillStyle = 'rgba(241, 245, 249, 0.9)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update points
      pointsRef.current.forEach(point => {
        if (mouseRef.current.isActive) {
          // Calculate distance from mouse
          const dx = mouseRef.current.x - point.x;
          const dy = mouseRef.current.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 100;

          if (distance < repelRadius) {
            // Repel points from mouse
            const force = (1 - distance / repelRadius) * 0.8;
            point.vx -= (dx / distance) * force;
            point.vy -= (dy / distance) * force;
          }
        }

        // Return to original position
        const returnForce = 0.05;
        point.vx += (point.originalX - point.x) * returnForce;
        point.vy += (point.originalY - point.y) * returnForce;

        // Update position
        point.x += point.vx;
        point.y += point.vy;

        // Apply damping
        point.vx *= 0.95;
        point.vy *= 0.95;
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(51, 65, 85, 0.2)';
      ctx.lineWidth = 0.5;

      const connectionDistance = 100;
      pointsRef.current.forEach((point, i) => {
        pointsRef.current.slice(i + 1).forEach(otherPoint => {
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
      pointsRef.current.forEach((point, i) => {
        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(51, 65, 85, 0.8)';
        ctx.fill();

        // Add glow to some points
        if (i % 3 === 0) {
          const gradient = ctx.createRadialGradient(
            point.x, point.y, 0,
            point.x, point.y, 20
          );
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.1)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 20, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatePresence>
          {isVisible && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-sm"
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
                className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-sm"
              >
                A premier research and resource library uniting Catholic social teaching with artificial intelligence development.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <button className="group px-8 py-4 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-sm">
                  <span>Explore Resources</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 transition-all shadow-sm">
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

export default HeroInteract;