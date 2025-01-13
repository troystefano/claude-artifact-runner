import React, {
  useEffect,
  useRef,
  useState,
  Suspense,
  useCallback
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useSphere } from '@react-three/cannon';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { ChevronRight } from 'lucide-react';
import * as THREE from 'three';

// Node Component with Position Tracking
function Node({ position, isGlowing, onPositionUpdate }) {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position,
    args: [0.1],
    linearDamping: 0.8,
  }));

  const { viewport } = useThree();
  const mousePos = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!ref.current) return;

    // Update mouse position in 3D space
    const x = (state.mouse.x * viewport.width) / 2;
    const y = (state.mouse.y * viewport.height) / 2;
    mousePos.current.set(x, y, 0);

    // Calculate force towards mouse
    const force = mousePos.current.clone().sub(ref.current.position);
    const distance = force.length();
    force.normalize().multiplyScalar(5 / (1 + distance * distance));

    // Apply force
    api.applyForce([force.x, force.y, force.z], [0, 0, 0]);

    // Report position
    if (onPositionUpdate) {
      onPositionUpdate(ref.current.position.clone());
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color={isGlowing ? '#3B82F6' : '#334155'}
        emissive={isGlowing ? '#3B82F6' : '#000000'}
        emissiveIntensity={isGlowing ? 0.5 : 0}
      />
    </mesh>
  );
}

// Optimized Connections Component
function Connections({ positions }) {
  const linesRef = useRef();
  const geometryRef = useRef();

  useFrame(() => {
    if (!positions || positions.length < 2 || !geometryRef.current) return;

    const linePositions = [];
    const maxDistance = 2; // Maximum distance for connection

    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const pos1 = positions[i];
        const pos2 = positions[j];

        if (!pos1 || !pos2) continue;

        const distance = new THREE.Vector3()
          .subVectors(pos1, pos2)
          .length();

        if (distance < maxDistance) {
          linePositions.push(
            pos1.x, pos1.y, pos1.z,
            pos2.x, pos2.y, pos2.z
          );
        }
      }
    }

    const positionArray = new Float32Array(linePositions);
    geometryRef.current.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3)
    );
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={0}
          array={new Float32Array(0)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#94A3B8"
        transparent
        opacity={0.2}
      />
    </lineSegments>
  );
}

// Scene Component with Position Management
function Scene() {
  const [nodePositions, setNodePositions] = useState([]);
  const positionsMap = useRef(new Map());

  const handlePositionUpdate = useCallback((index, position) => {
    positionsMap.current.set(index, position);
    setNodePositions(Array.from(positionsMap.current.values()));
  }, []);

  const nodes = Array.from({ length: 50 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 2
    ],
    isGlowing: i % 3 === 0
  }));

  return (
    <Physics gravity={[0, 0, 0]}>
      {nodes.map((node, i) => (
        <Node
          key={i}
          {...node}
          onPositionUpdate={(pos) => handlePositionUpdate(i, pos)}
        />
      ))}
      <Connections positions={nodePositions} />
    </Physics>
  );
}

// Main Hero Component
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 75 }}
          style={{ background: '#f8fafc' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={0.5} />
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <EffectComposer>
            <Bloom
              intensity={1}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              kernelSize={KernelSize.LARGE}
            />
          </EffectComposer>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <AnimatePresence>
          {isVisible && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm"
              >
                <span className="animate-pulse w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-slate-600">
                  Advancing Ethical AI Development
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-8 text-center"
              >
                Building AI That Serves
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
                  Human Flourishing
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto text-center bg-white/80 backdrop-blur-sm rounded-lg p-4"
              >
                A premier research and resource library uniting Catholic social teaching
                with artificial intelligence development.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
              >
                <button className="group px-8 py-4 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center space-x-2">
                  <span>Explore Resources</span>
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
}