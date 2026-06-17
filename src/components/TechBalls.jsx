import { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TECH_BALLS } from "../constants";

function TechBall({ tech, position, delay }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.25;
    meshRef.current.rotation.y += 0.008;
  });

  return (
    <group ref={meshRef} position={position}>
      <Sphere
        args={[0.55, 32, 32]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <MeshDistortMaterial
          color={tech.color}
          distort={hovered ? 0.5 : 0.25}
          speed={hovered ? 4 : 1.5}
          roughness={0}
          metalness={0.9}
          transparent
          opacity={0.88}
        />
      </Sphere>
      <Html center distanceFactor={6} style={{ pointerEvents: "none", userSelect: "none" }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: "2px",
        }}>
          <span style={{ fontSize: "18px", lineHeight: 1 }}>{tech.symbol}</span>
          <span style={{
            color: "#fff", fontSize: "9px", fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600, letterSpacing: "0.05em",
            textShadow: `0 0 8px ${tech.color}`,
            whiteSpace: "nowrap",
          }}>{tech.name}</span>
        </div>
      </Html>
    </group>
  );
}

function Scene() {
  const cols = 4;
  const rows = 3;
  const spacing = 2.2;

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fb923c" />
      <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#f472b6" />
      <pointLight position={[0, 0, 4]} intensity={0.8} color="#fff" />

      {TECH_BALLS.map((tech, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = (col - (cols - 1) / 2) * spacing;
        const y = ((rows - 1) / 2 - row) * 1.8;
        return (
          <Float key={tech.name} floatIntensity={0.3} rotationIntensity={0.2} speed={1.5}>
            <TechBall
              tech={tech}
              position={[x, y, 0]}
              delay={i * 0.5}
            />
          </Float>
        );
      })}
    </>
  );
}

export default function TechBalls() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section style={{ padding: "6rem 2rem", position: "relative" }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(251,146,60,0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: "#fb923c", fontSize: "0.85rem",
            letterSpacing: "0.15em", textTransform: "uppercase",
            marginBottom: "0.75rem",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem",
          }}>
            <span style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, transparent, #fb923c)", display: "inline-block" }} />
            Technologies
            <span style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #f472b6, transparent)", display: "inline-block" }} />
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 700, letterSpacing: "-0.03em", color: "#e2e8f0",
          }}>
            My{" "}
            <span style={{
              background: "linear-gradient(135deg, #fb923c, #f472b6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Arsenal
            </span>
          </h2>
          <p style={{
            color: "rgba(226,232,240,0.45)", fontFamily: "'Inter', sans-serif",
            fontSize: "0.9rem", marginTop: "0.5rem",
          }}>
            Hover over the spheres
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ height: "520px", borderRadius: "24px", overflow: "hidden",
            border: "1px solid rgba(251,146,60,0.12)",
            background: "rgba(255,255,255,0.015)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}
