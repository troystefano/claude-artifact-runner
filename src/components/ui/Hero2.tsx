// src/components/ui/Hero.tsx
// -----------------------------------------------------------------------------
// REVAMPED HERO WITHOUT SUSPENSE
// -----------------------------------------------------------------------------
//
// Key Features:
//   1) Node network with @react-three/cannon physics for natural movement.
//   2) Magnetic cursor attraction without clicks.
//   3) Idle-based shape formation (face, globe, scales, etc.).
//   4) Postprocessing bloom for a refined glow.
//   5) Absolutely positioned Canvas behind the text, so it appears as background.
//
// No usage of Suspense or <style jsx={true}>, so the warnings about them
// should disappear. 
// -----------------------------------------------------------------------------

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useSphere } from '@react-three/cannon';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import * as THREE from 'three';
import gsap from 'gsap';
import { ChevronRight } from 'lucide-react';

// ---------------------------- NodeRef & NodeProps -----------------------------------
interface NodeRef {
  applyImpulse: (impulse: [number, number, number]) => void;
  getPosition: () => THREE.Vector3;
}

interface NodeProps {
  index: number;
  initialPosition: [number, number, number];
  initialVelocity: [number, number, number];
  isGlowing: boolean;
}

// ---------------------------- Shapes Definition -------------------------------------
const FACE_SHAPE = [
  new THREE.Vector3(-1.8, 2.0, 0),
  new THREE.Vector3(-1.4, 1.4, 0),
  new THREE.Vector3(-1.8, 0.6, 0),
  new THREE.Vector3(-1.7, -0.2, 0),
  new THREE.Vector3(-1.0, -1.2, 0),
  new THREE.Vector3(0, -1.7, 0),
  new THREE.Vector3(1.0, -1.2, 0),
  new THREE.Vector3(1.7, -0.2, 0),
  new THREE.Vector3(1.8, 0.6, 0),
  new THREE.Vector3(1.4, 1.4, 0),
  new THREE.Vector3(1.8, 2.0, 0),
  new THREE.Vector3(0, 1.2, 0),
  new THREE.Vector3(-0.5, 0.8, 0),
  new THREE.Vector3(0.5, 0.8, 0),
];

const GLOBE_SHAPE = [
  new THREE.Vector3(0, 2.4, 0),
  new THREE.Vector3(-1.5, 2.0, 0),
  new THREE.Vector3(-2.0, 1.2, 0),
  new THREE.Vector3(-2.3, 0, 0),
  new THREE.Vector3(-2.0, -1.2, 0),
  new THREE.Vector3(-1.5, -2.0, 0),
  new THREE.Vector3(0, -2.4, 0),
  new THREE.Vector3(1.5, -2.0, 0),
  new THREE.Vector3(2.0, -1.2, 0),
  new THREE.Vector3(2.3, 0, 0),
  new THREE.Vector3(2.0, 1.2, 0),
  new THREE.Vector3(1.5, 2.0, 0),
];

const BULB_SHAPE = [
  new THREE.Vector3(0, 2.3, 0),
  new THREE.Vector3(-1.0, 1.5, 0),
  new THREE.Vector3(-1.3, 0.5, 0),
  new THREE.Vector3(-1.0, -0.2, 0),
  new THREE.Vector3(1.0, -0.2, 0),
  new THREE.Vector3(1.3, 0.5, 0),
  new THREE.Vector3(1.0, 1.5, 0),
  new THREE.Vector3(0, 2.3, 0),
  // Bulb bottom base
  new THREE.Vector3(-0.5, -1.0, 0),
  new THREE.Vector3(0.5, -1.0, 0),
  new THREE.Vector3(0.3, -1.5, 0),
  new THREE.Vector3(-0.3, -1.5, 0),
];

const SCALES_SHAPE = [
  new THREE.Vector3(-2, 1, 0),
  new THREE.Vector3(2, 1, 0),
  // left plate
  new THREE.Vector3(-2, 1, 0),
  new THREE.Vector3(-2.5, -0.5, 0),
  new THREE.Vector3(-1.5, -0.5, 0),
  new THREE.Vector3(-2, 1, 0),
  // right plate
  new THREE.Vector3(2, 1, 0),
  new THREE.Vector3(1.5, -0.5, 0),
  new THREE.Vector3(2.5, -0.5, 0),
  new THREE.Vector3(2, 1, 0),
  // center vertical
  new THREE.Vector3(0, 1.5, 0),
  new THREE.Vector3(0, -1.0, 0),
];

