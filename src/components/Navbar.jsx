import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const links = ["About", "Stack", "Skills", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        padding: "1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,1,15,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(251,146,60,0.12)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.3rem",
          background: "linear-gradient(135deg, #fb923c, #f472b6)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        JO<span style={{ WebkitTextFillColor: "#fb923c" }}>.</span>
      </motion.div>

      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {links.map((link, i) => (
          <motion.button
            key={link}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 + 0.3 }}
            onClick={() => scrollTo(link)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === link ? "#fb923c" : "rgba(226,232,240,0.65)",
              fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", fontWeight: 500,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => e.target.style.color = "#fb923c"}
            onMouseLeave={(e) => e.target.style.color = active === link ? "#fb923c" : "rgba(226,232,240,0.65)"}
          >
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#f472b6", fontSize: "0.7rem", marginRight: "4px" }}>
              0{i + 1}.
            </span>
            {link}
          </motion.button>
        ))}
        <motion.a
          href="https://github.com/Jorgeotero1998"
          target="_blank" rel="noreferrer"
          whileHover={{ scale: 1.05, borderColor: "#fb923c" }}
          style={{
            padding: "0.5rem 1.25rem",
            border: "1px solid rgba(251,146,60,0.5)",
            borderRadius: "6px", color: "#fb923c",
            textDecoration: "none",
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem",
            transition: "all 0.2s",
          }}
        >GitHub ↗</motion.a>
      </div>
    </motion.nav>
  );
}
