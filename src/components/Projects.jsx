import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { PROJECTS } from "../constants";

function ProjectCard({ project, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: (index % 3) * 0.15 }} whileHover={{ y: -8, boxShadow: `0 20px 60px ${project.color}20` }}
      style={{ background: project.gradient, border: `1px solid ${project.color}25`, borderRadius: "20px", padding: "2rem", backdropFilter: "blur(20px)", transition: "box-shadow 0.3s, transform 0.3s", display: "flex", flexDirection: "column", gap: "1rem", position: "relative", overflow: "hidden", cursor: "default" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontSize: "1.6rem" }}>{project.emoji}</span>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#e2e8f0", fontWeight: 600, fontSize: "1.05rem" }}>{project.name}</h3>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {project.live && (
            <motion.a href={project.live} target="_blank" rel="noreferrer" whileHover={{ scale: 1.15 }} title="Live demo"
              style={{ width: "34px", height: "34px", borderRadius: "8px", background: `${project.color}20`, border: `1px solid ${project.color}40`, display: "flex", alignItems: "center", justifyContent: "center", color: project.color, textDecoration: "none", fontSize: "1rem", fontWeight: 700 }}>↗</motion.a>
          )}
          <motion.a href={project.repo} target="_blank" rel="noreferrer" whileHover={{ scale: 1.15 }} title="GitHub"
            style={{ width: "34px", height: "34px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(226,232,240,0.6)", textDecoration: "none", fontSize: "0.85rem" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </motion.a>
        </div>
      </div>
      <p style={{ color: "rgba(226,232,240,0.6)", fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", lineHeight: 1.75, flex: 1 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{ background: `${project.color}12`, border: `1px solid ${project.color}30`, color: project.color, borderRadius: "6px", padding: "2px 10px", fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  return (
    <section id="projects" style={{ padding: "7rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: "4rem" }}>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", color: "#fb923c", fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #fb923c, #f472b6)", display: "inline-block" }} />
          What I've built
        </p>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#e2e8f0" }}>
          Featured{" "}<span style={{ background: "linear-gradient(135deg, #fb923c, #f472b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Projects</span>
        </h2>
      </motion.div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
      </div>
    </section>
  );
}