const FAMILY_SHAPE = [
  new THREE.Vector3(-2, 0, 0),
  new THREE.Vector3(-1.5, 1, 0),
  new THREE.Vector3(-1.0, 1.8, 0),
  new THREE.Vector3(-0.5, 1, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.5, 1, 0),
  new THREE.Vector3(1.0, 1.8, 0),
  new THREE.Vector3(1.5, 1, 0),
  new THREE.Vector3(2, 0, 0),
  new THREE.Vector3(-0.4, -0.7, 0),
  new THREE.Vector3(0, -1.2, 0),
  new THREE.Vector3(0.4, -0.7, 0),
];

const HANDSHAKE_SHAPE = [
  new THREE.Vector3(-2, 0.5, 0),
  new THREE.Vector3(-1.5, 0, 0),
  new THREE.Vector3(-1, -0.3, 0),
  new THREE.Vector3(-0.5, -0.2, 0),
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0.5, -0.2, 0),
  new THREE.Vector3(1, -0.3, 0),
  new THREE.Vector3(1.5, 0, 0),
  new THREE.Vector3(2, 0.5, 0),
  new THREE.Vector3(0, 0.2, 0),
  new THREE.Vector3(-0.2, 0.3, 0),
  new THREE.Vector3(0.2, 0.3, 0),
];

const ALL_SHAPES = [
  FACE_SHAPE,
  GLOBE_SHAPE,
  BULB_SHAPE,
  SCALES_SHAPE,
  FAMILY_SHAPE,
  HANDSHAKE_SHAPE,
];

// ---------------------------- Node (forwardRef) --------------------------------------
const Node = forwardRef<NodeRef, NodeProps>((props, ref) => {
  const { index, initialPosition, initialVelocity, isGlowing } = props;
  const [sphereRef, api] = useSphere(() => ({
    mass: 1,
    position: initialPosition,
    velocity: initialVelocity,
    args: [0.2],
    linearDamping: 0.5,
    angularDamping: 0.5,
    allowSleep: true,
  }));

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    applyImpulse(impulse: [number, number, number]) {
      api.applyImpulse(impulse, [0, 0, 0]);
    },
    getPosition() {
      let posVal = new THREE.Vector3();
      api.position.subscribe((pos) => {
        posVal.set(pos[0], pos[1], pos[2]);
      })();
      return posVal;
    },
  }));

  return (
    <mesh ref={sphereRef} castShadow receiveShadow>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color={isGlowing ? '#3B82F6' : '#334155'}
        emissive={isGlowing ? new THREE.Color('#3B82F6') : new THREE.Color('#000000')}
        emissiveIntensity={isGlowing ? 0.4 : 0}
      />
    </mesh>
  );
});
Node.displayName = 'Node';

// ---------------------------- Connections --------------------------------------------
function Connections({
  nodeRefs,
  maxDistance = 2.2,
}: {
  nodeRefs: React.RefObject<NodeRef>[];
  maxDistance?: number;
}) {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  useFrame(() => {
    if (!geometryRef.current) return;
    const positions: number[] = [];

    for (let i = 0; i < nodeRefs.length; i++) {
      const nodeA = nodeRefs[i].current;
      if (!nodeA) continue;
      const posA = nodeA.getPosition();
      for (let j = i + 1; j < nodeRefs.length; j++) {
        const nodeB = nodeRefs[j].current;
        if (!nodeB) continue;
        const posB = nodeB.getPosition();
        const dist = posA.distanceTo(posB);
        if (dist < maxDistance) {
          positions.push(
            posA.x, posA.y, posA.z,
            posB.x, posB.y, posB.z
          );
        }
      }
    }

    const linePositions = new Float32Array(positions);
    geometryRef.current.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3)
    );
    geometryRef.current.setDrawRange(0, positions.length / 3);
  });

  return (
    <lineSegments>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial color="#94a3b8" transparent opacity={0.3} />
    </lineSegments>
  );
}

