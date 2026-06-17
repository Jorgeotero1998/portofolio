import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { CERTS } from "../constants";

function GlobeShape() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <Sphere ref={ref} args={[1.4, 64, 64]}>
        <MeshDistortMaterial color="#06010f" distort={0.25} speed={1.5} roughness={0} metalness={1} />
      </Sphere>
      <Sphere args={[1.42, 32, 32]}>
        <meshStandardMaterial color="#fb923c" wireframe transparent opacity={0.15} />
      </Sphere>
      <Sphere args={[1.6, 16, 16]}>
        <meshStandardMaterial color="#f472b6" wireframe transparent opacity={0.06} />
      </Sphere>
    </Float>
  );
}

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <>
      <section style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} style={{ marginBottom: "2.5rem" }}>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#fb923c", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #fb923c, #f472b6)", display: "inline-block" }} />
            Certifications
          </p>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#e2e8f0" }}>
            Cloud &{" "}<span style={{ background: "linear-gradient(135deg, #fb923c, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Security</span>
          </h2>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {CERTS.map((c, i) => (
            <motion.div key={c.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} whileHover={{ borderColor: `${c.color}50`, x: 4 }}
              style={{ display: "flex", alignItems: "center", gap: "1rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "1rem 1.25rem", transition: "all 0.2s" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: c.color, boxShadow: `0 0 10px ${c.color}`, flexShrink: 0 }} />
              <div>
                <p style={{ color: "#e2e8f0", fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 500 }}>{c.name}</p>
                <p style={{ color: "rgba(226,232,240,0.4)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", marginTop: "2px" }}>{c.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: "7rem 2rem 5rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "4rem", flexWrap: "wrap", justifyContent: "center" }}>
          <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} style={{ width: "280px", height: "280px", flexShrink: 0 }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={1} color="#fb923c" />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#f472b6" />
              <Suspense fallback={null}><GlobeShape /></Suspense>
            </Canvas>
          </motion.div>

          <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
            style={{ flex: "1 1 360px", maxWidth: "500px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: "24px", padding: "3rem 2.5rem", backdropFilter: "blur(20px)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, #fb923c, #f472b6, transparent)" }} />
            <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#fb923c", fontSize: "0.82rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ width: "20px", height: "1px", background: "linear-gradient(90deg, #fb923c, #f472b6)", display: "inline-block" }} />
              Let's work together
            </p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#e2e8f0", marginBottom: "1rem" }}>
              Get in{" "}<span style={{ background: "linear-gradient(135deg, #fb923c, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Touch</span>
            </h2>
            <p style={{ color: "rgba(226,232,240,0.55)", fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              Open to full-stack and Python backend roles — remote or Buenos Aires. Let's build something together.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <motion.a href="mailto:jorgotero1998@gmail.com" whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(251,146,60,0.4)" }} whileTap={{ scale: 0.97 }}
                style={{ padding: "0.85rem 2rem", background: "linear-gradient(135deg, #fb923c, #f472b6)", color: "#06010f", fontWeight: 700, borderRadius: "8px", textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", display: "inline-block" }}>
                ✉ Email Me
              </motion.a>
              <motion.a href="https://linkedin.com/in/jorgeotero1998" target="_blank" rel="noreferrer" whileHover={{ scale: 1.04, borderColor: "#fb923c", color: "#fb923c" }} whileTap={{ scale: 0.97 }}
                style={{ padding: "0.85rem 2rem", background: "transparent", color: "rgba(226,232,240,0.8)", fontWeight: 600, borderRadius: "8px", textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.9rem", border: "1px solid rgba(226,232,240,0.2)", display: "inline-block", transition: "all 0.2s" }}>
                LinkedIn →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