// ---------------------------- HeroScene ---------------------------------------------
function HeroScene({
  shapeIndex,
  nodeCount = 80,
  idleTime = 2000,
}: {
  shapeIndex: number;
  nodeCount?: number;
  idleTime?: number;
}) {
  // Refs for each node
  const nodeRefs = Array.from({ length: nodeCount }, () => useRef<NodeRef>(null));

  // Node initial data
  const [initialData] = useState(() => {
    const arr: NodeProps[] = [];
    for (let i = 0; i < nodeCount; i++) {
      arr.push({
        index: i,
        initialPosition: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 2,
        ],
        initialVelocity: [
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.5,
        ],
        isGlowing: i % 3 === 0,
      });
    }
    return arr;
  });

  // Track mouse
  const { size, camera } = useThree();
  const [mousePos, setMousePos] = useState(new THREE.Vector3());
  const lastMoveRef = useRef(Date.now());
  const [isIdle, setIsIdle] = useState(false);

  // Move logic
  const handlePointerMove = useCallback((e: PointerEvent) => {
    lastMoveRef.current = Date.now();
    setIsIdle(false);
    const x = (e.clientX / size.width) * 2 - 1;
    const y = -(e.clientY / size.height) * 2 + 1;
    const vec = new THREE.Vector3(x, y, 0).unproject(camera);
    setMousePos(vec);
  }, [camera, size]);

  // Listen pointer
  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    const timer = setInterval(() => {
      if (Date.now() - lastMoveRef.current >= idleTime) {
        setIsIdle(true);
      }
    }, 500);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      clearInterval(timer);
    };
  }, [handlePointerMove, idleTime]);

  // Frame updates
  useFrame(() => {
    const shapeData = ALL_SHAPES[shapeIndex % ALL_SHAPES.length] || [];
    nodeRefs.forEach((nodeRef, i) => {
      const node = nodeRef.current;
      if (!node) return;
      const currentPos = node.getPosition();

      if (!isIdle) {
        // Attract to mouse
        const dir = new THREE.Vector3().subVectors(mousePos, currentPos);
        const dist = dir.length() + 0.1;
        dir.normalize();
        const forceMag = 2 / dist;
        node.applyImpulse([dir.x * forceMag, dir.y * forceMag, dir.z * forceMag]);
      } else {
        // Move to shape
        if (shapeData.length > 0) {
          const shapePoint = shapeData[i % shapeData.length].clone().multiplyScalar(2.0);
          const dir = shapePoint.sub(currentPos);
          const dist = dir.length() + 0.1;
          dir.normalize();
          const shapeForce = 2.5 / dist;
          node.applyImpulse([dir.x * shapeForce, dir.y * shapeForce, dir.z * shapeForce]);
        }
      }
    });
  });

  return (
    <>
      <Physics gravity={[0, 0, 0]}>
        {initialData.map((nodeData, i) => (
          <Node
            key={i}
            {...nodeData}
            ref={nodeRefs[i]}
          />
        ))}
      </Physics>
      <Connections nodeRefs={nodeRefs} maxDistance={2.3} />
    </>
  );
}

// ---------------------------- Hero Component ----------------------------------------
const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shapeIndex, setShapeIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setShapeIndex((prev) => prev + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 3D BACKGROUND */}
      <Canvas
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0, pointerEvents: 'none' }}
        camera={{ position: [0, 0, 10], fov: 70 }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <HeroScene nodeCount={100} shapeIndex={shapeIndex} idleTime={2000} />

        {/* Bloom for glow */}
        <EffectComposer>
          <Bloom
            kernelSize={KernelSize.LARGE}
            luminanceThreshold={0.2}
            luminanceSaturation={1}
            intensity={1.2}
          />
        </EffectComposer>

        {/* Controls disabled for no dragging */}
        <OrbitControls enableZoom={false} enableRotate={false} enablePan={false} />
      </Canvas>

      {/* TEXT OVERLAY */}
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
                <span className="text-sm text-slate-600">
                  Advancing Ethical AI Development
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-8 text-slate-900"
              >
                Building AI That Serves
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 animate-gradient bg-300%">
                  Human Flourishing
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-4"
              >
                A premier research and resource library uniting Catholic social teaching
                with artificial intelligence development.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
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
};

export default Hero;
